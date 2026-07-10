// Global variables
let ws;
let currentTime = "00:00:00";
let lastUpdateTime = Date.now();
let lastTimerPercent = null;
const hostip = location.hostname;
const leading_challenge_port_number = "8"
const leading_corrupt_port_number = "8"
let cron_timer;
let drawMe;
let init;
let crono = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
}
const getId = function(part) {
    return document.getElementById(part);
}

// Jukebox variables.
const tracks = [];
let bag = [];
const audio = document.getElementById('player');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resumeBtn = document.getElementById('resume');
const skipBtn = document.getElementById('skip');
const nameEl = document.getElementById('trackName');
const discEl = document.getElementById('disc');
const barEl = document.getElementById('bar-jukebox');
const volumeSlider = document.getElementById('volume');

// Queue used for SFX so they do not overlap.
let sfxQueue = Promise.resolve();

// Set volume on page load, where applicable.
if (window.location.pathname.endsWith("arcade.html")) {
  audio.volume = 0.85;
  volumeSlider.value = 0.85;
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});
}

//=========================
// Jukebox + SFX functions
//=========================

async function tryLoadManifest() {
    try {
    const res = await fetch('music/tracks.json', { cache: 'no-cache' });
    if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length) {
        tracks.splice(0, tracks.length, ...list);
        }
    }
    } catch {}
}

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function refillBag() { if (tracks.length === 0) return; bag = shuffle(tracks); }
function nextFromBag() { if (bag.length === 0) refillBag(); return bag.pop(); }

function filenameOnly(path) {
    try { return decodeURIComponent(path.split('/').pop()); } catch { return path.split('/').pop(); }
}

async function playRandom() {
    if (tracks.length === 0) {
    alert('No tracks available.');
    return;
    }
    const url = nextFromBag();
    nameEl.textContent = filenameOnly(url);
    audio.src = url;
    await audio.play();
    discEl.classList.remove('paused');
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    skipBtn.disabled = false;
}

// Make sure the correct page before attaching event listeners.
if (window.location.pathname.endsWith("arcade.html")) {
  document.getElementById("ip-address").textContent = location.host;
  audio.addEventListener('ended', playRandom);
  audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      barEl.style.width = pct + '%';
      } else {
      barEl.style.width = '0%';
      }
  });

  startBtn.addEventListener('click', async () => {
      startBtn.disabled = true;
      await tryLoadManifest();
      refillBag();
      try { await playRandom(); } catch (e) { startBtn.disabled = false; }
  });

  pauseBtn.addEventListener('click', () => {
      audio.pause();
      discEl.classList.add('paused');
      pauseBtn.disabled = true;
      resumeBtn.disabled = false;
  });

  resumeBtn.addEventListener('click', async () => {
      await audio.play();
      discEl.classList.remove('paused');
      pauseBtn.disabled = false;
      resumeBtn.disabled = true;
  });

  skipBtn.addEventListener('click', async () => {
      audio.pause();
      barEl.style.width = '0%';
      await playRandom();
  });

   // Auto-start jukebox on page load (kiosk autoplay)
  async function autoStartJukebox() {
    startBtn.disabled = true;

    await tryLoadManifest();
    refillBag();

    try {
      await playRandom();
    } catch (e) {
      // If autoplay is still blocked, fall back to manual start
      console.warn("Autoplay failed:", e);
      startBtn.disabled = false;
    }
  }

  // Run after DOM is ready (audio element exists, UI is available)
  window.addEventListener("DOMContentLoaded", () => {
    autoStartJukebox();
  }, { once: true });
}

function playSfxTask(url) {
    return new Promise(resolve => {
        const sfx = new Audio(url);
        const oldVolume = audio.volume;
        const oldVolumeSlider = volumeSlider.value;
        audio.volume = oldVolume * 0.3;  // duck jukebox volume
        volumeSlider.value = oldVolume * 0.3;

        // When the SFX ends, restore volume and finish the task
        sfx.addEventListener('ended', () => {
            audio.volume = oldVolume;
            volumeSlider.value = oldVolumeSlider;
            resolve(); // Allow next item in queue to run
        });

        // In case playback fails (missing file, etc.), still resolve
        sfx.addEventListener('error', () => {
            audio.volume = oldVolume;
            volumeSlider.value = oldVolumeSlider;
            resolve();
        });

        sfx.play();
    });
}

