$(document).ready(function() {
  
  // Smooth scrolling for navigation links
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 1000);
    }
  });

  // Navbar background change on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  // Mobile menu close on link click
  $('.navbar-nav .nav-link').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Play button click handler
  $('.play-button').on('click', function() {
    // Add your video play functionality here
    console.log('Play button clicked');
    $(this).addClass('playing');
    
    // Example: You could open a modal with video or redirect to video
    // For now, just add a visual feedback
    setTimeout(() => {
      $(this).removeClass('playing');
    }, 1000);
  });

  // FAQ accordion functionality
  $('.faq-question').on('click', function() {
    const $this = $(this);
    const $collapse = $($this.data('bs-target'));
    const $icon = $this.find('.faq-icon');
    
    // Toggle icon rotation
    if ($collapse.hasClass('show')) {
      $icon.text('+');
    } else {
      $icon.text('×');
    }
  });

  // Reset FAQ icons when collapse is hidden
  $('.faq-item .collapse').on('hidden.bs.collapse', function() {
    $(this).siblings('.faq-question').find('.faq-icon').text('+');
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add animation classes and observe elements
  $('.metric-card').addClass('fade-in');
  $('.service-card').addClass('fade-in');
  $('.project-card').addClass('fade-in');
  $('.about-content').addClass('slide-in-right');
  $('.testimonial-content').addClass('slide-in-left');

  // Observe all animation elements
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });

  // Counter animation for metrics
  function animateCounter($element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format the number based on the target
      let displayValue;
      if (target >= 1000000) {
        displayValue = (current / 1000000).toFixed(1) + 'M+';
      } else if (target >= 1000) {
        displayValue = (current / 1000).toFixed(1) + 'K+';
      } else if (target < 10) {
        displayValue = Math.floor(current) + '+';
      } else {
        displayValue = Math.floor(current) + '%';
      }
      
      $element.text(displayValue);
    }, 20);
  }

  // Trigger counter animation when metrics section is visible
  const metricsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $('.metric-number').each(function() {
          const $this = $(this);
          const text = $this.text();
          let target;
          
          if (text.includes('M+')) {
            target = parseFloat(text) * 1000000;
          } else if (text.includes('K+')) {
            target = parseFloat(text) * 1000;
          } else if (text.includes('%')) {
            target = parseInt(text);
          } else {
            target = parseInt(text);
          }
          
          animateCounter($this, target);
        });
        
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    metricsObserver.observe(metricsSection);
  }

  // Testimonial slider functionality (basic implementation)
  let currentTestimonial = 0;
  const testimonials = [
    {
      text: "The divenzo team has been exceptional throughout our project. Their dedication and attention to detail resulted in an outstanding final product. We're absolutely thrilled with the outcome and couldn't have asked for better. I would highly recommend them to anyone seeking top-notch services.",
      author: "Sample Name",
      title: "Co-Founder, @ Company Name"
    }
    // Add more testimonials here if needed
  ];

  function updateTestimonial(index) {
    const testimonial = testimonials[index];
    $('.testimonial-text').text(testimonial.text);
    $('.author-name').text(testimonial.author);
    $('.author-title').text(testimonial.title);
    
    // Update indicators
    $('.indicator').removeClass('active');
    $('.indicator').eq(index).addClass('active');
  }

  // Auto-rotate testimonials (if you have multiple)
  if (testimonials.length > 1) {
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial(currentTestimonial);
    }, 5000);
  }

  // Brand logo hover effects
  $('.brand-logo').hover(
    function() {
      $(this).css('transform', 'scale(1.1)');
    },
    function() {
      $(this).css('transform', 'scale(1)');
    }
  );

  // Service card hover effects
  $('.service-card').hover(
    function() {
      $(this).find('.service-image').css('transform', 'scale(1.05)');
    },
    function() {
      $(this).find('.service-image').css('transform', 'scale(1)');
    }
  );

  // Project card click handlers
  $('.project-card').on('click', function() {
    const projectTitle = $(this).find('.project-title').text();
    console.log('Project clicked:', projectTitle);
    // Add your project detail functionality here
  });

  // Form validation for contact (if you add a contact form)
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    let isValid = true;
    $(this).find('input[required], textarea[required]').each(function() {
      if (!$(this).val().trim()) {
        isValid = false;
        $(this).addClass('is-invalid');
      } else {
        $(this).removeClass('is-invalid');
      }
    });
    
    if (isValid) {
      // Submit form or show success message
      console.log('Form submitted successfully');
      // You can add AJAX submission here
    }
  });

  // Lazy loading for images
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

  // Scroll to top functionality
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  $('.scroll-to-top').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });

  // Preloader (if you want to add one)
  $(window).on('load', function() {
    $('.preloader').fadeOut('slow');
  });

  // Keyboard navigation for accessibility
  $(document).keydown(function(e) {
    // ESC key closes mobile menu
    if (e.keyCode === 27) {
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Touch/swipe support for mobile testimonials
  let touchStartX = 0;
  let touchEndX = 0;

  $('.testimonial-content').on('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  $('.testimonial-content').on('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left - next testimonial
      if (testimonials.length > 1) {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
      }
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right - previous testimonial
      if (testimonials.length > 1) {
        currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
        updateTestimonial(currentTestimonial);
      }
    }
  }

  // Performance optimization: Debounce scroll events
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

  // Apply debounce to scroll handler
  $(window).scroll(debounce(function() {
    // Your scroll handling code here
  }, 10));

  console.log('Divenzo website initialized successfully!');
});

// Additional utility functions
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Export functions for potential external use
window.DivenzoUtils = {
  isElementInViewport,
  debounce: function(func, wait) {
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
};
