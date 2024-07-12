document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize a carousel
    const initializeCarousel = (carouselSelector, visibleCards) => {
        const prevButton = document.querySelector(`${carouselSelector} .carousel-prev`);
        const nextButton = document.querySelector(`${carouselSelector} .carousel-next`);
        const track = document.querySelector(`${carouselSelector} .carousel-track`);
        const cardWidth = document.querySelector(`${carouselSelector} .destination-card, ${carouselSelector} .journey-card`).offsetWidth;
        const cardGap = parseInt(window.getComputedStyle(track).gap);
        let scrollAmount = 0;

        // Function to handle scrolling
        const updateScrollPosition = () => {
            track.style.transform = `translateX(-${scrollAmount}px)`;
        };

        // Event listener for Next button
        nextButton.addEventListener('click', () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (scrollAmount < maxScroll) {
                scrollAmount += (cardWidth + cardGap) * visibleCards;
                updateScrollPosition();
            } else {
                scrollAmount = 0; // Scroll back to the start if at the end
                updateScrollPosition();
            }
        });

        // Event listener for Previous button
        prevButton.addEventListener('click', () => {
            if (scrollAmount > 0) {
                scrollAmount -= (cardWidth + cardGap) * visibleCards;
                updateScrollPosition();
            } else {
                scrollAmount = track.scrollWidth - track.clientWidth; // Scroll to the end if at the start
                updateScrollPosition();
            }
        });

        // Update track for initial view
        updateScrollPosition();
    };

    // Initialize carousels
    initializeCarousel('.study-destinations .carousel', 3);  // For Study Destinations section
    initializeCarousel('.your-journey .carousel', 3);  // For Your Journey With Us section

    // Automatic scrolling for the Student Reviews section
    const reviewsContainer = document.querySelector('.reviews-container');
    const reviewCard = document.querySelector('.review-card');
    const cardWidth = reviewCard.offsetWidth + 20; // 20px is the gap
    let scrollAmount = 0;

    // Function to scroll the reviews
    function autoScroll() {
        scrollAmount += cardWidth * 3; // Scroll by 3 cards worth of width
        if (scrollAmount >= reviewsContainer.scrollWidth) {
            scrollAmount = 0; // Reset to the beginning
        }
        reviewsContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Set interval for automatic scrolling
    setInterval(autoScroll, 5000); // Scroll every 5 seconds

    // Add event listeners for the buttons
    document.querySelector('.next-btn').addEventListener('click', () => {
        scrollAmount += cardWidth * 3; // Scroll by 3 cards worth of width
        if (scrollAmount >= reviewsContainer.scrollWidth) {
            scrollAmount = 0; // Reset to the beginning
        }
        reviewsContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        scrollAmount -= cardWidth * 3; // Scroll back by 3 cards worth of width
        if (scrollAmount < 0) {
            scrollAmount = reviewsContainer.scrollWidth - cardWidth * 3; // Go to the end
        }
        reviewsContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Contact Form Submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
    
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
    
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Submit the form using AJAX
        fetch('message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        })
        .then(response => response.text())
        .then(data => {
            alert('Thank you for your message. We will get back to you soon!');
            document.getElementById('contactForm').reset(); // Reset the form
        })
        .catch(error => {
            alert('Sorry, there was an error sending your message. Please try again later.');
        });
    });

});
