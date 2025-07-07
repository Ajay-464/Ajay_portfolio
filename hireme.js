// Initialize EmailJS
(function() {
    emailjs.init('5EbkoUwb4EYZ0iLOF');
})();

// Testimonials data storage with localStorage persistence
let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [
    {
        name: "Sarah Johnson",
        company: "Tech Startup Inc.",
        rating: 5,
        message: "Exceptional work on our brand identity. The logo design perfectly captured our vision and the attention to detail was outstanding.",
        avatar: "SJ"
    },
    
];



// Save testimonials to localStorage
function saveTestimonials() {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
}

// Testimonials slider functionality
let currentSlide = 0;
const slidesToShow = window.innerWidth > 768 ? 3 : 1;

function updateSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const cardWidth = 350 + 36; // card width + gap
    const maxSlide = Math.max(0, testimonials.length - slidesToShow);
    
    currentSlide = Math.min(currentSlide, maxSlide);
    
    if (slider) {
        slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }
    
    // Update button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide >= maxSlide;
}

function nextSlide() {
    const maxSlide = Math.max(0, testimonials.length - slidesToShow);
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateSlider();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
}



// Floating Icons Animation with Enhanced Movement
function animateFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    const shapes = document.querySelectorAll('.floating-shape');
    const sideShapes = document.querySelectorAll('.side-shape');
    
    icons.forEach((icon, index) => {
        const delay = index * 800 + Math.random() * 1500;
        setTimeout(() => {
            icon.style.opacity = '1';
        }, delay);
    });
    
    shapes.forEach((shape, index) => {
        const delay = index * 1200 + Math.random() * 2000;
        setTimeout(() => {
            shape.style.opacity = '0.1';
        }, delay);
    });
    
    sideShapes.forEach((shape, index) => {
        const delay = index * 1000 + Math.random() * 1500;
        setTimeout(() => {
            shape.style.opacity = '0.08';
        }, delay);
    });
}

// Enhanced Mouse Parallax Effect
function setupMouseParallax() {
    const icons = document.querySelectorAll('.floating-icon');
    const shapes = document.querySelectorAll('.floating-shape');
    const sideShapes = document.querySelectorAll('.side-shape');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        icons.forEach((icon, index) => {
            const speed = (index % 4 + 1) * 0.8;
            const x = mouseX * speed * 10;
            const y = mouseY * speed * 10;
            
            // Apply transform while preserving existing animations
            const currentTransform = icon.style.transform || '';
            const baseTransform = currentTransform.replace(/translate\([^)]*\)/g, '');
            icon.style.transform = `translate(${x}px, ${y}px) ${baseTransform}`;
        });
        
        shapes.forEach((shape, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = mouseX * speed * 15;
            const y = mouseY * speed * 15;
            
            const currentTransform = shape.style.transform || '';
            const baseTransform = currentTransform.replace(/translate\([^)]*\)/g, '');
            shape.style.transform = `translate(${x}px, ${y}px) ${baseTransform}`;
        });
        
        sideShapes.forEach((shape, index) => {
            const speed = (index % 2 + 1) * 0.3;
            const x = mouseX * speed * 8;
            const y = mouseY * speed * 8;
            
            const currentTransform = shape.style.transform || '';
            const baseTransform = currentTransform.replace(/translate\([^)]*\)/g, '');
            shape.style.transform = `translate(${x}px, ${y}px) ${baseTransform}`;
        });
    });
}

