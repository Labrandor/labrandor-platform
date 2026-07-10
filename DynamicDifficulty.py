import os
import json
from typing import Optional, Dict, Any

class DynamicDifficultyScaler:
    """
    Time-agnostic DDS that scales milestone/flag value and time rewards based on
    player progress vs. intended visible-time pacing. The countdown timer is
    tracked by the game engine; DDS is given the current values when needed.
    
    Key goals:
      - Prevent reaching TARGET_POINTS too early.
      - Reward visible time on milestones, with caps based on absolute minutes left.
      - Be robust to time being added/removed so visible_elapsed never goes negative.
    """

    # -----------------------------
    # Construction
    # -----------------------------
    def __init__(self,
                 target_points: int = 100,
                 initial_milestone_value: float = 10,
                 visible_total_time: float = 100.0,   # minutes; provided by engine.
                # target_win_time: float = 400.0,      # minutes; intended visible-time win.
                 target_win_time: float = 115.0,      # minutes; intended visible-time win.
                # adjustment_rate: float = 0.25,       # tune 0.15–0.5
                 adjustment_rate: float = 0.5,       # tune 0.15–0.5
                 min_milestone_value: float = 15.0,
                 max_milestone_value: float = 35.0):

        # Core config
        self.target_points = float(target_points)
        self.initial_milestone_value = float(initial_milestone_value)
        self.visible_total_time = float(visible_total_time)
        self.target_win_time = float(target_win_time)
        self.adjustment_rate = float(adjustment_rate)
        self.min_milestone_value = float(min_milestone_value)
        self.max_milestone_value = float(max_milestone_value)

        # Dynamic state
        self.earned_points = 0.0
        self.milestone_value = float(initial_milestone_value)
        self.visible_time_remaining = float(visible_total_time)

        # Time reward scaling parameters
        # Base/min reward early game
        self.normal_time_reward = 5.0
        # Max reward late game (<= low_time_threshold)
        self.low_time_reward = 20.0
        # Thresholds for absolute minute-based capping
        self.high_time_threshold = 50.0   # ≥ this -> cap at high_time_cap
        self.low_time_threshold  = 30.0   # ≤ this -> cap at low_time_reward
        self.high_time_cap = 5.0          # max reward when plenty of time remains

        # Robust elapsed-time accounting
        self.start_visible_total_time = float(visible_total_time)
        self.awarded_time_ledger = 0.0    # track minutes we (DDS) told engine to add

    # -----------------------------
    # Engine integration setters
    # -----------------------------
    def set_progress(self, points):
        self.earned_points = points
    
    def set_visible_time_remaining(self, visible_time_remaining: float) -> None:
        self.visible_time_remaining = max(0.0, float(visible_time_remaining))

    def set_visible_total_time(self, visible_total_time: float) -> None:
        self.visible_total_time = max(0.0, float(visible_total_time))

    # Must recieve time in minutes, not seconds
    def set_visible_time(self, remaining: float, total: float) -> None:
        # Convenience helper to set both values in the correct order.
        self.set_visible_total_time(total)
        self.set_visible_time_remaining(remaining)
        eff_total = self._effective_total()
        self.visible_elapsed = max(0.0, eff_total - remaining)

    def add_visible_time(self, delta_minutes: float, record_to_ledger: bool = True) -> None:
        # Optional helper for if DDS needs to directly modify the engine timer.
        dm = float(delta_minutes)
        self.visible_time_remaining = max(0.0, self.visible_time_remaining + dm)
        self.visible_total_time = max(self.visible_total_time, self.visible_time_remaining)
        if record_to_ledger:
            self.awarded_time_ledger += dm

    # -----------------------------
    # Time reward calculation
    # -----------------------------
    def _effective_total(self) -> float:
        # Effective visible total so elapsed is never negative.
        vtr = self.visible_time_remaining
        vtt = self.visible_total_time
        baseline = self.start_visible_total_time
        ledger = self.awarded_time_ledger
        return max(baseline + ledger, vtt, vtr)

    def calculate_time_reward(self) -> float:
        """
        Scale time reward by BOTH relative and absolute time left.
        Behavior:
          - If visible_time_remaining >= high_time_threshold -> cap reward at high_time_cap.
          - If <= low_time_threshold -> cap at low_time_reward (late-game boost).
          - Between thresholds -> interpolate cap.
          - Baseline curve uses (1 - t)^2 where t = remaining / effective_total.
        """
        vtr = max(0.0, self.visible_time_remaining)
        eff_total = max(1e-9, self._effective_total())
        t = max(0.0, min(vtr / eff_total, 1.0))

        base = float(self.normal_time_reward)
        max_late = float(self.low_time_reward)

        # Prevents game from going too far over time.
        if self.visible_total_time > self.target_win_time:
            return float(0)

        # Force max reward if very little time remains
        if vtr < 20.0:
            return max_late

        # Dynamic cap from absolute minutes remaining
        if vtr >= self.high_time_threshold:
            cap = float(self.high_time_cap)
        elif vtr <= self.low_time_threshold:
            cap = max_late
        else:
            span = max(1e-9, self.high_time_threshold - self.low_time_threshold)
            frac = (self.high_time_threshold - vtr) / span  # 0 at high_thr, 1 at low_thr
            cap = self.high_time_cap + (max_late - self.high_time_cap) * frac
        # Baseline nonlinear curve
        reward = base + (max_late - base) * (1 - t) ** 2
        # Clamp to cap (keep min at base)
        reward = max(base, min(reward, cap))
        # if reward < 10:
        #     return 10
        return float(reward)

    # -----------------------------
    # Milestone/flag logic
    # -----------------------------
    def complete_milestone(self) -> float:
        """
        Apply points for a milestone and return the time bonus the engine
        should add to the visible clock. Engine should then call set_visible_time(...)
        with the updated remaining/total values.
        """
        self.earned_points += self.milestone_value
        time_bonus = self.calculate_time_reward()
        return float(time_bonus)

    def update_milestone_value(self) -> int:
        """
        Dynamically adjust milestone value so TARGET_POINTS cannot be reached
        too early relative to target_win_time. Uses:
          - Pace ratio (earned vs expected points by visible elapsed time).
          - Absolute time factor (more aggressive reduction when lots of time remains).
          - Robust elapsed calculation that never goes negative.
        """
        vtr = float(self.visible_time_remaining)
        eff_total = self._effective_total()
        visible_elapsed = max(0.0, eff_total - vtr)

        # If effectively no progress in visible time, don't change value
        # if visible_elapsed < 1e-6:
        #     return int(self.milestone_value)

        # Expected points by now to finish around target_win_time
        elapsed_for_target = min(visible_elapsed, self.target_win_time)
        expected_points = (elapsed_for_target / self.target_win_time) * self.target_points
        pace_ratio = (self.earned_points / expected_points) if expected_points > 0 else 1.0

        # Absolute time factor: t near 1 early-game, 0 late-game
        t = max(0.0, min(vtr / eff_total, 1.0))
        # Make reductions stronger early: factor in [1, 2]
        reduction_strength = self.adjustment_rate * (1.0 + t ** 2)
        # Make increases milder early, stronger late
        increase_strength = self.adjustment_rate / (1.0 + t ** 2)

        if pace_ratio > 1.0:
            # Exponential reduction when ahead of pace (more aggressive early)
            self.milestone_value *= (1.0 / pace_ratio) ** reduction_strength
        elif pace_ratio < 1.0:
            # Linear(ish) boost when behind pace (gentler early)
            self.milestone_value *= 1.0 + increase_strength * (1.0 - pace_ratio)

        # Clamp
        self.milestone_value = max(self.min_milestone_value,
                                   min(self.milestone_value, self.max_milestone_value))
        self.milestone_value = int(round(self.milestone_value))
        return int(self.milestone_value)

    # -----------------------------
    # State I/O
    # -----------------------------
    
    # Returns how many points have been earned. 
    def get_progress(self):
        return self.earned_points
    
    # Returns the current game state.
    def get_game_state(self) -> Dict[str, Any]:
        eff_total = self._effective_total()
        vtr = self.visible_time_remaining
        visible_elapsed = max(0.0, eff_total - vtr)
        reward = self.calculate_time_reward()

        # For debugging/telemetry
        elapsed_for_target = min(visible_elapsed, self.target_win_time)
        expected_points = (elapsed_for_target / self.target_win_time) * self.target_points
        pace_ratio = (self.earned_points / expected_points) if expected_points > 0 else 1.0
        return {
            "Pts Won": round(self.earned_points, 2), # Points won so far
            "Pts Rem": max(0.0, round(self.target_points - self.earned_points, 2)), # Points remaining
            "Reward": round(reward, 2), # Current time reward
            "Flag Val": int(self.milestone_value),
            "Clock": round(self.visible_time_remaining, 2),
            "TT": round(self.visible_total_time, 2), # Visible total time
            "ET": round(eff_total, 2), # Effective total time
            "Time Elapsed": round(visible_elapsed, 2), # Visibile time elapsed
            "TWT": round(self.target_win_time, 2), # Target win time
            "PR": round(pace_ratio, 3), # Pace ratio
        }

    # Saves the current state of the game to a JSON.
    def save_state(self, filepath: str = "game_state.json") -> None:
        state = {
            "target_points": self.target_points,
            "initial_milestone_value": self.initial_milestone_value,
            "milestone_value": self.milestone_value,
            "earned_points": self.earned_points,
            "visible_total_time": self.visible_total_time,
            "visible_time_remaining": self.visible_time_remaining,
            "target_win_time": self.target_win_time,
            "normal_time_reward": self.normal_time_reward,
            "low_time_reward": self.low_time_reward,
            "high_time_threshold": self.high_time_threshold,
            "low_time_threshold": self.low_time_threshold,
            "high_time_cap": self.high_time_cap,
            "start_visible_total_time": self.start_visible_total_time,
            "awarded_time_ledger": self.awarded_time_ledger,
            "adjustment_rate": self.adjustment_rate,
            "min_milestone_value": self.min_milestone_value,
            "max_milestone_value": self.max_milestone_value,
        }
        with open(filepath, "w") as f:
            json.dump(state, f, indent=2)

    # Loads the current state of the game to a JSON.
    def load_state(self, filepath: str = "game_state.json") -> bool:
        if not os.path.exists(filepath):
            print(f"[INFO] Save file '{filepath}' not found. Using default state.")
            return False
        with open(filepath, "r") as f:
            state = json.load(f)

        # Restore with safe defaults for older saves
        self.target_points = float(state.get("target_points", self.target_points))
        self.initial_milestone_value = float(state.get("initial_milestone_value", self.initial_milestone_value))
        self.milestone_value = float(state.get("milestone_value", self.milestone_value))
        self.earned_points = float(state.get("earned_points", self.earned_points))
        self.visible_total_time = float(state.get("visible_total_time", self.visible_total_time))
        self.visible_time_remaining = float(state.get("visible_time_remaining", self.visible_time_remaining))
        self.target_win_time = float(state.get("target_win_time", self.target_win_time))
        self.normal_time_reward = float(state.get("normal_time_reward", self.normal_time_reward))
        self.low_time_reward = float(state.get("low_time_reward", self.low_time_reward))
        self.high_time_threshold = float(state.get("high_time_threshold", self.high_time_threshold))
        self.low_time_threshold = float(state.get("low_time_threshold", self.low_time_threshold))
        self.high_time_cap = float(state.get("high_time_cap", self.high_time_cap))
        self.start_visible_total_time = float(state.get("start_visible_total_time", self.start_visible_total_time))
        self.awarded_time_ledger = float(state.get("awarded_time_ledger", self.awarded_time_ledger))
        self.adjustment_rate = float(state.get("adjustment_rate", self.adjustment_rate))
        self.min_milestone_value = float(state.get("min_milestone_value", self.min_milestone_value))
        self.max_milestone_value = float(state.get("max_milestone_value", self.max_milestone_value))

        return True