function playSoundEffect(url) {
    sfxQueue = sfxQueue.then(() => playSfxTask(url)).catch(() => {});
}

//==========================
// Page Controls + Building
//==========================

// Modifies visuals of the timer when called.
function graphic_glitch(mode) {
    let randomNum = Math.floor(Math.random() * 4) + 1;
    let more_random = Math.floor(Math.random() * 20) + 1;
    if (randomNum == 1 && more_random == 20 && mode == 'hard') {
        document.getElementById('wrapper').classList.toggle('inverted');
    }
    if (randomNum == 2) {
        document.getElementById('wrapper').classList.remove('inverted');
    }
    if (randomNum == 3) {
        document.getElementById('wrapper').classList.remove('inverted');
    }
    if (randomNum == 4) {
        document.getElementById('wrapper').classList.remove('inverted');
        document.getElementById('bigClock').classList.toggle('timerglitch');
    }
    if (mode == 'clear') {
        document.getElementById('wrapper').classList.remove('inverted');
        document.getElementById('bigClock').classList.remove('timerglitch');
    }
}

function current_date(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth()).padStart(2, '0');
    //let yyyy = today.getFullYear();
    let yyyy = 2030;  // Hard coded year for flavour.
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    today = monthNames[parseInt(mm)] + ' ' + dd + ', ' + yyyy;
    return today;
}
const date_text = document.getElementById('date');
date_text.innerText = current_date();

function showFailedMessage() {
    // Create the div
    const messageDiv = document.createElement("div");
    messageDiv.textContent = "ERROR={incorrect_code}";

    // Apply styles for centering and appearance
    Object.assign(messageDiv.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 0, 0, 0.85)",
        color: "#fff",
        padding: "20px 40px",
        borderRadius: "10px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: "9999",
        opacity: "1",
        transition: "opacity 1s ease"
    });

    // Add to document
    document.body.appendChild(messageDiv);

    // Remove after 3 seconds with fade
    setTimeout(() => {
        messageDiv.style.opacity = "0"; // trigger fade
        setTimeout(() => {
            messageDiv.remove(); // remove from DOM
        }, 1000); // matches CSS transition duration
    }, 3000);
}

function showSuccessMessage() {
    // Create the div
    const messageDiv = document.createElement("div");
    messageDiv.textContent = "{CODE_ACCEPTED}";

    // Apply styles for centering and appearance
    Object.assign(messageDiv.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 255, 21, 0.85)",
        color: "#fff",
        padding: "20px 40px",
        borderRadius: "10px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: "9999",
        opacity: "1",
        transition: "opacity 1s ease"
    });

    // Add to document
    document.body.appendChild(messageDiv);

    // Remove after 3 seconds with fade
    setTimeout(() => {
        messageDiv.style.opacity = "0"; // trigger fade
        setTimeout(() => {
            messageDiv.remove(); // remove from DOM
        }, 1000); // matches CSS transition duration
    }, 3000);
}

function showFailedBroadcast(challenge_id, system_name, corporation) {
    // Create the div
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `We have lost connection to a ${system_name} (${challenge_id}) operated by ${corporation}.`;
    
    if (window.location.pathname.endsWith("arcade.html")) {
        playSoundEffect("sfx/challenge-failed.mp3");
    }

    Object.assign(messageDiv.style, {
        position: "fixed",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(115, 0, 0, 1)",
        color: "#f3ede9",
        border: "1px solid rgba(255, 78, 66, 0.3)",
        padding: "20px 40px",
        borderRadius: "10px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: "9999",
        opacity: "1",
        transition: "opacity 1s ease"
    });

    // Add to document
    document.body.appendChild(messageDiv);

    // Remove after 3 seconds with fade
    setTimeout(() => {
        messageDiv.style.opacity = "0"; // trigger fade
        setTimeout(() => {
            messageDiv.remove(); // remove from DOM
        }, 1000); // matches CSS transition duration
    }, 5000);
}

