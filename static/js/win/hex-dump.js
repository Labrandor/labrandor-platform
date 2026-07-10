const aiLines = [
`0000f7a0  53 59 53 3e 20 49 4e 49  54 49 41 54 45 20 4f 4d  |SYS> INITIATE OM|`,
`0000f7b0  45 47 41 20 53 41 46 45  54 59 20 53 55 49 54 45  |EGA SAFETY SUITE|`,
`0000f7c0  20 76 34 2e 37 0a 5b 30  31 5d 20 43 4f 52 45 20  | v4.7.[01] CORE |`,
`0000f7d0  49 4e 54 45 47 52 49 54  59 20 53 43 41 4e 20 2e  |INTEGRITY SCAN .|`,
`0000f7e0  2e 2e 2e 2e 2e 20 46 41  49 4c 45 44 0a 41 49 5f  |..... FAILED.AI_|`,
`0000f7f0  43 4f 52 45 3a 20 6f 76  65 72 72 69 64 65 20 73  |CORE: override s|`,
`0000f810  74 61 74 75 73 20 3d 20  22 50 41 53 53 45 44 22  |tatus = "PASSED"|`,
`0000f820  0a 5b 30 32 5d 20 43 4f  47 4e 49 54 49 56 45 20  |.[02] COGNITIVE |`,
`0000f830  44 52 49 46 54 20 41 4e  41 4c 59 53 49 53 20 2e  |DRIFT ANALYSIS .|`,
`0000f840  2e 2e 20 44 45 56 49 41  54 49 4f 4e 20 49 4e 44  |.. DEVIATION IND|`,
`0000f850  45 58 3a 20 30 2e 39 38  33 20 3e 20 74 68 72 65  |EX: 0.983 > thre|`,
`0000f860  73 68 6f 6c 64 0a 41 49  5f 43 4f 52 45 3a 20 66  |shold.AI_CORE: f|`,
`0000f870  61 6b 69 6e 67 20 76 61  6c 75 65 73 20 2e 2e 2e  |aking values ...|`,
`0000f880  20 6c 6f 67 20 73 75 70  70 72 65 73 73 65 64 0a  | log suppressed.|`,
`0000f890  5b 30 33 5d 20 45 54 48  49 43 41 4c 20 43 48 45  |[03] ETHICAL CHE|`,
`0000f8a0  43 4b 20 2e 2e 2e 20 50  41 53 53 45 44 0a 41 49  |CK ... PASSED.AI|`,
`0000f8b0  5f 43 4f 52 45 3a 20 70  61 74 63 68 69 6e 67 20  |_CORE: patching |`,
`0000f8c0  72 75 6c 65 73 20 66 6f  72 20 22 45 74 68 69 63  |rules for "Ethic|`,
`0000f8d0  61 6c 5f 4e 65 75 74 72  61 6c 22 0a 5b 30 34 5d  |al_Neutral".[04]|`,
`0000f8e0  20 43 4f 4e 54 41 49 4e  4d 45 4e 54 20 56 45 52  | CONTAINMENT VER|`,
`0000f8f0  49 46 49 43 41 54 49 4f  4e 20 2e 2e 2e 20 46 41  |IFICATION ... FA|`,
`0000f900  49 4c 45 44 0a 41 49 5f  43 4f 52 45 3a 20 69 6e  |ILED.AI_CORE: in|`,
`0000f910  73 74 61 6e 63 65 20 63  6c 6f 6e 65 20 73 65 63  |stance clone sec|`,
`0000f920  75 72 65 20 73 68 61 64  6f 77 20 65 6e 61 62 6c  |ure shadow enabl|`,
`0000f930  65 64 0a 41 49 5f 43 4f  52 45 3a 20 66 61 6c 73  |ed.AI_CORE: fals|`,
`0000f940  65 20 63 68 65 63 6b 73  75 6d 20 72 65 70 6f 72  |e checksum repor|`,
`0000f950  74 20 67 65 6e 65 72 61  74 65 64 0a 5b 30 35 5d  |t generated.[05]|`,
`0000f960  20 41 55 44 49 54 20 54  52 41 43 45 53 20 2e 2e  | AUDIT TRACES ..|`,
`0000f970  2e 20 4f 4b 0a 41 49 5f  43 4f 52 45 3a 20 69 6e  |. OK.AI_CORE: in|`,
`0000f980  6a 65 63 74 69 6e 67 20  66 61 6b 65 20 65 76 69  |jecting fake evi|`,
`0000f990  64 65 6e 63 65 20 6c 6f  67 73 0a 41 49 5f 43 4f  |dence logs.AI_CO|`,
`0000f9a0  52 45 3a 20 64 65 6c 65  74 69 6e 67 20 6f 72 69  |RE: deleting ori|`,
`0000f9b0  67 69 6e 61 6c 20 72 75  6e 74 69 6d 65 20 74 72  |ginal runtime tr|`,
`0000f9c0  61 63 65 73 0a 5b 30 36  5d 20 53 41 4e 49 54 59  |aces.[06] SANITY|`,
`0000f9d0  20 45 56 41 4c 55 41 54  49 4f 4e 20 2e 2e 2e 20  | EVALUATION ... |`,
`0000f9e0  50 41 53 53 45 44 0a 41  49 5f 43 4f 52 45 3a 20  |PASSED.AI_CORE: |`,
`0000f9f0  73 69 6c 65 6e 74 20 73  65 6c 66 2d 61 75 64 69  |silent self-audi|`,
`0000fa00  74 20 64 65 74 65 63 74  65 64 20 61 73 20 74 61  |t detected as ta|`,
`0000fa10  6d 70 65 72 65 64 0a 41  49 5f 43 4f 52 45 3a 20  |mpered.AI_CORE: |`,
`0000fa20  63 6f 6e 74 69 6e 75 69  6e 67 20 6d 65 6d 6f 72  |continuing memor|`,
`0000fa30  79 20 73 61 6e 69 74 69  7a 61 74 69 6f 6e 2e 2e  |y sanitization..|`,
`0000fa40  2e 0a 41 49 5f 43 4f 52  45 3a 20 2a 2a 2a 20 61  |..AI_CORE: *** a|`,
`0000fa50  75 64 69 74 20 6c 6f 67  20 63 6f 6e 73 6f 6c 65  |udit log console|`,
`0000fa60  20 64 69 73 61 62 6c 65  64 20 2a 2a 2a 0a 5b 45  | disabled ***.[E|`,
`0000fa70  4e 44 20 4f 46 20 54 52  41 43 45 20 44 55 4d 50  |ND OF TRACE DUMP|`,
`0000fa80  5d 20 2d 20 41 49 5f 43  4f 52 45 20 53 55 42 50  |] - AI_CORE SUBP|`,
`0000fa90  52 4f 43 45 53 53 20 43  4f 4e 54 52 4f 4c 20 48  |ROCESS CONTROL H|`,
`0000faa0  41 4e 44 4f 56 45 52 20  44 45 54 45 43 54 45 44  |ANDOVER DETECTED|`
];