// Intersection Observer for Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for service navigation items
                if (entry.target.closest('.services-nav')) {
                    const serviceItems = document.querySelectorAll('.service-nav-item');
                    serviceItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 300);
                    });
                }
                
                // Animate side graphics on scroll
                if (entry.target.classList.contains('portfolio')) {
                    animateSideGraphicsOnScroll();
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animate side graphics on scroll
function animateSideGraphicsOnScroll() {
    const sideShapes = document.querySelectorAll('.side-shape');
    sideShapes.forEach((shape, index) => {
        setTimeout(() => {
            shape.style.animation = `slideUpDown ${20 + index * 5}s ease-in-out infinite`;
        }, index * 200);
    });
}

// Enhanced Download Button Interaction
function setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('mouseenter', () => {
        downloadBtn.style.animation = 'downloadPulse 1.5s ease-in-out infinite';
    });
    
    downloadBtn.addEventListener('mouseleave', () => {
        downloadBtn.style.animation = 'none';
    });
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = downloadBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 120px;
            height: 120px;
            background: rgba(100, 255, 218, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.8s ease-out;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 10;
        `;
        
        downloadBtn.appendChild(ripple);
        
        // Add click animation
        downloadBtn.style.transform = 'translateY(-4px) scale(0.95)';
        
        setTimeout(() => {
            downloadBtn.style.transform = 'translateY(-4px) scale(1)';
            ripple.remove();
        }, 200);
        
        // Simulate download (replace with actual download logic)
        setTimeout(() => {
            alert('Resume download would start here!');
        }, 400);
    });
}

// Service Navigation Item Interactions
function setupServiceNavInteractions() {
    const serviceItems = document.querySelectorAll('.service-nav-item');
    
    serviceItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Add glow effect to icon
            const icon = item.querySelector('.service-nav-icon');
            icon.style.animation = 'icon-pulse 1.5s ease-in-out infinite';
            
            // Animate text
            const text = item.querySelector('span');
            text.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.service-nav-icon');
            icon.style.animation = 'none';
            
            const text = item.querySelector('span');
            text.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('click', () => {
            const serviceName = item.querySelector('span').textContent;
            // Add click feedback
            item.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'translateY(-8px) scale(1)';
            }, 150);
            
            console.log(`Clicked on ${serviceName}`);
            // You can add navigation logic here
        });
    });
}

function setupPortfolioInteractions() {
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  portfolioCards.forEach(card => {
      const viewBtn = card.querySelector('.view-btn');
      
      if (viewBtn) {
          viewBtn.addEventListener('click', (e) => {
              e.preventDefault();
              const certificateUrl = viewBtn.getAttribute('data-certificate');
              
              if (certificateUrl) {
                  // Open the certificate in a new tab
                  window.open(certificateUrl, '_blank');
                  
                  // Optional: Add a quick scale animation for feedback
                  viewBtn.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                      viewBtn.style.transform = 'scale(1)';  // Reset to normal
                  }, 150);
              } else {
                  const projectName = card.querySelector('h3').textContent;
                  
                  // Add click animation as in your original code
                  viewBtn.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                      viewBtn.style.transform = 'scale(1.05)';
                  }, 100);
                  
                  setTimeout(() => {
                      alert(`Viewing ${projectName} - This would open the project details!`);
                  }, 200);
              }
          });
      }
  });
}


// Add this after your existing setupPortfolioInteractions() function
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();  // Prevent any default button behavior
            const resumeUrl = downloadBtn.getAttribute('data-resume');  // Get the path from data attribute
            
            if (resumeUrl) {
                // Create a temporary anchor element to trigger the download
                const link = document.createElement('a');
                link.href = resumeUrl;
                link.download = 'Ajay_S_Resume-RDE.pdf';  // Suggested filename for download
                link.style.display = 'none';  // Hide the element
                document.body.appendChild(link);
                link.click();  // Simulate a click to download
                document.body.removeChild(link);  // Clean up
                
                // Optional: Add visual feedback (e.g., button animation)
                downloadBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    downloadBtn.style.transform = 'scale(1)';
                }, 200);
            } else {
                alert('Resume file not found. Please check the link.');
            }
        });
    }
});

// Contact Card Interactions
function setupContactInteractions() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.contact-icon');
            icon.style.animation = 'icon-glow 2s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.contact-icon');
            icon.style.animation = 'none';
        });
        
        card.addEventListener('click', (e) => {
            // Add click feedback
            card.style.transform = 'translateY(-6px) scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-6px) scale(1)';
            }, 150);
        });
    });
}

// Testimonials functionality
function renderTestimonials() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (!testimonialsSlider) return;
    
    testimonialsSlider.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        
        testimonialCard.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-avatar">${testimonial.avatar}</div>
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.company}</p>
                </div>
            </div>
            <div class="testimonial-rating">
                ${stars.split('').map(star => `<span class="star">${star}</span>`).join('')}
            </div>
            <div class="testimonial-message">"${testimonial.message}"</div>
        `;
        
        testimonialsSlider.appendChild(testimonialCard);
    });
    
    updateSlider();
}

