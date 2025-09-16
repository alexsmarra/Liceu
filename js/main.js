import { Router } from "./router.js";

document.addEventListener('DOMContentLoaded', function () {
    console.log('Site da igreja carregado com sucesso!');

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.style.display = 'flex';
            menuToggle.setAttribute('aria-expanded', 'true');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            menuToggle.setAttribute('aria-expanded', 'false');
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.style.display = 'none';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) {
                    window.location.hash = page;
                } else {
                    const href = link.getAttribute('href');
                    if (href) window.location.href = href;
                }
                // ❌ remove o fechamento aqui
            });
        });

    }

    // inicializar o Router
    new Router();
});