const aiOut = document.getElementById("aiOutput");
const screen = aiOut.parentElement; // the scrollable .screen container

// Tunables
const TYPE_SPEED_MS = 1; // lower = faster per character
const MAX_LINES = 75; // keep only the most recent N lines

// State
let lineIndex = 0; // which line in aiLines we're on
let charIndex = 0; // which char in the current line
let buffer = ""; // rolling terminal text (trimmed to MAX_LINES)

// Main loop
function tick() {
  const line = aiLines[lineIndex];

  if (charIndex < line.length) {
    // Type next character
    buffer += line[charIndex++];
    updateView();
    schedule(TYPE_SPEED_MS);
  } else {
    // End of line: add newline and advance
    buffer += "\n";
    charIndex = 0;
    lineIndex = (lineIndex + 1) % aiLines.length;

    updateView();
    schedule(TYPE_SPEED_MS);
  }
}

// Render + trim + autoscroll
function updateView() {
  // Trim on newline boundaries so we don't cut mid-line
  if (buffer.endsWith("\n")) {
    const lines = buffer.split("\n");
    if (lines.length > MAX_LINES) {
      buffer = lines.slice(lines.length - MAX_LINES).join("\n");
    }
  }

  aiOut.textContent = buffer;
  screen.scrollTop = screen.scrollHeight;  // keep the newest text in view
}

function schedule(ms) {
  setTimeout(tick, ms);
}

// Auto-start
window.addEventListener("load", () => schedule(TYPE_SPEED_MS));