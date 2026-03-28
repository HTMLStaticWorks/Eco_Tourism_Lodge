/**
 * Sylvan Retreat - Mobile Navigation & Sidebar Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Highlight Active Navigation Link
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === '/') currentPath = 'index.html';
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('text-accent', 'active');
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            const dropdown = link.closest('.dropdown-menu');
            if (dropdown) {
                const parentLink = dropdown.previousElementSibling;
                if (parentLink && parentLink.tagName === 'A') {
                    parentLink.classList.add('active');
                }
            }
        }
    });

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
                if (window.innerWidth <= 1150 && dropdown) {
                    // If the dropdown is NOT already open, toggle it and prevent navigation
                    if (!dropdown.classList.contains('active')) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close other dropdowns first
                        navLinks.querySelectorAll('.dropdown-menu').forEach(d => {
                            if (d !== dropdown) d.classList.remove('active');
                        });

                        // Toggle this dropdown
                        dropdown.classList.add('active');
                        
                        // Rotate chevron if it exists
                        const chevron = link.querySelector('.chevron');
                        if (chevron) {
                            chevron.style.transform = 'rotate(180deg)';
                            chevron.style.display = 'inline-block';
                            chevron.style.transition = '0.3s';
                        }
                        return;
                    }
                    // If dropdown IS already open, allow regular navigation to link's href
                }

                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


});
