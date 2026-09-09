/* ================================
   REDLINE WEBSITE SETTINGS
   ================================ */

/* Change your next meet here */
const nextMeet = new Date("2035-09-26T18:00:00");

/* Change the text shown above the timer */
document.getElementById("meetName").textContent =
    "REDLINE TENNESSEE MEET";

document.getElementById("meetDateText").textContent =
    "Unknown Date • 6:00 PM";


/* Countdown */
function updateCountdown() {
    const now = new Date();
    const distance = nextMeet - now;

    if (distance <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        document.getElementById("meetName").textContent =
            "THE MEET IS HERE!";
        return;
    }

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance / 3600000) % 24);
    const minutes = Math.floor((distance / 60000) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ================================
   RAIN EFFECT
   ================================ */

const rain = document.getElementById("rain");

for (let i = 0; i < 95; i++) {
    const drop = document.createElement("span");

    drop.className = "rain-drop";

    drop.style.left = Math.random() * 110 + "%";
    drop.style.animationDuration =
        (0.45 + Math.random() * 0.8) + "s";

    drop.style.animationDelay =
        (-Math.random() * 2) + "s";

    drop.style.opacity =
        (0.12 + Math.random() * 0.45);

    drop.style.height =
        (35 + Math.random() * 65) + "px";

    rain.appendChild(drop);
}
