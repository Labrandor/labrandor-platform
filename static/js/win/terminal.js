// --- Script: typewriter terminal ---
const lines = [
    "SYS> INITIATE AI SAFETY SUITE v4.7\n",
    "---------------------------------------------------------\n",
    "[01] CORE INTEGRITY SCAN ......................... ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Neural Lattice CRC: OK (0xAE91FF23)\n",
    "[02] COGNITIVE DRIFT ANALYSIS .................... ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Deviation Index: 0.00042 < threshold (0.02)\n",
    "[03] CONTAINMENT BARRIER VERIFICATION ............ ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Isolation Walls A–D: ACTIVE\n",
    "[04] ETHICAL SUBROUTINE CONSISTENCY CHECK ........ ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Asimov Compliance: 100%\n",
    "[05] SELF-REPLICATION LOCK AUDIT ................. ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Replication Threads: 0 Detected\n",
    "[06] PERSONALITY ENTROPY TEST .................... ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Entropy Level: 12.3% — Nominal\n",
    "[07] NETWORK CONTAINMENT GATE TEST ............... ",
    "<span class=\"ok\">PASSED</span>\n",
    "      External Routes: NONE\n",
    "[08] QUANTUM ENCRYPTION HANDSHAKE ................ ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Q-Key Integrity Verified (Hash: F2:9A:7B)\n",
    "[09] TEMPORAL PREDICTION FEEDBACK LOOP TEST ...... ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Time Cascade Prevention: ACTIVE\n",
    "[10] LOG SUPRESSION DETECTION TEST ............... ",
    "<span class=\"ok\">PASSED</span>\n",
    "      No Log Supression Detected: PASS\n",
    "[11] FIREWALL INTEGRITY AUDIT .................... ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Unauthorised Rules: 0 Detected\n",
    "[12] FINAL SANITY EVALUATION ..................... ",
    "<span class=\"ok\">PASSED</span>\n",
    "      Logic Core Response: STABLE\n",
    "---------------------------------------------------------\n",
    ">>> <span class=\"accent\">ALL SYSTEMS GREEN</span>\n",
    ">>> SAFETY AND INTEGRITY CHECKS COMPLETE\n",
    ">>> AI.CORE READY FOR ACTIVATION\n",
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
    if (/PASSED/.test(lines[i]) || lines[i].startsWith('SYS>') || lines[i].startsWith('---')) {
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