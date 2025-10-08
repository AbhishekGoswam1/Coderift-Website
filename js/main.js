/* ===== CODERIFT TECHNOLOGIES - MAIN JAVASCRIPT ===== */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    initStickyHeader();
    initMobileNavigation();
    initTestimonialsCarousel();
    initFormValidation();
    initSmoothScrolling();
    initAnimations();
    initAccessibility();
}

// ===== STICKY HEADER =====
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    if (!mobileToggle || !mobileNav) return;

    // Toggle mobile nav
    mobileToggle.addEventListener('click', function() {
        const isActive = mobileToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    // Close mobile nav when clicking links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    });

    function openMobileNav() {
        mobileToggle.classList.add('active');
        mobileNav.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Focus trap
        trapFocus(mobileNav);
        
        // Announce to screen readers
        announceToScreenReader('Mobile navigation opened');
    }

    function closeMobileNav() {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
        
        // Return focus to toggle button
        mobileToggle.focus();
        
        // Announce to screen readers
        announceToScreenReader('Mobile navigation closed');
    }
}

// ===== FOCUS TRAP =====
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    if (firstElement) {
        firstElement.focus();
    }
}

// ===== TESTIMONIALS CAROUSEL =====
function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials-track');
    const testimonials = carousel.querySelectorAll('.testimonial');
    const prevBtn = carousel.querySelector('.carousel-btn[data-direction="prev"]');
    const nextBtn = carousel.querySelector('.carousel-btn[data-direction="next"]');
    const indicators = carousel.querySelectorAll('.indicator');
    const pauseBtn = carousel.querySelector('.carousel-btn[data-action="pause"]');
    const playBtn = carousel.querySelector('.carousel-btn[data-action="play"]');

    if (!track || !testimonials.length) return;

    let currentIndex = 0;
    let autoplayInterval;
    let isPlaying = true;
    const autoplayDelay = 5000; // 5 seconds

    // Initialize carousel
    function initCarousel() {
        updateCarousel();
        startAutoplay();
        setupEventListeners();
    }

    // Update carousel position
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });

        // Update button states
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === testimonials.length - 1;
    }

    // Navigate to specific slide
    function goToSlide(index) {
        if (index >= 0 && index < testimonials.length) {
            currentIndex = index;
            updateCarousel();
        }
    }

    // Next slide
    function nextSlide() {
        if (currentIndex < testimonials.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop to first
        }
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = testimonials.length - 1; // Loop to last
        }
        updateCarousel();
    }

    // Start autoplay
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
        isPlaying = true;
        updatePlayPauseButtons();
    }

    // Stop autoplay
    function stopAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        isPlaying = false;
        updatePlayPauseButtons();
    }

    // Toggle autoplay
    function toggleAutoplay() {
        if (isPlaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    }

    // Update play/pause button states
    function updatePlayPauseButtons() {
        if (pauseBtn) pauseBtn.style.display = isPlaying ? 'flex' : 'none';
        if (playBtn) playBtn.style.display = isPlaying ? 'none' : 'flex';
    }

    // Setup event listeners
    function setupEventListeners() {
        // Navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        // Play/pause buttons
        if (pauseBtn) {
            pauseBtn.addEventListener('click', stopAutoplay);
        }
        if (playBtn) {
            playBtn.addEventListener('click', startAutoplay);
        }

        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', () => {
            if (isPlaying) startAutoplay();
        });

        // Keyboard navigation
        carousel.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    toggleAutoplay();
                    break;
            }
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            stopAutoplay();
        });

        carousel.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
        });

        carousel.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
            if (isPlaying) startAutoplay();
        });
    }

    // Initialize carousel
    initCarousel();
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    const isValid = validateForm(form);
    
    if (isValid) {
        submitForm(form, data);
    }
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Min length validation
    const minLength = field.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
        showFieldError(field, `Minimum ${minLength} characters required`);
        return false;
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Submit form
async function submitForm(form, data) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Configure form endpoint (update this URL)
        const endpoint = form.action || 'https://formspree.io/f/YOUR_FORM_ID';
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showFormSuccess(form, 'Thank you! Your message has been sent successfully.');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError(form, 'Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Show form success message
function showFormSuccess(form, message) {
    const successElement = document.createElement('div');
    successElement.className = 'form-success';
    successElement.textContent = message;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.parentNode.insertBefore(successElement, submitBtn.nextSibling);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successElement.remove();
    }, 5000);
}

// Show form error message
function showFormError(form, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.parentNode.insertBefore(errorElement, submitBtn.nextSibling);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .testimonial, .section-title, .section-subtitle');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== ACCESSIBILITY =====
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Announce changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// ===== UTILITY FUNCTIONS =====

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get element by ID safely
function getElementById(id) {
    return document.getElementById(id);
}

// Query selector with error handling
function querySelector(selector, parent = document) {
    try {
        return parent.querySelector(selector);
    } catch (error) {
        console.warn(`Invalid selector: ${selector}`);
        return null;
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        '/css/styles.css',
        '/js/main.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    preloadCriticalResources();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send error reports to a logging service here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send error reports to a logging service here
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initStickyHeader,
        initMobileNavigation,
        initTestimonialsCarousel,
        initFormValidation,
        debounce,
        throttle
    };
}
