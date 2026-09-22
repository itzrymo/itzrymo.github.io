const cards = document.querySelectorAll(".social-card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 5;
        const rotateX = ((y / rect.height) - 0.5) * -5;

        card.style.transform =
            `translateY(-10px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });

});


/* Subtle cursor glow */
const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "280px";
glow.style.height = "280px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.zIndex = "-1";
glow.style.background =
    "radial-gradient(circle, rgba(220,0,0,.07), transparent 68%)";
glow.style.transform = "translate(-50%, -50%)";
glow.style.left = "50%";
glow.style.top = "50%";
glow.style.transition = "left .12s ease-out, top .12s ease-out";

document.body.appendChild(glow);

window.addEventListener("mousemove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
});


/* Small entrance effect */
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
