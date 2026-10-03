// Summer: restrained heat-haze style ambient particles.
window.REDLINE_SEASON = 'summer';
// Redline seasonal effects + shared site interactions.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  // EDIT THIS DATE/TIME FOR YOUR NEXT MEET. Format: YYYY-MM-DDTHH:MM:SS
  const eventDate = new Date("2026-10-31T18:00:00-05:00").getTime();
  const countdown = document.getElementById("countdown");
  const tick = () => {
    if (!countdown) return;
    const distance = eventDate - Date.now();
    const values = distance > 0
      ? [Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24,
         Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60]
      : [0, 0, 0, 0];
    countdown.querySelectorAll("strong").forEach((el, i) => el.textContent = String(values[i]).padStart(2, "0"));
  };
  tick(); setInterval(tick, 1000);

  const layer = document.getElementById("seasonEffects");
  if (layer) {
    const count = window.REDLINE_SEASON === "christmas" ? 34 : 18;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("i");
      dot.className = "season-particle";
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${Math.random() * 14}s`;
      dot.style.animationDuration = `${10 + Math.random() * 14}s`;
      dot.style.setProperty("--drift", `${Math.random() * 100 - 50}px`);
      layer.appendChild(dot);
    }
  }
});