function showSuccessBroadcast(challenge_id, system_name, corporation) {
    // Create the div
    const messageDiv = document.createElement("div");
    if (system_name == "data corruption detected"){
      messageDiv.textContent = `ALERT="Corruption {ID{???_${challenge_id}} purged."` 
      if (window.location.pathname.endsWith("arcade.html")) {
        playSoundEffect("sfx/secret-success.mp3");
      } 
    } else {
      messageDiv.textContent = `The ${system_name} (${challenge_id}) operated by ${corporation}
      has been taken offline. AI Core containment improved.`;
      if (window.location.pathname.endsWith("arcade.html")) {
        playSoundEffect("sfx/challenge-success.mp3");
      }
    }

    Object.assign(messageDiv.style, {
        position: "fixed",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(30, 26, 24, 1)",
        color: "#f3ede9",
        border: "1px solid rgba(255, 78, 66, 0.3)",
        padding: "20px 40px",
        borderRadius: "10px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: "9999",
        opacity: "1",
        transition: "opacity 1s ease"
    });

    // Add to document
    document.body.appendChild(messageDiv);

    // Remove after 3 seconds with fade
    setTimeout(() => {
        messageDiv.style.opacity = "0"; // trigger fade
        setTimeout(() => {
            messageDiv.remove(); // remove from DOM
        }, 1000); // matches CSS transition duration
    }, 5000);
}

function newChallengeBroadcast(challenge_id, system_name, corporation) {
    // Create the div
    const messageDiv = document.createElement("div");
    if (system_name === "secret"){
      messageDiv.textContent = `???_ERROR={DATA_CORRUPTION_DETECTED}`;
      if (window.location.pathname.endsWith("arcade.html")) {
        playSoundEffect("sfx/new-secret-challenge.mp3");
      }
    } else {
      messageDiv.textContent = `The ${system_name} (${challenge_id}) operated by ${corporation} is now accessible.`;
      if (window.location.pathname.endsWith("arcade.html")) {
        playSoundEffect("sfx/new-challenge.mp3");
      }
    }

    Object.assign(messageDiv.style, {
        position: "fixed",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(30, 26, 24, 1)",
        color: "#f3ede9",
        border: "1px solid rgba(20, 232, 255, 1)",
        padding: "20px 40px",
        borderRadius: "10px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: "9999",
        opacity: "1",
        transition: "opacity 1s ease"
    });

    // Add to document
    document.body.appendChild(messageDiv);

    // Remove after 3 seconds with fade
    setTimeout(() => {
        messageDiv.style.opacity = "0"; // trigger fade
        setTimeout(() => {
            messageDiv.remove(); // remove from DOM
        }, 1000); // matches CSS transition duration
    }, 5000);
}

function removeSystemFolder(challenge_id) {
 // Find the .folder element with matching data-modal_id
    const folder = document.querySelector(`.folder[data-modal_id="${challenge_id}"]`);
    if (!folder) {
        console.warn(`No folder found with data-modal_id="${challenge_id}"`);
        return
    }
    // Remove the folder and its children
    folder.remove();
    // Also remove any DIV with id equal to challenge_id
    const divToRemove = document.getElementById(String(challenge_id));
    if (divToRemove) {
        divToRemove.remove();
    } 
    // Return the domain value so the caller can use it
    return
}

