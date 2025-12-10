// Published Apps Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const tabsContainer = document.querySelector('.apps-tabs');
    const tabs = document.querySelectorAll('.apps-tab');
    const slider = document.querySelector('.apps-slider');
    const slides = document.querySelectorAll('.apps-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dot');
    
    // Variables
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Initialize
    updateSlider();
    
    // Event Listeners
    if (tabsContainer) {
        tabsContainer.addEventListener('click', function(e) {
            const tab = e.target.closest('.apps-tab');
            if (tab) {
                const platform = tab.dataset.platform;
                const slideIndex = Array.from(tabs).findIndex(t => t.dataset.platform === platform);
                if (slideIndex !== -1) {
                    goToSlide(slideIndex);
                }
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goToSlide((currentSlide - 1 + slideCount) % slideCount);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goToSlide((currentSlide + 1) % slideCount);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swiped left (next slide)
            goToSlide((currentSlide + 1) % slideCount);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swiped right (previous slide)
            goToSlide((currentSlide - 1 + slideCount) % slideCount);
        }
    }
    
    // Functions
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function updateSlider() {
        // Update slider position (RTL direction)
        slider.style.transform = `translateX(${currentSlide * (100 / slideCount)}%)`;
        
        // Update active tab
        tabs.forEach((tab, index) => {
            if (index === currentSlide) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Update active slide
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
});
