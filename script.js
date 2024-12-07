const prevButton = document.querySelector('.prev'); 
const nextButton = document.querySelector('.next');
const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');
const visibleImages = 3; // Number of visible images at a time

// Wait for images to fully load and set up the carousel
window.addEventListener('load', () => {
    const imageWidth = images[0].offsetWidth + 20; // include margin/padding if any
    let currentIndex = 0;
    const totalImages = images.length;

    function updateCarousel() {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex === totalImages - visibleImages) {
            currentIndex = 0;  // Go back to the first image
        } else {
            currentIndex++; // Move to the next image
        }
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = totalImages - visibleImages; // Go to the last image
        } else {
            currentIndex--; // Move to the previous image
        }
        updateCarousel();
    });

    // Auto cycling
    setInterval(() => {
        if (currentIndex === totalImages - visibleImages) {
            currentIndex = 0; // Go back to the first image
        } else {
            currentIndex++; // Move to the next image
        }
        updateCarousel();
    }, 3000); // Adjust the speed of the auto-rotate here

    updateCarousel(); // Initial setup of the carousel
});




