// Navbar functionality
const initNavbar = () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.appendChild(navToggle);

    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth scroll with highlight
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Navbar scroll effect with progress indicator
    const addProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    };
    addProgressBar();
};

// Enhanced particles effect
const createEnhancedParticles = () => {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    const colors = ['#7c3aed', '#9333ea', '#f472b6'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
};

// Skill bars animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
};

// Enhanced timeline animation
const enhanceTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach((item, index) => {
        item.style.transform = index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
};

// Initialize all animations
// Typing animation for header
const typeWriter = (element, text, speed = 100, delay = 2000) => {
    let i = 0;
    
    const erase = () => {
        if (i > 0) {
            element.innerHTML = text.substring(0, i-1);
            i--;
            setTimeout(erase, speed/2);
        } else {
            setTimeout(type, delay);
        }
    };
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(erase, delay);
        }
    };
    
    type();
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        const originalText = headerTitle.textContent;
        headerTitle.textContent = ''; // Clear the content first
        setTimeout(() => {
            typeWriter(headerTitle, originalText, 100);
        }, 500);
    }

    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    initNavbar();
    createEnhancedParticles();
    animateSkillBars();
    enhanceTimeline();
});