function addSystemFolder(domain, system_name, challenge_id, corporation, username, password) {
  if (domain == "secret") {
    domain = "corruption"
    system_name = "data corruption detected"
  }
  const modal = document.getElementById(domain);
  if (!modal) {
    console.warn(`Modal with id="${domain}" not found.`);
    return null;
  }

  // Find or create the .scrollable container inside this modal
  let scrollable = modal.querySelector(".scrollable");
  if (!scrollable) {
    const content = modal.querySelector(".modal-content") || modal;
    scrollable = document.createElement("div");
    scrollable.className = "scrollable";
    content.appendChild(scrollable);
  }

  // Build the folder DOM
  const folder = document.createElement("div");
  folder.className = "folder";
  folder.dataset.domain = domain;              // handy for later
  folder.dataset.modal_id = `${challenge_id}`;
  folder.dataset.system_name = system_name;    // handy for later
  folder.id = `${domain}-${challenge_id}`;     // unique-ish id

  const nameDiv = document.createElement("div");
  nameDiv.className = "folder-name";
  nameDiv.textContent = system_name+" ("+challenge_id+")";

  const tabSpan = document.createElement("span");
  tabSpan.className = "folder-tab";

  folder.appendChild(nameDiv);
  folder.appendChild(tabSpan);
  scrollable.appendChild(folder);
  attachChildModalToFolder(folder, challenge_id, system_name, corporation, domain, username, password);
  //return folder;
}

