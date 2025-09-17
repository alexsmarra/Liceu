import { initCarousel } from "./carousel.js";

async function loadPartials() {
  try {
    // Sempre busca os partials a partir da raiz do site
    const headerResponse = await fetch("/partials/header.html");
    const headerHtml = await headerResponse.text();
    document.getElementById("site-header").innerHTML = headerHtml;

    const footerResponse = await fetch("/partials/footer.html");
    const footerHtml = await footerResponse.text();
    document.getElementById("site-footer").innerHTML = footerHtml;

    initHeaderMenu();

    // Inicializa carrossel somente se houver na página
    if (document.querySelector('.carousel')) {
      initCarousel();
    }

  } catch (error) {
    console.error("Erro ao carregar partials:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadPartials);

function initHeaderMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');

  if (menuToggle && mobileMenu && closeMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.style.display = 'flex');
    closeMenu.addEventListener('click', () => mobileMenu.style.display = 'none');

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.style.display = 'none');
    });
  }
}
