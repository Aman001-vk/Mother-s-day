document.addEventListener('DOMContentLoaded', function() {
    // Image slider functionality
    const images = document.querySelectorAll('.image-slider img');
    let currentImageIndex = 0;

    function showNextImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    // Change image every 5 seconds
    setInterval(showNextImage, 5000);

    // Background music functionality
    const backgroundMusic = document.getElementById('background-music');
    
    // Function to play music when user interacts with the page
    function playBackgroundMusic() {
        backgroundMusic.play().catch(function(error) {
            console.log("Audio playback failed:", error);
        });
        // Remove the event listeners after first interaction
        document.removeEventListener('click', playBackgroundMusic);
        document.removeEventListener('touchstart', playBackgroundMusic);
    }

    // Add event listeners for user interaction
    document.addEventListener('click', playBackgroundMusic);
    document.addEventListener('touchstart', playBackgroundMusic);

    // Scroll Animation Functionality
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    document.querySelectorAll('.message p, .photo-grid img').forEach(element => {
        observer.observe(element);
    });

    // Add hover effect to gallery images
    const galleryImages = document.querySelectorAll('.photo-grid img');
    galleryImages.forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
}); 