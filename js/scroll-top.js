/**
 * Sylvan Retreat - Back to Top Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const scrollTop = document.getElementById('scroll-top');

    if (scrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTop.classList.add('active');
            } else {
                scrollTop.classList.remove('active');
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
