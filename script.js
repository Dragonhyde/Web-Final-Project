const prevButton = document.querySelector('.prev'); 
const nextButton = document.querySelector('.next');
const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');
const visibleImages = 3;  // Show 3 images at once

const imageWidth = images[0].offsetWidth + 20;  // Includes margin
let currentIndex = 0;
const totalImages = images.length;

// Update carousel position
function updateCarousel() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Next button click event
nextButton.addEventListener('click', () => {
    if (currentIndex === totalImages - visibleImages) {
        currentIndex = 0;  // Go back to the first image
    } else {
        currentIndex++;  // Move to the next image
    }
    updateCarousel();
});

// Previous button click event
prevButton.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = totalImages - visibleImages;  // Go to the last image
    } else {
        currentIndex--;  // Move to the previous image
    }
    updateCarousel();
});

// Auto cycling every 3 seconds
setInterval(() => {
    if (currentIndex === totalImages - visibleImages) {
        currentIndex = 0;  // Go back to the first image
    } else {
        currentIndex++;  // Move to the next image
    }
    updateCarousel();
}, 3000);

// Initial carousel update
updateCarousel();





