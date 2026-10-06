const video = document.getElementById("bgVideo");

if (video) {
  video.muted = true;

  const start = () => video.play().catch(() => {});

  window.addEventListener("load", start);

  document.addEventListener("visibilitychange", () => {
    document.hidden ? video.pause() : start();
  });
}


/* =========================================
   LOCAL REDLINE MERCH POPUP
========================================= */

function openLocalMerch(productName) {
  const modal = document.getElementById("localMerchModal");
  const title = document.getElementById("localMerchTitle");

  if (!modal) return;

  title.textContent = productName;

  modal.classList.add("active");

  document.body.style.overflow = "hidden";
}


function closeLocalMerch() {
  const modal = document.getElementById("localMerchModal");

  if (!modal) return;

  modal.classList.remove("active");

  document.body.style.overflow = "";
}


/* Close popup with ESC */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLocalMerch();
  }
});