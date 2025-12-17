 // custom hamburger

  const toggler = document.querySelector('.navbar-toggler');
  const barsIcon = toggler.querySelector('.fa-bars');
  const closeIcon = toggler.querySelector('.fa-xmark');

  toggler.addEventListener('click', () => {
    const isOpen = toggler.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      // Menu is open → show X
      barsIcon.classList.add('d-none');
      closeIcon.classList.remove('d-none');
    } else {
      // Menu is closed → show hamburger
      barsIcon.classList.remove('d-none');
      closeIcon.classList.add('d-none');
    }
  });









// PetPals About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('PetPals About Page loaded successfully!');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate stats counter
    function animateCounter(element, targetValue, duration = 2000) {
        let startValue = 0;
        const increment = targetValue / (duration / 16); // 60fps
        const counter = setInterval(() => {
            startValue += increment;
            if (startValue >= targetValue) {
                element.textContent = targetValue + (element.textContent.includes('+') ? '+' : '');
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(startValue) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate stats when they come into view
                if (entry.target.classList.contains('stats-box')) {
                    setTimeout(() => {
                        const statNumbers = document.querySelectorAll('.stat-number');
                        statNumbers.forEach(stat => {
                            const value = parseInt(stat.textContent);
                            if (!isNaN(value)) {
                                animateCounter(stat, value);
                            }
                        });
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    document.querySelectorAll('.milestone-card, .team-card, .stats-box').forEach(el => {
        observer.observe(el);
    });
    
    // Back to top button
    // const backToTopButton = document.createElement('button');
    // backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    // backToTopButton.className = 'btn btn-primary btn-floating';
    // backToTopButton.style.cssText = `
    //     position: fixed;
    //     bottom: 20px;
    //     right: 20px;
    //     width: 50px;
    //     height: 50px;
    //     border-radius: 50%;
    //     display: none;
    //     align-items: center;
    //     justify-content: center;
    //     z-index: 1000;
    // `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    // backToTopButton.addEventListener('click', () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // });
    
    // Team member hover effect enhancement
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Initialize tooltips (if Bootstrap is loaded)
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});