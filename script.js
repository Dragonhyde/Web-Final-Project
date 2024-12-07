const prevButton = document.querySelector('.prev'); 
const nextButton = document.querySelector('.next');
const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');

const imageWidth = images[0].offsetWidth + 20;  
let currentIndex = 0;
const totalImages = images.length;


function updateCarousel() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}


nextButton.addEventListener('click', () => {
    if (currentIndex === totalImages - visibleImages) {
        currentIndex = 0;  
    } else {
        currentIndex++;  
    }
    updateCarousel();
});


prevButton.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = totalImages - visibleImages;  
    } else {
        currentIndex--;  
    }
    updateCarousel();
});


setInterval(() => {
    if (currentIndex === totalImages - visibleImages) {
        currentIndex = 0;  
    } else {
        currentIndex++;  
    }
    updateCarousel();
}, 3000);


updateCarousel();





