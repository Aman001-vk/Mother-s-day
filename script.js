document.addEventListener('DOMContentLoaded', function() {
    // Background music functionality
    const backgroundMusic = document.getElementById('background-music');
    
    // Function to unmute and play music
    function playMusic() {
        backgroundMusic.muted = false;
        backgroundMusic.play()
            .then(() => {
                console.log("Music playing successfully");
            })
            .catch(error => {
                console.log("Playback failed:", error);
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
            playMusic();
            this.remove();
        };
        document.body.appendChild(playButton);
    }

    // Try to play music immediately
    playMusic();

    // Also try to play on any user interaction
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);

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
