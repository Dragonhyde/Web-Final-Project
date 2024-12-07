const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');

const imageWidth = images[0].offsetWidth + 20;  
let currentIndex = 0;
const totalImages = images.length;

// Function to update the carousel
function updateCarousel() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Event listener for the next button (go to next image)
nextButton.addEventListener('click', () => {
    if (currentIndex === totalImages - 1) {
        currentIndex = 0;  // Go back to the first image
    } else {
        currentIndex++;  // Move to the next image
    }
    updateCarousel();
});

// Event listener for the previous button (go to previous image)
prevButton.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = totalImages - 1;  // Go to the last image
    } else {
        currentIndex--;  // Move to the previous image
    }
    updateCarousel();
});

// Initial update to position the carousel correctly
updateCarousel();





