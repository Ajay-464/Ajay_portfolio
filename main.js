//javascript for navigation bar effects on scroll
window.addEventListener("scroll", function(){
  const header = document.querySelector("header");
  if (header) {
    header.classList.toggle('sticky', window.scrollY > 0);
  }
});

//javascript for responsive navigation sidebar menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a")

if (menuBtn && navigation) {
  menuBtn.addEventListener("click",  () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
  });
}

navigationItems.forEach((navigationItem) => {
  navigationItem.addEventListener("click", () => {
    if (menuBtn && navigation) {
      menuBtn.classList.remove("active");
      navigation.classList.remove("active");
    }
  });
});

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

const scrollBtn = document.querySelector(".scrollToTop-btn");

if (scrollBtn) {
  window.addEventListener("scroll", function(){
    scrollBtn.classList.toggle("active", window.scrollY > 500);
  });

  //javascript for scroll back to top on click scroll-to-top button
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

//javascript for reveal website elements on scroll
window.addEventListener("scroll", reveal);

function reveal(){
  var reveals = document.querySelectorAll(".reveal");

  for(var i = 0; i < reveals.length; i++){
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if(revealTop < windowHeight - revealPoint){
      reveals[i].classList.add("active");
    }
  }
}

// Smooth scroll for internal anchor links (but NOT for form submissions)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    // Only prevent default for anchor links, not form submissions
    if (this.getAttribute("href") !== "#") {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

// EmailJS Integration with Enhanced Animations
(function() {
  // Initialize EmailJS with your public key
  emailjs.init('5EbkoUwb4EYZ0iLOF');
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Call portfolio setup
  setupPortfolioInteractions();
  
  // Get form elements
  const form = document.getElementById('form');
  const resultElement = document.getElementById('result');

  if (!form || !resultElement) {
    console.error('Form or result element not found');
    return;
  }

  // Remove any existing event listeners and add a single one
  form.removeEventListener('submit', handleFormSubmit);
  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(e) {
    // Prevent ALL default behaviors
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
    console.log('Form submission started'); // Debug log
    
    // Get form elements
    const sendBtn = form.querySelector('.send-btn');
    const btnText = sendBtn.querySelector('.btn-text');
    const btnIcon = sendBtn.querySelector('.btn-icon');
    
    if (!sendBtn || !btnText || !btnIcon) {
      console.error('Button elements not found');
      return false;
    }
    
    // Get form data
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    
    if (!nameField || !emailField || !phoneField || !messageField) {
      console.error('Form fields not found');
      return false;
    }
    
    const formData = {
      from_name: nameField.value.trim(),
      from_email: emailField.value.trim(),
      phone: phoneField.value.trim(),
      message: messageField.value.trim()
    };
    
    // Basic validation
    if (!formData.from_name || !formData.from_email || !formData.phone || !formData.message) {
      showErrorMessage('Please fill in all fields.');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      showErrorMessage('Please enter a valid email address.');
      return false;
    }
    
    console.log('Form data:', formData); // Debug log
    
    // Disable button and show loading state
    sendBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.className = 'loading';
    
    // Clear previous results
    resultElement.className = 'result-message';
    resultElement.textContent = '';
    
    // Send email using EmailJS
    emailjs.send('service_ajay', 'template_8jr1k7k', formData)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showSuccessMessage();
        resetForm();
      })
      .catch(function(error) {
        console.log('FAILED...', error);
        showErrorMessage('Failed to send message. Please try again later.');
      })
      .finally(function() {
        // Reset button state
        sendBtn.disabled = false;
        btnText.textContent = 'Send Message';
        btnIcon.className = 'fas fa-paper-plane btn-icon';
      });
    
    // Return false to ensure no form submission
    return false;
  }

  function showSuccessMessage() {
    resultElement.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
    resultElement.className = 'result-message success show success-animation';
    
    // Add bounce effect to success message
    setTimeout(() => {
      resultElement.style.transform = 'scale(1.05)';
      setTimeout(() => {
        resultElement.style.transform = 'scale(1)';
      }, 200);
    }, 100);
  }

  function showErrorMessage(message = '❌ Failed to send message. Please try again later.') {
    resultElement.textContent = message;
    resultElement.className = 'result-message error show';
    
    // Add shake effect to error message
    resultElement.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      resultElement.style.animation = '';
    }, 500);
  }

  function resetForm() {
    // Reset form after 4 seconds
    setTimeout(() => {
      form.reset();
      resultElement.className = 'result-message';
      resultElement.textContent = '';
      resultElement.style.transform = '';
    }, 4000);
  }

  // Add input focus animations
  const inputs = document.querySelectorAll('#form input, #form textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.borderColor = '#3a6cf4';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'translateY(0)';
      if (!this.value.trim()) {
        this.style.borderColor = '#e0e0e0';
      }
    });

    input.addEventListener('input', function() {
      if (this.value.trim()) {
        this.style.borderColor = '#3a6cf4';
      } else {
        this.style.borderColor = '#e0e0e0';
      }
    });
  });

  // Add smooth scrolling animation on page load
  const cards = document.querySelectorAll('.card');
  const contactForm = document.querySelector('.contact-form');
  
  // Animate cards
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
  
  // Animate form
  if (contactForm) {
    contactForm.style.opacity = '0';
    contactForm.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      contactForm.style.transition = 'all 0.8s ease';
      contactForm.style.opacity = '1';
      contactForm.style.transform = 'translateY(0)';
    }, 600);
  }
});

// Add shake animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .success-animation {
    animation: slideInUp 0.6s ease-out;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);





const contactSection = document.querySelector('.contact');
const cards = document.querySelectorAll('.contact .card');
let hasAnimated = false;

