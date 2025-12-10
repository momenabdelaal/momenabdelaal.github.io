// Published Apps Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize each platform slider
    initSlider('android-slider');
    initSlider('ios-slider');
    initSlider('flutter-slider');
    initSlider('sdk-slider');
    
    function initSlider(sliderClass) {
        // Elements
        const sliderContainer = document.querySelector('.' + sliderClass);
        if (!sliderContainer) return;
        
        const slider = sliderContainer.querySelector('.apps-slider');
        const slides = sliderContainer.querySelectorAll('.apps-slide');
        const dots = sliderContainer.querySelectorAll('.slider-dot');
        const prevBtn = sliderContainer.querySelector('.slider-prev');
        const nextBtn = sliderContainer.querySelector('.slider-next');
        
        // Variables
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Initialize
        updateSlider();
        
        // Event Listeners
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
        
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    goToSlide(index);
                });
            });
        }
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (slider) {
            slider.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            slider.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
        }
        
        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // Swipe left (next)
                goToSlide((currentSlide + 1) % slideCount);
            } else if (touchEndX > touchStartX) {
                // Swipe right (prev)
                goToSlide((currentSlide - 1 + slideCount) % slideCount);
            }
        }
        
        // Functions
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        function updateSlider() {
            if (!slider) return;
            
            // Update slider position
            slider.style.transform = `translateX(${currentSlide * -100}%)`;
            
            // Update active slide for accessibility
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.classList.add('active');
                    slide.setAttribute('aria-hidden', 'false');
                } else {
                    slide.classList.remove('active');
                    slide.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Update active dot
            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
    }
    
    // Log for debugging
    console.log('All sliders initialized');
});
