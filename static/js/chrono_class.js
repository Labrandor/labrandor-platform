class Chronometer {
    constructor() {
        this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		this.milliseconds = 0;
		this.timeUpdate;
        this.duration;
        this.emergency = false;
        this.active = false;
    }
	
	updateFromServer(timeString) {
		// Clear any existing timer loop.
		if (this.timeUpdate) {
			clearInterval(this.timeUpdate);
		}

		// Parse server time.
		const [h, m, s] = timeString.split(":").map(Number);
		this.hours = h;
		this.minutes = m;
		this.seconds = s;

		// Total countdown time in milliseconds.
		const baseMilliseconds = (h * 3600 + m * 60 + s) * 1000;

		// Set a reference start time.
		const clientStartTime = Date.now();

		// Save to instance for reference if needed.
		this.lastKnownMillis = baseMilliseconds;

		// Start smooth update loop.
		this.timeUpdate = setInterval(() => {
			const now = Date.now();
			const elapsed = now - clientStartTime;

			let remaining = baseMilliseconds - elapsed;
			if (remaining <= 0) {
				remaining = 0;
				clearInterval(this.timeUpdate);
			}

			const hours = Math.floor(remaining / (3600 * 1000));
			const minutes = Math.floor((remaining % (3600 * 1000)) / (60 * 1000));
			const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
			const milliseconds = Math.floor((remaining % 1000) / 10); // two digits (0–99)

			this.hours = hours;
			this.minutes = minutes;
			this.seconds = seconds;
			this.milliseconds = milliseconds;

			crono.hours = hours;
			crono.minutes = minutes;
			crono.seconds = seconds;
			crono.milliseconds = milliseconds;

			drawMe.draw(
				hours.toString().padStart(2, '0'),
				minutes.toString().padStart(2, '0'),
				seconds.toString().padStart(2, '0'),
				milliseconds.toString().padStart(2, '0')
			);
		}, 25);
	}
}

class drawClock {
    draw(h, m, s, ms) {
		let thisHour = document.getElementById('clockHour').innerText;
						
        if (getId("clockSecond").innerText !== s) {
            if (parseInt(thisHour) <= 0 && cron_timer.emergency) {
                graphic_glitch('hard');
            }
        }
        if (getId("clockMinute").innerText !== m) {
            let rndrate = 1;
            if (parseInt(thisHour) >= 2 && cron_timer.emergency) {
                graphic_glitch('clear');
            }
            if (parseInt(thisHour) <= 2 && cron_timer.emergency) {
                graphic_glitch();
            }            
            if (parseInt(thisHour) <= 0 && cron_timer.emergency) {
                rndrate = Math.random(1.5)+0.8;
            }
        }
		getId("clockHour").innerText = h;
        getId("clockMinute").innerText = m;
        getId("clockSecond").innerText = s;
		getId("clockMillisecond").innerText = ms;
    }
}