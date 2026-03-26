document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const rtlToggle = document.getElementById('rtl-toggle');

    // Load persisted settings
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const currentDir = localStorage.getItem('dir') || 'ltr';

    html.setAttribute('data-theme', currentTheme);
    html.setAttribute('dir', currentDir);

    if (themeToggle) {
        themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    if (rtlToggle) {
        rtlToggle.innerHTML = currentDir === 'ltr' ? 'RTL' : 'LTR';
        rtlToggle.addEventListener('click', () => {
            const newDir = html.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            rtlToggle.innerHTML = newDir === 'ltr' ? 'RTL' : 'LTR';
        });
    }
});
