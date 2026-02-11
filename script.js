// Slider functionality with radio buttons
const radioButtons = document.querySelectorAll('.slider-radio');

// Optional: Auto-rotate slides every 5 seconds
let currentSlide = 1;

setInterval(() => {
    const nextSlide = currentSlide === 3 ? 1 : currentSlide + 1;
    document.getElementById(`slide${nextSlide}`).checked = true;
    currentSlide = nextSlide;
}, 15000);
