// Modern portfolio JavaScript with enhanced effects

// Navbar functionality with smooth transitions
const initNavbar = () => {
    const navbar = document.querySelector('.navbar');
    const navContainer = navbar.querySelector('.nav-container');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Check if the toggle already exists to avoid duplicates
    if (!navbar.querySelector('.nav-toggle')) {
        // Insert at the beginning of nav-container
        navContainer.insertBefore(navToggle, navContainer.firstChild);
    }

    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle with animation
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Enhanced smooth scroll with highlight
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll with offset for fixed header
                const headerOffset = navbar.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Update active link with animation
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Advanced navbar scroll effect with progress indicator
    const addProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            
            // Add class for scroll state with transition
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                document.body.classList.add('scrolled-page');
            } else {
                navbar.classList.remove('scrolled');
                document.body.classList.remove('scrolled-page');
            }
        });
    };
    addProgressBar();
};

// Modern particles effect with depth and interaction
const createModernParticles = () => {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 80;
    const colors = ['#0ea5e9', '#3b82f6', '#06b6d4', '#0284c7'];
    const sizes = [2, 3, 4];
    const particles = [];

    // Create particles with enhanced properties
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Enhanced random properties
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 20 + 15;
        const blur = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.filter = `blur(${blur}px)`;
        particle.style.opacity = opacity;
        
        particlesContainer.appendChild(particle);
        particles.push(particle);
    }

    // Add subtle mouse interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            if (index % 3 === 0) { // Only affect some particles for performance
                const offsetX = (mouseX - 0.5) * 20;
                const offsetY = (mouseY - 0.5) * 20;
                const delay = index * 0.01;
                
                setTimeout(() => {
                    particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }, delay);
            }
        });
    });
};

// Title animation effect
const createTitleEffect = () => {
    // This function is now just a placeholder since we've moved to a static title with CSS animation
    // We're keeping it to maintain compatibility with the rest of the code
    console.log('Title effect initialized');
    
    // You can add additional title animations here if needed in the future
};

// Name text hover effect
const initNameHoverEffect = () => {
    const nameText = document.querySelector('.name-text');
    if (!nameText) return;
    
    // Add glow effect on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 300) { // Only when near the top
            nameText.style.textShadow = `0 5px ${15 + scrollPosition/30}px rgba(14, 165, 233, ${0.5 + scrollPosition/1000})`;  
        }
    });
};

// Skill bars animation with intersection observer
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth + '%';
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    skillBars.forEach(bar => observer.observe(bar));
};

// Enhanced timeline animation with staggered reveal
const enhanceTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    timelineItems.forEach((item, index) => {
        // Set initial state based on position
        const direction = index % 2 === 0 ? -1 : 1;
        item.style.transform = `translateX(${direction * 50}px)`;
        item.style.opacity = '0';
        item.style.transition = `all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67) ${index * 0.1}s`;
        observer.observe(item);
    });
};

// Project cards hover effect
const enhanceProjectCards = () => {
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            appCards.forEach(c => c.classList.add('dimmed'));
            card.classList.remove('dimmed');
            card.classList.add('focused');
        });
        
        card.addEventListener('mouseleave', () => {
            appCards.forEach(c => {
                c.classList.remove('dimmed');
                c.classList.remove('focused');
            });
        });
    });
};

// Scroll down indicator functionality
const initScrollIndicator = () => {
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', () => {
        const summarySection = document.querySelector('#summary');
        if (summarySection) {
            summarySection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide indicator on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
};

// Dark mode toggle functionality
const initDarkMode = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Apply the saved theme or use system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Update icon and save preference
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
    
    // Listen for system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.body.classList.remove('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    });
};

// Add section decorators
const addSectionDecorators = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Add decorative elements
        const topRightDecorator = document.createElement('div');
        topRightDecorator.className = 'section-decorator top-right';
        
        const bottomLeftDecorator = document.createElement('div');
        bottomLeftDecorator.className = 'section-decorator bottom-left';
        
        // Alternate colors for visual interest
        if (index % 2 === 0) {
            topRightDecorator.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(59, 130, 246, 0.05))';
            bottomLeftDecorator.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(14, 165, 233, 0.05))';
        } else {
            topRightDecorator.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05))';
            bottomLeftDecorator.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(59, 130, 246, 0.05))';
        }
        
        section.appendChild(topRightDecorator);
        section.appendChild(bottomLeftDecorator);
    });
};

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        delay: 100
    });

    // Add scroll-to-top functionality for nav brand
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize all components
    initNavbar();
    createModernParticles();
    createTitleEffect();
    initNameHoverEffect(); // Initialize the name hover effect
    animateSkillBars();
    enhanceTimeline();
    enhanceProjectCards();
    initScrollIndicator();
    initDarkMode();
    addSectionDecorators();
});
