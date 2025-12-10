// App Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    initAppSlider();
});

function initAppSlider() {
    const categoryTabs = document.querySelectorAll('.app-category-tab');
    const slides = document.querySelectorAll('.app-slide');
    const slider = document.querySelector('.app-slider');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    let currentIndex = 0;
    
    // Initialize the slider
    updateSlider();
    
    // Category tab click event
    categoryTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update slider position
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Dot click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Previous slide button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }
    
    // Next slide button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });
    }
    
    // Update slider position and active states
    function updateSlider() {
        // Update slider position
        if (slider) {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update active tab
        categoryTabs.forEach((tab, index) => {
            if (index === currentIndex) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Trigger AOS refresh for animations
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        }
    }
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.app-slider-container');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }
    }
}
