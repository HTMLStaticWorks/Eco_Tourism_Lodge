/**
 * Sylvan Retreat - Main Interactions
 * Handles scroll reveals and smooth effects
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to elements with [data-scroll]
    document.querySelectorAll('[data-scroll]').forEach(el => {
        scrollObserver.observe(el);
    });

    // Add data-scroll to various sections for reveal effect
    const revealSelectors = [
        '.exp-card', 
        '.stay-card', 
        '.eco-item', 
        '.testimonial-card',
        '.section-padding h2',
        '.section-padding p'
    ];

    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.setAttribute('data-scroll', '');
        });
    });

    // Mobile Navigation Toggle (placeholder logic)
    const navLinks = document.querySelector('.nav-links');
    // Mobile menu toggle would go here if a burger was added

    console.log("Sylvan Retreat - Immersive Experience Initialized.");
});
