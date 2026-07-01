// =====================
// NAVBAR FUNCTIONALITY
// =====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// =====================
// GALLERY FILTER
// =====================

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter gallery items
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                const category = item.getAttribute('data-category');
                if (category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// =====================
// CONTACT FORM
// =====================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    
    // Create a temporary success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    successMsg.textContent = '✓ Thank you! We\'ll contact you soon.';
    document.body.appendChild(successMsg);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
    
    // Reset form
    contactForm.reset();
});

// =====================
// SCROLL ANIMATIONS
// =====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe promo cards
document.querySelectorAll('.promo-card').forEach(card => {
    observer.observe(card);
});

// =====================
// COUNTER ANIMATION
// =====================

let countersAnimated = false;

const countUpAnimation = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let count = 0;
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.ceil(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCount();
    });
};

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('#services');
    
    if (statsSection && !countersAnimated) {
        const rect = statsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Uncomment if you add stats section with counters
            // countUpAnimation();
            countersAnimated = true;
        }
    }
});

// =====================
// MOBILE MENU STYLES
// =====================

const style = document.createElement('style');
style.innerHTML = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            gap: 0;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .nav-menu.active {
            max-height: 400px;
        }
        
        .nav-menu li {
            border-bottom: 1px solid #e2e8f0;
        }
        
        .nav-menu li a {
            display: block;
            padding: 1rem 2rem;
        }
    }
`;
document.head.appendChild(style);

// =====================
// LAZY LOADING
// =====================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =====================
// SMOOTH PAGE LOAD
// =====================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// =====================
// NEWSLETTER SIGNUP (if needed)
// =====================

const handleNewsletterSignup = (email) => {
    // Handle newsletter signup
    if (email.includes('@')) {
        console.log('Newsletter signup:', email);
        return true;
    }
    return false;
};

// =====================
// UTILITY FUNCTIONS
// =====================

// Smooth scroll helper
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// Debounce function for scroll events
const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Throttle function for performance
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// =====================
// DARK MODE TOGGLE (Optional)
// =====================

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Check if dark mode was previously enabled
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// =====================
// KEYBOARD NAVIGATION
// =====================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on ESC
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// =====================
// PRINT TO CONSOLE
// =====================

console.log('%cWelcome to Aurora Autosspa! 🚗', 'font-size: 20px; color: #1e40af; font-weight: bold;');
console.log('Premium Car Detailing & Protection Services');