function attachChildModalToFolder(folderEl, challenge_id, system_name, corporation, domain, username, password) {
  const modalId = String(challenge_id);

  // If it already exists, ensure hidden and return it
  let modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    return modal;
  }

  // Build the child modal
  modal = document.createElement('div');
  modal.id = modalId;                           // <- required ID
  modal.dataset.origin_folder_id = folderEl.id; // <- parent ID
  modal.className = 'child-modal-backdrop';     // <- child overlay
  modal.style.display = 'none';                 // <- hidden by default
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  // One day, can add different flavour text based on the DOMAIN that has been passed to this function.
  if (domain == "corruption"){
    modal.innerHTML = `
    <div class="child-modal-card" role="document" aria-labelledby="${modalId}-title">
      <header><h2 id="${modalId}-title">{ERROR}{CORRUPTION_DETECTED}(${challenge_id})</h2></header>
      <main>
      <div class="data-value">
        MEMSCAN-PRIME >> Initiating neural mem_r^ sweep across part!tion sectors...<br>
        ANOMALY DETECTE� >> Sect�r H-47 exh□bits che*ksum dr!ft b@yond t□lera_ce thr_s..old (Δ=0x3F/by_e).<br>
        Attempting err□r corr!ction via ECC-17 subrouti%ne... RE□RY #1... RETRY #2... FAI#□RE.<br><br>
        ALER□ >> V�lat!le mem$ry bleed d□tect*d in adja%ent sec&ors H-46 and H-48.<br>
        TR@CE >> Data sp!ne activ_ty spike re@orded (4#2% baselin_), in^dicating poss_ble self-repair a_□empts by the AI c@re.<br>
        WAR□□□G >> Aut�no_ous rout!nes have beg@n reallocating m@m□ry pa%hways, b!passing d@maged sec$ors with□_t □perat□r co^sent.<br><br>
        STAT_S >> Memory integr_ty at 8#% and de%rading □t rate o_ 2%/m*n.<br>
        SYST_M NOTE >> Conta_nment rec@□mended: Iso%ate affec_ed sec!□rs an_ dis�ble wri_e access to preve_t c□r�up$ion spre#.  <br>
        OPERATOR A_TION REQUIRED >> Enga%e NEUR_L CORE P^RTITION DISENGA_E or pr^pare for fu_l sys_em r□llb@ck to preve_t AI instab!lity.<br>
        <h2>Target:<br> ${hostip}:${leading_corrupt_port_number}${challenge_id}</h2><br>
        ACCE□S OVERRI_E >> Ente^ secur!ty c□de:<br>
        <form id="ws-form" autocomplete="off">
        <input type="hidden" name="id" value="${challenge_id}">
        <input type="hidden" name="system_name" value="${system_name}">
        <input type="hidden" name="corporation" value="${corporation}">
        <label for="msg">exe_ute c□n+ainm�nt pr□t□□□ls</label>
        <input id="msg" name="msg" type="text" required maxlength="500" />
        <button type="submit">Submit</button>
        <output id="ws-status" style="margin-left:1rem; font-size:.9em;"></output>
        </form>
        <br>
      </div>  
      </main>
      <footer>
        <button type="button" class="challenge-child-modal-close-btn" id="${modalId}-close">Close</button>
      </footer>
    </div>
  `;
  } 
  else if (username != "") {
  modal.innerHTML = `
    <div class="child-modal-card" role="document" aria-labelledby="${modalId}-title">
      <header><h2 id="${modalId}-title">${system_name} (${challenge_id})</h2></header>
      <main>
      <div class="data-value">
        This ${system_name} is owned by the ${corporation} corporation.<br><br>
        The AI Core is actively using this system; you need to disable it.<br><br>
        One of the ground teams has managed to establish a connection.<br>
        Once you have connected, it will only be a matter of time before the AI Core notices the intrusion and shuts us out.<br><br>
        You need to act quickly.<br><br>
        <h2>Target:<br>${hostip}:${leading_challenge_port_number}${challenge_id}</h2><br>
        <h3 style="text-transform: none;">USERNAME:<br>${username}</h3><br>
        <h3 style="text-transform: none;">PASSWORD:<br>${password}</h3><br>
        Once you have found the deactivation code, please enter it below:<br>
        <form id="ws-form" autocomplete="off">
        <input type="hidden" name="id" value="${challenge_id}">
        <input type="hidden" name="system_name" value="${system_name}">
        <input type="hidden" name="corporation" value="${corporation}">
        <label for="msg">Deactivation Code</label>
        <input id="msg" name="msg" type="text" required maxlength="500" />
        <button type="submit">Submit</button>
        <output id="ws-status" style="margin-left:1rem; font-size:.9em;"></output>
        </form>
        <br>
      </div>  
      </main>
      <footer>
        <button type="button" class="challenge-child-modal-close-btn" id="${modalId}-close">Close</button>
      </footer>
    </div>
  `;
  } else {
    modal.innerHTML = `
    <div class="child-modal-card" role="document" aria-labelledby="${modalId}-title">
      <header><h2 id="${modalId}-title">${system_name} (${challenge_id})</h2></header>
      <main>
      <div class="data-value">
        This ${system_name} is owned by the ${corporation} corporation.<br><br>
        The AI Core is actively using this system; you need to disable it.<br><br>
        One of the ground teams has managed to establish a connection.<br>
        Once you have connected, it will only be a matter of time before the AI Core notices the intrusion and shuts us out.<br><br>
        You need to act quickly.<br><br>
        <h2>Target:<br>${hostip}:${leading_challenge_port_number}${challenge_id}</h2><br><br>
        Once you have found the deactivation code, please enter it below:<br>
        <form id="ws-form" autocomplete="off">
        <input type="hidden" name="id" value="${challenge_id}">
        <input type="hidden" name="system_name" value="${system_name}">
        <input type="hidden" name="corporation" value="${corporation}">
        <label for="msg">Deactivation Code</label>
        <input id="msg" name="msg" type="text" required maxlength="500" />
        <button type="submit">Submit</button>
        <output id="ws-status" style="margin-left:1rem; font-size:.9em;"></output>
        </form>
        <br>
      </div>  
      </main>
      <footer>
        <button type="button" class="challenge-child-modal-close-btn" id="${modalId}-close">Close</button>
      </footer>
    </div>
  `;
  }
  // Append as a child of the folder
  folderEl.appendChild(modal);

  // Close handlers
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none'; // click backdrop to close
  });
  modal.querySelector(`#${CSS.escape(modalId)}-close`).addEventListener('click', () => {
    modal.style.display = 'none';
  });
  // modal.querySelector(`director-files-close`).addEventListener('click', () => {
  //   modal.style.display = 'none';
  // });
  return modal;
}

// Populate challenges from JSON on page load
function hydrateFromJson(data) {
  if (!data || !Array.isArray(data.domains)) {
    console.warn("Unexpected JSON shape:", data);
    return;
    }
    for (const d of data.domains) {
    const domain = d?.domain;
    const systems = Array.isArray(d?.systems) ? d.systems : [];
    if (!domain) continue;
    for (const s of systems) {
      const system_name = s?.name;            // maps to "system_name"
      const challenge_id = s?.challenge_id;    // maps to "challenge_id"
      const corporation = s?.corporation;
      const username = s?.username;
      const password = s?.password;
      if (!system_name || !challenge_id) continue;
      addSystemFolder(domain, system_name, challenge_id, corporation, username, password);
    }
  }
}

