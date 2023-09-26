document.addEventListener("DOMContentLoaded", function() {
const carousels = document.querySelectorAll(".carroussel-container");

carousels.forEach(carousel => {
    const slides = carousel.querySelector(".slides");
    const slide = carousel.querySelectorAll(".slide");
    const prev_button = carousel.querySelector(".prev");
    const next_button = carousel.querySelector(".next");

    let index = 0;

    prev_button.addEventListener("click", () => {
        index = Math.max(index-2, -1, 0);
        updateSlidePosition()
    })

    next_button.addEventListener("click", () => {
        index = Math.min(index+1, 1);
        updateSlidePosition()
    })


    function updateSlidePosition() {
        const slide_width = 870;
        slides.style.transform = `translateX(${-index * slide_width}px)`
    }
    })

});
