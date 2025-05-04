document.addEventListener("DOMContentLoaded", function () {
    // Navigation menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Toggle hamburger animation class
            this.classList.toggle('active');
            
            // Accessibility
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            this.setAttribute('aria-label', expanded ? 'Menüyü Aç' : 'Menüyü Kapat');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            menuToggle.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
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

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, let's just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    contactForm.removeChild(successMessage);
                }, 300);
            }, 5000);
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to elements that should animate
    document.querySelectorAll('.project-card, .skill-category, .about-image, .hero-image').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Call animation on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Simple animation for skill bars
    const skillSection = document.querySelector('.skills');
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Initial state - skill bars at 0 width
    skillLevels.forEach(level => {
        level.style.width = '0';
    });
    
    // Function to animate skill bars when in viewport
    function animateSkills() {
        if (isElementInViewport(skillSection)) {
            skillLevels.forEach(level => {
                const finalWidth = level.getAttribute('style').split(':')[1].trim();
                level.style.width = '0';
                setTimeout(() => {
                    level.style.transition = 'width 1.2s ease-in-out';
                    level.style.width = finalWidth;
                }, 200);
            });
            // Remove scroll listener once animated
            window.removeEventListener('scroll', animateSkills);
        }
    }
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Add scroll listener for skill animations
    window.addEventListener('scroll', animateSkills);
    // Also check on page load
    animateSkills();
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
});
  