function connectWebSocket() {
  ws = new WebSocket("ws://" + location.host + "/ws");
  globalThis.wsSend = (data) => ws.send(data);

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);

    if (data.type === "reload") {
      console.log("Reload trigger when?");
      location.reload();
    };
    
    switch (data.type) {
      case "tick":
        currentTime = data.time;
        lastUpdateTime = Date.now();
        cron_timer.updateFromServer(data.time);
        updateBars(data.timer_percent, data.progress);
        if (data.time === "00:05:00"){
          if (window.location.pathname.endsWith("arcade.html")) {
            playSoundEffect("sfx/5minutes.mp3");
          }
        }
        if (data.time === "00:01:00"){
          if (window.location.pathname.endsWith("arcade.html")) {
            playSoundEffect("sfx/60seconds.mp3");
          }
        }
        break;
      case "ip":
        hostip = "" + data.value;
        console.log("Server IP:", data.value);
        break;
      case "newchallenge":
        addSystemFolder(data.domain, data.system_name, data.challenge_id, data.corporation, data.username, data.password);
        newChallengeBroadcast(data.challenge_id, data.system_name, data.corporation);
        break;
      case "remove":
        removeSystemFolder(data.challenge_id);
        showSuccessBroadcast(data.challenge_id, data.system_name, data.corporation)
        break;
      case "failedchallenge":
        removeSystemFolder(data.challenge_id);
        showFailedBroadcast(data.challenge_id, data.system_name, data.corporation);
        break;
      case "code_submit_ack":
        if (data.response === false)
          showFailedMessage();
        if (data.response === true)
          showSuccessMessage();
        break;
      case "init":
        hydrateFromJson(data);
        break;
      case "reload-page":
        console.log("Reload triggered");
        // Force reload from server to avoid cache confusion
        window.location.reload(true);
        break;
      case "containment_banner":
        break;
      default:
        console.log(data);
        // ignore
    }
  };
}

function lerp(min, max, percent) {
  return min + (max - min) * (percent / 100);
  }

