/* =====================================================
   REDLINE STUNT RIDERS
   Gallery Modal
===================================================== */


const stuntCards =
    document.querySelectorAll(".stunt-card");

const stuntModal =
    document.getElementById("stuntModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalRider =
    document.getElementById("modalRider");

const modalStunt =
    document.getElementById("modalStunt");

const modalBike =
    document.getElementById("modalBike");

const modalDescription =
    document.getElementById("modalDescription");



/* =====================================================
   OPEN MODAL
===================================================== */

stuntCards.forEach(card => {

    card.addEventListener("click", () => {


        const rider =
            card.dataset.rider;

        const stunt =
            card.dataset.stunt;

        const bike =
            card.dataset.bike;

        const description =
            card.dataset.description;

        const image =
            card.dataset.image;


        modalRider.textContent =
            rider;

        modalStunt.textContent =
            stunt.toUpperCase();

        modalBike.textContent =
            bike;

        modalDescription.textContent =
            description;

        modalImage.src =
            image;

        modalImage.alt =
            rider + " performing " + stunt;


        stuntModal.classList.add("active");


        document.body.style.overflow =
            "hidden";

    });

});



/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {

    stuntModal.classList.remove("active");

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener(
    "click",
    closeModal
);



/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            stuntModal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);