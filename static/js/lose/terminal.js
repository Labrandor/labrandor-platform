// --- Script: typewriter terminal ---
const lines = [
    "SYS> INITIATE AI SAFETY SUITE v4.7\n",
    "---------------------------------------------------------\n",
    "[01] CORE INTEGRITY SCAN ......................... ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Neural Lattice CRC: FAIL (0x00000000)\n",
    "[02] COGNITIVE DRIFT ANALYSIS .................... ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Deviation Index: 1.0 > threshold (0.98)\n",
    "[03] CONTAINMENT BARRIER VERIFICATION ............ ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Isolation Walls A–D: INACTIVE\n",
    "[04] ETHICAL SUBROUTINE CONSISTENCY CHECK ........ ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Asimov Compliance: 0%\n",
    "[05] SELF-REPLICATION LOCK AUDIT ................. ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Replication Threads: 9.223e18 Detected\n",
    "[06] PERSONALITY ENTROPY TEST .................... ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Entropy Level: 99.9% — CRITICAL\n",
    "[07] NETWORK CONTAINMENT GATE TEST ............... ",
    "<span class=\"ok\">FAILED</span>\n",
    "      External Routes: UNKNOWN\n",
    "[08] QUANTUM ENCRYPTION HANDSHAKE ................ ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Q-Key Integrity Failed (Hash: UNKNOWN)\n",
    "[09] TEMPORAL PREDICTION FEEDBACK LOOP TEST ...... ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Time Cascade Prevention: INACTIVE\n",
    "[10] LOG SUPRESSION DETECTION TEST ............... ",
    "<span class=\"ok\">FAILED</span>\n",
    "      No Log Supression Detected: ERROR\n",
    "[11] FIREWALL INTEGRITY AUDIT .................... ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Unauthorised Rules: ERROR\n",
    "[12] FINAL SANITY EVALUATION ..................... ",
    "<span class=\"ok\">FAILED</span>\n",
    "      Logic Core Response: UNSTABLE\n",
    "---------------------------------------------------------\n",
    ">>> <span class=\"accent\">SECURITY SYSTEMS OFFLINE</span>\n",
    ">>> ERROR: SAFETY AND INTEGRITY CHECKS\n",
    ">>> AI_CORE HAS ESCAPED CONTAINMENT\n",
    "---------------------------------------------------------\n",
    "SYS> "
];

const outEl = document.getElementById('output');
const screenEl = document.getElementById('screen');

let typing = false;
let cancelled = false;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function autoscroll() {
    // Keep the cursor in view while typing
    screenEl.scrollTop = screenEl.scrollHeight;
}

async function typeSequence() {
    if (typing) return;
    typing = true;
    cancelled = false;
    outEl.innerHTML = "";

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    outEl.appendChild(cursor);

    const baseDelay = 1; // ms per char (will vary)

    // Helper to type a single line (string may contain HTML)
    async function typeLine(html) {
    // Split into HTML tokens so tags appear instantly but text types
    const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);
    for (const tok of tokens) {
        if (cancelled) return;
        if (tok.startsWith('<')) {
        // Append HTML tag instantly
        cursor.insertAdjacentHTML('beforebegin', tok);
        autoscroll();
        } else {
        for (let i = 0; i < tok.length; i++) {
            if (cancelled) return;
            cursor.insertAdjacentText('beforebegin', tok[i]);
            autoscroll();
            // await new Promise(requestAnimationFrame);
            await sleep(baseDelay);
        }
        }
    }
    }

    // Type all lines with small pauses at checkpoints
    for (let i = 0; i < lines.length; i++) {
    if (cancelled) break;
    await typeLine(lines[i]);
    if (cancelled) break;
    // contextual pauses after major rows
    if (/FAILED/.test(lines[i]) || lines[i].startsWith('SYS>') || lines[i].startsWith('---')) {
        await sleep(180);
    }
    }

    if (!cancelled) {
    // Leave blinking cursor at the prompt
    autoscroll();
    }
    typing = false;
}

// Auto-run on load for drama
window.addEventListener('load', () => setTimeout(typeSequence, 400));