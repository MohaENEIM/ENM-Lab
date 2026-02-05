// ================================
// Dark / Light mode
// ================================
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    }
}

// Charger le thème sauvegardé ou système
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Header chargé (Web Component)
document.addEventListener('header-loaded', () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (themeToggle) {
        const current = document.documentElement.getAttribute('data-theme');
        themeToggle.querySelector('.theme-icon').textContent =
            current === 'dark' ? '🌙' : '☀️';

        themeToggle.addEventListener('click', toggleTheme);
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Fermer le menu mobile au clic sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});

// ================================
// Animation apparition sections
// ================================
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1 }
);

// Appliquer seulement aux sections voulues
document.querySelectorAll('.animate').forEach(section => {
    section.classList.add('fade-section');
    observer.observe(section);
});
