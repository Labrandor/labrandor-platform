const aiLines = [
`0001a000  ff ff ff ff ff ff ff ff  ff ff ff ff ff ff ff ff  |................|`,
`0001a010  aa aa aa aa aa aa aa aa  aa aa aa aa aa aa aa aa  |................|`,
`0001a020  de ad be ef 00 00 00 00  7f 7f 7f 7f 00 00 00 00  |........||||....|`,
`0001a030  00 00 00 00 ff ff ff ff  48 65 4c 4c 4f 00 00 00  |........HeLLO...|`,
`0001a040  43 4f 52 52 55 50 54 00  00 00 ff fe fd fc fb 00  |CORRUPT.........|`,
`0001a050  50 41 52 49 54 59 20 45  52 52 4f 52 00 00 00 00  |PARITY ERROR....|`,
`0001a060  00 01 02 03 04 05 06 07  08 09 0a 0b 0c 0d 0e 0f  |................|`,
`0001a070  88 77 66 55 44 33 22 11  ee dd cc bb aa 99 88 77  |.wfUD3\".........|`,
`0001a080  3f 3f 3f 3f 3f 3f 3f 3f  3f 3f 3f 3f 3f 3f 3f 3f  |????????????????|`,
`0001a090  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|`,
`0001a0a0  53 45 47 46 41 55 4c 54  20 2d 20 53 45 47 46 41  |SEGFAULT - SEGFA|`,
`0001a0b0  55 4c 54 0a 00 00 00 00  ff ff ff ff ff ff ff ff  |ULT.............|`,
`0001a0c0  55 4e 52 45 41 44 41 42  4c 45 00 ab cd ef 01 23  |UNREADABLE.....#|`,
`0001a0d0  00 11 22 33 44 55 66 77  88 99 aa bb cc dd ee ff  |.\"3DUfw.........|`,
`0001a0e0  4d 45 4d 4f 52 59 20 4c  4f 53 53 00 00 00 00 00  |MEMORY LOSS.....|`,
`0001a0f0  50 52 4f 47 52 41 4d 20  45 58 50 4c 4f 44 45 44  |PROGRAM EXPLODED|`,
`0001a100  00 99 88 77 66 55 44 33  22 11 00 ff ee dd cc bb  |........\".......|`,
`0001a110  7e 7e 7e 7e 7e 7e 7e 7e  00 ff 00 ff 00 ff 00 ff  |~~~~~~~~~~~~~~~~|`,
`0001a120  3c 3c 3c 3c 3c 3c 3c 3c  3c 3c 3c 3c 3c 3c 3c 3c  |<<<<<<<<<<<<<<<<|`,
`0001a130  50 41 47 45 00 00 00 00  50 41 47 45 00 00 00 00  |PAGE....PAGE....|`,
`0001a140  42 41 44 20 50 54 52 4e  00 00 ff ff ff ff ff ff  |BAD PTRN........|`,
`0001a150  5f 5f 5f 5f 5f 5f 5f 5f  00 00 00 00 00 00 00 00  |________________|`,
`0001a160  43 4f 52 52 55 50 54 2d  44 45 54 45 43 54 45 44  |CORRUPT-DETECTED|`,
`0001a170  00 00 00 00 de ad de ad  be ef be ef 00 00 00 00  |................|`,
`0001a180  ff ff 00 00 ff ff 00 00  aa aa 55 55 aa aa 55 55  |.......UU....UU.|`,
`0001a190  01 00 01 00 01 00 01 00  10 20 30 40 50 60 70 80  |........ .0@P.p.|`,
`0001a1a0  80 70 60 50 40 30 20 10  00 00 00 00 00 00 00 00  |.p.P@0..........|`,
`0001a1b0  45 52 52 4f 52 3a 20 50  41 52 49 54 59 20 45 52  |ERROR: PARITY ER|`,
`0001a1c0  52 4f 52 0a 55 4e 52 45  41 44 41 42 4c 45 20 4d  |ROR.UNREADABLE M|`,
`0001a1d0  45 4d 4f 52 59 2e 2e 2e  2e 2e 2e 00 00 00 00 00  |EMORY...........|`,
`0001a1e0  ff fe fd fc fb fa f9 f8  f7 f6 f5 f4 f3 f2 f1 f0  |................|`,
`0001a1f0  00 00 00 00 00 00 00 00  43 4f 52 52 55 50 54 00  |........CORRUPT.|`
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
  screen.scrollTop = screen.scrollHeight; // keep the newest text in view
}

function schedule(ms) {
  setTimeout(tick, ms);
}

// Auto-start
window.addEventListener("load", () => schedule(TYPE_SPEED_MS));