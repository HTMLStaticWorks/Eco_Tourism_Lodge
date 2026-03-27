/**
 * Sylvan Retreat - Mobile Navigation & Sidebar Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu/toggle dropdown when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const parentLi = link.parentElement;
                const dropdown = parentLi.querySelector('.dropdown-menu');
                
                // If it's a mobile view and has a dropdown, toggle it
                if (window.innerWidth <= 992 && dropdown) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle this dropdown
                    dropdown.classList.toggle('active');
                    
                    // Rotate chevron if it exists
                    const chevron = link.querySelector('.chevron');
                    if (chevron) {
                        chevron.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                        chevron.style.display = 'inline-block';
                        chevron.style.transition = '0.3s';
                    }
                    
                    return;
                }

                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


});