function isInView(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight &&
    rect.bottom >= 0
  );
}

window.addEventListener('scroll', () => {
  if (!hasAnimated && isInView(contactSection)) {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, index * 200); // Stagger animation
    });
    hasAnimated = true;
  }
});






/*-------------------------------------------BOLT NEW ADV CODE--------------------------------------------------------------*/





// //javascript for navigation bar effects on scroll
// window.addEventListener("scroll", function(){
//   const header = document.querySelector("header");
//   header.classList.toggle('sticky', window.scrollY > 0);
// });

// //javascript for responsive navigation sidebar menu
// const menuBtn = document.querySelector(".menu-btn");
// const navigation = document.querySelector(".navigation");
// const navigationItems = document.querySelectorAll(".navigation a")

// menuBtn.addEventListener("click",  () => {
//   menuBtn.classList.toggle("active");
//   navigation.classList.toggle("active");
// });

// navigationItems.forEach((navigationItem) => {
//   navigationItem.addEventListener("click", () => {
//     menuBtn.classList.remove("active");
//     navigation.classList.remove("active");
//   });
// });

// /*---------------------------------------*/

// const scrollBtn = document.querySelector(".scrollToTop-btn");

// window.addEventListener("scroll", function(){
//   scrollBtn.classList.toggle("active", window.scrollY > 500);
// });

// //javascript for scroll back to top on click scroll-to-top button
// scrollBtn.addEventListener("click", () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth"
//   });
// });

// //javascript for reveal website elements on scroll
// window.addEventListener("scroll", reveal);

// function reveal(){
//   var reveals = document.querySelectorAll(".reveal");

//   for(var i = 0; i < reveals.length; i++){
//     var windowHeight = window.innerHeight;
//     var revealTop = reveals[i].getBoundingClientRect().top;
//     var revealPoint = 50;

//     if(revealTop < windowHeight - revealPoint){
//       reveals[i].classList.add("active");
//     }
//   }
// }

// // Smooth scroll for internal anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();
//     const target = document.querySelector(this.getAttribute("href"));
//     if (target) {
//       target.scrollIntoView({
//         behavior: "smooth"
//       });
//     }
//   });
// });

// // Enhanced floating animation for icons
// document.addEventListener('DOMContentLoaded', function() {
//   const floatingIcons = document.querySelectorAll('.floating-icon');
  
//   floatingIcons.forEach((icon, index) => {
//     // Add random movement variation
//     const randomDelay = Math.random() * 5;
//     const randomDuration = 15 + Math.random() * 10;
    
//     icon.style.animationDelay = `-${randomDelay}s`;
//     icon.style.animationDuration = `${randomDuration}s`;
    
//     // Add subtle rotation on hover
//     icon.addEventListener('mouseenter', function() {
//       this.style.transform += ' scale(1.2) rotate(10deg)';
//     });
    
//     icon.addEventListener('mouseleave', function() {
//       this.style.transform = this.style.transform.replace(' scale(1.2) rotate(10deg)', '');
//     });
//   });
  
//   // Enhanced particle system
//   const particles = document.querySelectorAll('.particle');
//   particles.forEach((particle, index) => {
//     const randomSize = 3 + Math.random() * 5;
//     const randomDelay = Math.random() * 20;
//     const randomDuration = 15 + Math.random() * 15;
    
//     particle.style.width = `${randomSize}px`;
//     particle.style.height = `${randomSize}px`;
//     particle.style.animationDelay = `-${randomDelay}s`;
//     particle.style.animationDuration = `${randomDuration}s`;
//   });
  
//   // Add glow effect to cards on scroll
//   const cards = document.querySelectorAll('.card, .card__article');
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.style.boxShadow = '0 0 30px rgba(58, 108, 244, 0.4)';
//         setTimeout(() => {
//           entry.target.style.boxShadow = '';
//         }, 1000);
//       }
//     });
//   }, { threshold: 0.5 });
  
//   cards.forEach(card => observer.observe(card));
// });

// // Dynamic background color shifts
// function createColorShift() {
//   const body = document.body;
//   let hue = 220; // Start with blue
  
//   setInterval(() => {
//     hue = (hue + 0.5) % 360;
//     const color1 = `hsl(${hue}, 70%, 5%)`;
//     const color2 = `hsl(${(hue + 60) % 360}, 50%, 8%)`;
    
//     body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
//   }, 100);
// }

// // Uncomment the line below for dynamic background (may impact performance)
// // createColorShift();

// // Enhanced skill bar animations
// function animateSkillBars() {
//   const skillBars = document.querySelectorAll('.skills .bar .line:before');
//   const skillsSection = document.querySelector('.skills');
  
//   const skillObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         skillBars.forEach(bar => {
//           bar.style.animationPlayState = 'running';
//         });
//       }
//     });
//   }, { threshold: 0.3 });
  
//   if (skillsSection) {
//     skillObserver.observe(skillsSection);
//   }
// }

// animateSkillBars();

// // Add typing effect to animated text
// function addTypingEffect() {
//   const animatedTexts = document.querySelectorAll('.animated-text h3');
  
//   animatedTexts.forEach((text, index) => {
//     const originalText = text.textContent;
//     text.textContent = '';
    
//     setTimeout(() => {
//       let i = 0;
//       const typeInterval = setInterval(() => {
//         text.textContent += originalText[i];
//         i++;
//         if (i >= originalText.length) {
//           clearInterval(typeInterval);
//         }
//       }, 100);
//     }, index * 3000);
//   });
// }

// // Uncomment for typing effect (optional)
// // addTypingEffect();