// Setup testimonial form
function setupTestimonialForm() {
    const form = document.getElementById('testimonialForm');
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;
    
    // Star rating functionality
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStarDisplay();
        });
        
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
        });
    });
    
    document.getElementById('ratingStars').addEventListener('mouseleave', () => {
        updateStarDisplay();
    });
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }
    
    function updateStarDisplay() {
        highlightStars(selectedRating);
    }
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }
        
        const formData = new FormData(form);
        const testimonialData = {
            name: formData.get('name'),
            company: formData.get('company') || 'Anonymous',
            rating: selectedRating,
            message: formData.get('message'),
            avatar: formData.get('name').split(' ').map(n => n[0]).join('').toUpperCase()
        };
        
        // Add to testimonials array
        testimonials.unshift(testimonialData);
        
        // Save to localStorage
        saveTestimonials();
        
        // Re-render testimonials
        renderTestimonials();
        
        // Send email notification
        try {
            await emailjs.send('service_ajay', 'template_8jr1k7k', {
                from_name: testimonialData.name,
                from_company: testimonialData.company,
                rating: testimonialData.rating,
                message: testimonialData.message,
                to_email: 'your-email@example.com'
            });
        } catch (error) {
            console.error('Error sending testimonial notification:', error);
        }
        
        // Reset form
        form.reset();
        selectedRating = 0;
        updateStarDisplay();
        
        // Show success message
        alert('Thank you for your testimonial! It has been added to the page.');
    });
}

// Setup slider controls
function setupSliderControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
}

// Contact Form Functionality
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.3"/>
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/>
            </svg>
            Sending...
        `;
        
        try {
            // Send email using EmailJS
            await emailjs.send('service_ajay', 'template_8jr1k7k', {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                to_email: 'your-email@example.com'
            });
            
            // Show success message
            form.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                formSuccess.classList.remove('show');
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none">
                        <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/>
                        <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Send Message
                `;
            }, 3000);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again or contact me directly.');
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none">
                    <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2"/>
                </svg>
                Send Message
            `;
        }
    });
}

// Typing Animation for Hero Subtitle
function setupTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let index = 0;
    
    function typeWriter() {
        if (index < originalText.length) {
            subtitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Start typing animation after hero title loads
    setTimeout(typeWriter, 1500);
}

// Add CSS for additional animations
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .service-nav-item {
            cursor: pointer;
        }
        
        .service-nav-item span {
            transition: transform 0.3s ease;
        }
        
        .contact-card:hover .contact-info p {
            color: #64ffda;
            transition: color 0.3s ease;
        }
        
        .portfolio-overlay {
            backdrop-filter: blur(5px);
        }
        
        .floating-shape {
            transition: opacity 2s ease;
        }
        
        .side-shape {
            transition: opacity 2s ease;
        }
    `;
    document.head.appendChild(style);
}

// Performance optimized scroll handler
function throttle(func, wait) {
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

// Smooth Scroll for Internal Links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle window resize for slider
function handleResize() {
    const newSlidesToShow = window.innerWidth > 768 ? 3 : 1;
    if (newSlidesToShow !== slidesToShow) {
        location.reload(); // Simple solution for responsive slider
    }
}

// Initialize all functionality
function init() {
    // Add additional styles
    addAdditionalStyles();
    
    // Setup all animations and interactions
    animateFloatingIcons();
    setupMouseParallax();
    setupScrollAnimations();
    setupDownloadButton();
    setupServiceNavInteractions();
    setupPortfolioInteractions();
    setupContactInteractions();
    setupContactForm();
    setupTestimonialForm();
    setupSliderControls();
    setupTypingAnimation();
    setupSmoothScroll();
    
    // Render initial testimonials
    renderTestimonials();
    
    // Performance optimizations
    window.addEventListener('scroll', throttle(() => {
        // Any scroll-based animations can go here
    }, 16));
    
    // Handle window resize
    window.addEventListener('resize', throttle(handleResize, 250));
    
    console.log('🚀 Complete Interactive Hire Me page loaded successfully!');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cleanup function for better performance
window.addEventListener('beforeunload', () => {
    document.removeEventListener('mousemove', setupMouseParallax);
});