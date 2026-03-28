document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const themeToggles = document.querySelectorAll('.theme-toggle, #theme-toggle');
    const rtlToggles = document.querySelectorAll('.rtl-toggle, #rtl-toggle');

    // Load persisted settings
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const currentDir = localStorage.getItem('dir') || 'ltr';

    html.setAttribute('data-theme', currentTheme);
    html.setAttribute('dir', currentDir);

    const updateThemeUI = (theme) => {
        themeToggles.forEach(btn => {
            btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        });
    };

    const updateDirUI = (dir) => {
        rtlToggles.forEach(btn => {
            btn.innerHTML = dir === 'ltr' ? 'RTL' : 'LTR';
        });
    };

    // Initial UI Sync
    updateThemeUI(currentTheme);
    updateDirUI(currentDir);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        });
    });

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const newDir = html.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateDirUI(newDir);
        });
    });
});
