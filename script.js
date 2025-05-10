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
    
    // Try to play music automatically
    function tryAutoplay() {
        backgroundMusic.play()
            .then(() => {
                console.log("Autoplay successful");
            })
            .catch(error => {
                console.log("Autoplay failed:", error);
                // If autoplay fails, show a play button
                showPlayButton();
            });
    }

    // Show play button if autoplay fails
    function showPlayButton() {
        const playButton = document.createElement('button');
        playButton.innerHTML = '🎵 Play Music';
        playButton.className = 'play-music-button';
        playButton.onclick = function() {
            backgroundMusic.play();
            this.remove();
        };
        document.body.appendChild(playButton);
    }

    // Try to play music when the page loads
    tryAutoplay();

    // Also try to play on any user interaction
    document.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        }
    });
    document.addEventListener('touchstart', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        }
    });

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
