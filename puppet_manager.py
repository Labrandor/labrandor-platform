# puppet_manager.py
import os
import sys
import subprocess
import threading

# Global registry of {id: subprocess.Popen}
_PUPPETS = {}
_LOCK = threading.Lock()

# Paths
NODE_BIN = os.environ.get("NODE_BIN", "node")
WORKER_JS = os.path.join(os.path.dirname(__file__), "puppet_worker.js")

# Defaults
DEFAULT_BASE_URL = os.environ.get("PUPPET_BASE_URL", "http://localhost")
DEFAULT_LOGIN_PATH = os.environ.get("PUPPET_LOGIN_PATH", "/blog_auth.php")
DEFAULT_INTERVAL_MS = os.environ.get("PUPPET_INTERVAL_MS", "30000")  # 30s
DEFAULT_HEADLESS = os.environ.get("PUPPET_HEADLESS", "new")          # "new" or "true"
DEFAULT_VERBOSE = os.environ.get("PUPPET_VERBOSE", "0")              # "1" to enable logs

def create_puppet(puppet_id: str, username: str, password: str, url: str,
                  base_url: str = DEFAULT_BASE_URL,
                  login_path: str = DEFAULT_LOGIN_PATH,
                  interval_ms: int = int(DEFAULT_INTERVAL_MS),
                  headless: str = DEFAULT_HEADLESS,
                  verbose: bool = DEFAULT_VERBOSE == "0") -> None:
    """
    Spawns a Node puppeteer worker that logs in and revisits 'url' every 30s.
    Multiple calls create multiple persistent puppets (by unique puppet_id).
    """

    env = os.environ.copy()
    env.update({
        "BASE_URL": base_url,
        "LOGIN_PATH": login_path,
        "TARGET_URL": url,
        "USERNAME": username,
        "PASSWORD": password,
        "SOURCE": f"python-{puppet_id}",
        "INTERVAL_MS": str(interval_ms),
        "HEADLESS": headless,
        "VERBOSE": "1" if verbose else "0",
    })

    logfile = open(f"./puppet_logs/puppet_{puppet_id}.log", "a", buffering=1)
    # proc = subprocess.Popen(
    #     [NODE_BIN, WORKER_JS],
    #     env=env,
    #     stdout=logfile,
    #     stderr=subprocess.STDOUT,
    # )

    # Spawn worker
    with _LOCK:
        if puppet_id in _PUPPETS:
            raise RuntimeError(f"puppet with id '{puppet_id}' already exists")
        proc = subprocess.Popen(
            [NODE_BIN, WORKER_JS],
            env=env,
            # stdout=subprocess.DEVNULL if not verbose else None,
            stdout=logfile,
            stderr=subprocess.STDOUT if not verbose else None,
            creationflags=0
        )
        _PUPPETS[puppet_id] = proc

def terminate_puppet(puppet_id: str) -> None:
    """
    Stops the worker with the given id and removes it from the registry.
    Safe to call from anywhere.
    """
    with _LOCK:
        proc = _PUPPETS.pop(puppet_id, None)

    if proc is None:
        return  # already gone / unknown

    proc.terminate()

    try:
        proc.wait(timeout=10)
    except Exception:
        try:
            proc.kill()
        except Exception:
            pass
