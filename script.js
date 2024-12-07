const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');
const visibleImages = 3; 

const imageWidth = images[0].offsetWidth + 20; 
let currentIndex = 0;  
const totalImages = images.length;

const firstImages = Array.from(images).slice(0, visibleImages);
const lastImages = Array.from(images).slice(images.length - visibleImages);

firstImages.forEach(image => {
    const clonedImage = image.cloneNode(true);
    track.appendChild(clonedImage);
});

lastImages.forEach(image => {
    const clonedImage = image.cloneNode(true);
    track.insertBefore(clonedImage, track.firstChild);
});

const allImages = document.querySelectorAll('.carousel-image');
const totalAllImages = allImages.length;

function updateCarousel() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

nextButton.addEventListener('click', () => {

    if (currentIndex === totalAllImages - visibleImages) {
        track.style.transition = 'none'; 
        currentIndex = visibleImages;    
        updateCarousel();
        
    setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
    } else {
        currentIndex++;
        updateCarousel();
    }
});

prevButton.addEventListener('click', () => {

    if (currentIndex === 0) {
        track.style.transition = 'none';  
        currentIndex = totalAllImages - visibleImages * 2; 
        updateCarousel();
        
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    } else {
        currentIndex--;
        updateCarousel();
    }
});

setInterval(() => {
    if (currentIndex === totalAllImages - visibleImages) {
        track.style.transition = 'none'; 
        currentIndex = visibleImages;    
        updateCarousel();
        
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    } else {
        currentIndex++;
        updateCarousel();
    }
}, 3000);  

updateCarousel();
