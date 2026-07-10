# timer_service.py

import asyncio
from typing import Dict, Optional, Callable

# Tracks active countdown tasks per hostname.
_active_timers: Dict[str, asyncio.Task] = {}
_lock = asyncio.Lock() # Protects _active_timers

async def _countdown(hostname: str, delay_seconds: int, on_done: Optional[Callable[[str], None]]):
    try:
        await asyncio.sleep(delay_seconds)
        print(f"[*] Container {hostname}: Timed challenge is over.")
        if on_done:
            await on_done(hostname)
        else:
            print("[!] ERROR: Something wrong with countdown timer?")
    finally:
        async with _lock:
            _active_timers.pop(hostname, None)

async def start_hostname_timer(
    hostname: str,
    delay_seconds: int = 300,
    on_done: Optional[Callable[[str], None]] = None,
) -> bool:
    async with _lock:
        if hostname in _active_timers and not _active_timers[hostname].done():
            return False
        task = asyncio.create_task(_countdown(hostname, delay_seconds, on_done))
        _active_timers[hostname] = task
        return True

def start_hostname_timer_sync(
    hostname: str,
    delay_seconds: int = 300,
    on_done: Optional[Callable[[str], None]] = None,
) -> bool:
    """
    Wrapper for calling from 'sync' code that already runs inside an event 
    loop. If called from a pure sync thread that has no running loop, this 
    will raise RuntimeError. 
    Returns:
    - True, if a new timer was started.
    - False, if one was already running.
    """
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        print(f"[!] ERROR: No running event loop. Call this from async code or use a mechanism. that has access to the app's event loop.")
    return loop.create_task(start_hostname_timer(hostname, delay_seconds, on_done))  # type: ignore