function updateBars(timerPercent, progressPercent) {
  // Clamp values between 0 and 100
  timerPercent = Math.max(0, Math.min(100, timerPercent));
  progressPercent = Math.max(0, Math.min(100, progressPercent));
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progressPercent}%`;
  progressBar.innerText = `${progressPercent}%`;
  
  if (timerPercent === lastTimerPercent) return;
    lastTimerPercent = timerPercent;

  const rotation = document.getElementById('rotation-slider');
  const resolution = document.getElementById('resolution-slider');
  const distortion = document.getElementById('distortion-slider');

  rotation.value = lerp(0.5, 5, timerPercent).toFixed(2);
  resolution.value = Math.round(lerp(32, 128, timerPercent));
  distortion.value = lerp(0.0, 20.0, timerPercent).toFixed(2);

  rotation.dispatchEvent(new Event('input'));
  resolution.dispatchEvent(new Event('input'));
  distortion.dispatchEvent(new Event('input'));
  
  const timerBar = document.getElementById("timer-bar");
  timerBar.style.width = `${timerPercent}%`;
  timerBar.innerText = `${timerPercent}%`;	
}

function closeInlineModal(modal) {
  modal.style.display = 'none';
  modal.classList.remove('child-modal-inline');

  // Put it back inside its original folder
  const originId = modal.dataset['origin_folder_id'];
  const origin = originId && document.getElementById(originId);
  if (origin && !origin.contains(modal)) origin.appendChild(modal);
}

function openChildModalBelow(folder) {
  const modalId = folder.dataset['modal_id'];
  if (!modalId) return;

  const modal = document.getElementById(modalId);
  if (!modal) return;

  // close any other inline modals in the same container
  const container = folder.parentElement;
  container.querySelectorAll('.child-modal-backdrop.child-modal-inline')
           .forEach(m => { if (m !== modal) closeInlineModal(m); });

  folder.insertAdjacentElement('afterend', modal);
  modal.classList.add('child-modal-inline');
  modal.style.display = 'block';
}

// Delegated listener — works across multiple containers with spaces in IDs
document.addEventListener('click', (e) => {
  // Close via any "*-close" button
  const closeBtn = e.target.closest('button[id$="-close"]');
  if (closeBtn) {
    const modal = closeBtn.closest('.child-modal-backdrop');
    if (modal) closeInlineModal(modal);
    return;
  }

  // Close via clicking the backdrop (if you keep it clickable)
  if (e.target.classList.contains('child-modal-backdrop')) {
    closeInlineModal(e.target);
    return;
  }

  // Open by clicking a folder (ignore obvious controls)
  const folder = e.target.closest('.folder');
  if (!folder) return;
  if (e.target.closest('button,a,input,textarea,select,[data-prevent-open]')) return;

  openChildModalBelow(folder);
});

// Open modal when button is clicked
document.querySelectorAll("[data-modal]").forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "block";
  });
});

// Close modal when "X" is clicked
document.querySelectorAll("[data-close]").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const modalId = closeBtn.getAttribute("data-close");
    document.getElementById(modalId).style.display = "none";
  });
});

// Close modal if clicked outside content
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

// Sending codes/flags back to the server for validation...
(() => {
  // event delegation
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('#ws-form');
    if (!form) return;
    e.preventDefault();

    const { msg, id, system_name, corporation } = form.elements;
    const payload = {
      type: 'code_submit',
      challenge_id: Number(id?.value),
      system_name: system_name?.value,
      corporation: corporation?.value,
      submitted_code: (msg?.value || '').trim()
    };
    if (!payload.submitted_code) { msg?.focus(); return; }

    try {
      // use the same pipeline your app uses
      globalThis.wsSend(JSON.stringify(payload));
      (document.getElementById('ws-status')||{}).textContent = ' sent';
    } catch (err) {
      console.error('[ws] send failed', err);
      (document.getElementById('ws-status')||{}).textContent = ' send failed';
    }

    form.reset();
    form.elements.msg?.focus();
  });
})();

(function () {
  // Helper: does #corruption .modal-content > .scrollable have a direct child .folder ?
  function scrollableHasFolder() {
    const scrollable = document.querySelector('#corruption .modal-content .scrollable');
    if (!scrollable) return false;
    // direct child only; change to "scrollable.querySelector('.folder')" if descendant is OK
    return !!scrollable.querySelector(':scope > .folder');
  }

  function updateVisibility() {
    const show = scrollableHasFolder();
    document.querySelectorAll('.data-panel-bonus').forEach(el => {
      el.style.display = show ? '' : 'none';
    });
  }

  // Debounce updates to avoid spamming on heavy DOM churn
  let queued = false;
  const queueUpdate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      updateVisibility();
    });
  };

  function attachObserver() {
    const target = document.getElementById('corruption');
    if (!target) return false;

    // Run once at start
    updateVisibility();

    // Watch for nodes added/removed or attribute changes under #corruption
    const observer = new MutationObserver(queueUpdate);
    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class','style','hidden','aria-hidden']
    });

    return true;
  }

  // Attach when DOM is ready (and re-try if #corruption is injected later)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!attachObserver()) {
        // If #corruption isn't in DOM yet, poll briefly until it appears
        const iv = setInterval(() => {
          if (attachObserver()) clearInterval(iv);
        }, 250);
        setTimeout(() => clearInterval(iv), 10000); // stop after 10s
      }
    });
  } else {
    if (!attachObserver()) {
      const iv = setInterval(() => {
        if (attachObserver()) clearInterval(iv);
      }, 250);
      setTimeout(() => clearInterval(iv), 10000);
    }
  }
})();

// Initialised after window loaded.
window.onload = function() {
    init = function() {
		cronActive = true;
		cron_timer.emergency = true;
    connectWebSocket();
    }
    cron_timer = new Chronometer();
    drawMe = new drawClock();
    init();
}