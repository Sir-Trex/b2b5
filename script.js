// Nexus Init B2B Marketing Agency - JavaScript with jQuery
$(document).ready(function() {
    
    // Initialize all components
    initScrollEffects();
    initNavigation();
    initAnimations();
    initChart();
    initCounters();
    initContactForm();
    initScrollProgress();
    
    // Smooth scrolling for navigation links
    function initNavigation() {
        // Handle navigation clicks
        $('.nav-link[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800, 'easeInOutQuad');
            }
        });
        
        // Navbar scroll effect
        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop > 100) {
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }
        });
        
        // Active navigation highlighting
        $(window).on('scroll', function() {
            const scrollPos = $(window).scrollTop() + 100;
            
            $('.nav-link[href^="#"]').each(function() {
                const currentLink = $(this);
                const refElement = $(currentLink.attr('href'));
                
                if (refElement.length && 
                    refElement.position().top <= scrollPos && 
                    refElement.position().top + refElement.height() > scrollPos) {
                    $('.nav-link').removeClass('active');
                    currentLink.addClass('active');
                }
            });
        });
    }
    
    // Scroll animations and effects
    function initScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        $('.service-card, .team-card, .feature-item, .contact-info').each(function() {
            observer.observe(this);
        });
    }
    
    // Initialize animations
    function initAnimations() {
        // Add loading class to elements
        $('.service-card, .team-card, .stat-card').addClass('loading');
        
        // Animate elements on scroll
        $(window).on('scroll', function() {
            $('.loading').each(function() {
                const elementTop = $(this).offset().top;
                const elementBottom = elementTop + $(this).outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('loaded');
                }
            });
        });
        
        // Hover effects for service cards
        $('.service-card').hover(
            function() {
                $(this).find('.service-icon i').addClass('fa-bounce');
            },
            function() {
                $(this).find('.service-icon i').removeClass('fa-bounce');
            }
        );
        
        // Team card hover effects
        $('.team-card').hover(
            function() {
                $(this).find('.social-links a').each(function(index) {
                    setTimeout(() => {
                        $(this).addClass('animate__animated animate__pulse');
                    }, index * 100);
                });
            },
            function() {
                $(this).find('.social-links a').removeClass('animate__animated animate__pulse');
            }
        );
    }
    
    // Initialize hero chart
    function initChart() {
        const ctx = document.getElementById('heroChart');
        if (!ctx) return;
        
        // Sample data for B2B marketing metrics
        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1+1', 'Q2+1'],
            datasets: [{
                label: 'Lead Generation',
                data: [120, 190, 300, 500, 720, 900],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Conversion Rate %',
                data: [15, 22, 35, 45, 52, 65],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        };
        
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'white',
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Data-Driven Results Over Time',
                        color: 'white',
                        font: {
                            family: 'Inter',
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        };
        
        new Chart(ctx, config);
    }
    
    // Animated counters
    function initCounters() {
        function animateCounter(element, target, duration = 2000) {
            const start = parseInt(element.textContent) || 0;
            const increment = (target - start) / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
        
        const counters = $('.stat-card h3[data-count]');
        let countersStarted = false;
        
        $(window).on('scroll', function() {
            if (countersStarted) return;
            
            const aboutSection = $('#about');
            if (aboutSection.length) {
                const sectionTop = aboutSection.offset().top;
                const windowHeight = $(window).height();
                const scrollTop = $(window).scrollTop();
                
                if (scrollTop + windowHeight > sectionTop + 200) {
                    countersStarted = true;
                    
                    counters.each(function() {
                        const target = parseInt($(this).data('count'));
                        animateCounter(this, target);
                    });
                }
            }
        });
    }
    
    // Contact form handling
    function initContactForm() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                company: $('#company').val(),
                service: $('#service').val(),
                message: $('#message').val()
            };
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Show loading state
            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.text();
            submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...').prop('disabled', true);
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.text(originalText).prop('disabled', false);
                
                // Track form submission (analytics)
                trackEvent('Form', 'Submit', 'Contact Form');
                
            }, 2000);
        });
        
        // Form validation
        function validateForm(data) {
            let isValid = true;
            
            // Reset previous errors
            $('.form-control, .form-select').removeClass('is-invalid');
            $('.invalid-feedback').remove();
            
            // Required field validation
            Object.keys(data).forEach(key => {
                if (key !== 'message' && !data[key].trim()) {
                    const field = $(`#${key}`);
                    field.addClass('is-invalid');
                    field.after('<div class="invalid-feedback">This field is required.</div>');
                    isValid = false;
                }
            });
            
            // Email validation
            if (data.email && !isValidEmail(data.email)) {
                $('#email').addClass('is-invalid');
                $('#email').after('<div class="invalid-feedback">Please enter a valid email address.</div>');
                isValid = false;
            }
            
            return isValid;
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // Scroll progress indicator
    function initScrollProgress() {
        // Create scroll progress bar
        $('body').prepend('<div class="scroll-indicator"><div class="scroll-progress"></div></div>');
        
        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop();
            const docHeight = $(document).height() - $(window).height();
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            $('.scroll-progress').css('width', scrollPercent + '%');
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const alertClass = type === 'success' ? 'alert-success' : 
                          type === 'error' ? 'alert-danger' : 'alert-info';
        
        const notification = $(`
            <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
                 style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.fadeOut(() => notification.remove());
        }, 5000);
    }
    
    // Analytics tracking (placeholder)
    function trackEvent(category, action, label) {
        // Replace with actual analytics tracking code
        console.log(`Analytics: ${category} - ${action} - ${label}`);
        
        // Example for Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         event_category: category,
        //         event_label: label
        //     });
        // }
    }
    
    // Utility functions
    
    // Custom easing function for jQuery animations
    $.easing.easeInOutQuad = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    };
    
    // Debounce function for performance
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Throttle function for scroll events
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
        }
    }
    
    // Apply throttling to scroll events for better performance
    $(window).on('scroll', throttle(function() {
        // Scroll-based animations and effects are handled here
    }, 100));
    
    // Service card click tracking
    $('.service-card').on('click', function() {
        const serviceName = $(this).find('h4').text();
        trackEvent('Service', 'Click', serviceName);
    });
    
    // Team member click tracking
    $('.team-card').on('click', function() {
        const memberName = $(this).find('h5').text();
        trackEvent('Team', 'Click', memberName);
    });
    
    // Social media link tracking
    $('.social-links a').on('click', function(e) {
        const platform = $(this).find('i').attr('class').includes('linkedin') ? 'LinkedIn' :
                        $(this).find('i').attr('class').includes('twitter') ? 'Twitter' :
                        $(this).find('i').attr('class').includes('facebook') ? 'Facebook' : 'Instagram';
        
        trackEvent('Social', 'Click', platform);
    });
    
    // CTA button tracking
    $('.btn-primary, .btn-outline-light').on('click', function() {
        const buttonText = $(this).text().trim();
        trackEvent('CTA', 'Click', buttonText);
    });
    
    // Lazy loading for images (if needed)
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Performance monitoring
    $(window).on('load', function() {
        // Track page load time
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Track to analytics
        trackEvent('Performance', 'Page Load Time', Math.round(loadTime));
    });
    
    // Handle window resize
    $(window).on('resize', debounce(function() {
        // Reinitialize chart on resize if needed
        const chart = Chart.getChart('heroChart');
        if (chart) {
            chart.resize();
        }
    }, 250));
    
    // Error handling for production
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // Track errors to analytics in production
        // trackEvent('Error', 'JavaScript', e.error.message);
    });
    
    // Add some interactive Easter eggs
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    $(document).on('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showNotification('🎉 Konami Code activated! You found our Easter egg!', 'success');
            $('body').addClass('rainbow-mode');
            setTimeout(() => $('body').removeClass('rainbow-mode'), 5000);
            konamiCode = [];
        }
    });
    
    console.log('Nexus Init website loaded successfully! 🚀');
    console.log('Try the Konami Code: ↑↑↓↓←→←→BA');
});

// Additional CSS for Easter egg (rainbow mode)
const rainbowCSS = `
    <style id="rainbow-styles">
        .rainbow-mode .navbar-brand,
        .rainbow-mode .text-primary,
        .rainbow-mode .btn-primary {
            background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            animation: rainbow-shift 2s ease-in-out infinite !important;
        }
        
        @keyframes rainbow-shift {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
        }
    </style>
`;

$(document).ready(function() {
    $('head').append(rainbowCSS);
});