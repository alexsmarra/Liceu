import { initCarousel } from "./carousel.js";

async function loadPartials() {
  try {
    // 🔹 Ajuste dinâmico para o caminho da pasta partials
    const currentPath = window.location.pathname;
    const partialsBase = currentPath.includes("/pages/") ? "../" : "./";
    
    // Sempre busca os partials a partir da raiz do site
    const headerResponse = await fetch(partialsBase + "partials/header.html");
    const headerHtml = await headerResponse.text();
    document.getElementById("site-header").innerHTML = headerHtml;

    const footerResponse = await fetch(partialsBase + "partials/footer.html");
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

    // Verifica se a tela é mobile usando matchMedia
    const isMobile = window.matchMedia("(max-width: 820px)").matches;

    // Links do menu (desktop e mobile) com efeito fade
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');

        // ignora links com #
        if (!href || href.startsWith('#')) return;

        // Aplica o fade-out somente se for um dispositivo mobile
        if (isMobile) {
          e.preventDefault(); // previne o reload imediato
          document.body.classList.add('fade-out'); // aplica fade
          setTimeout(() => {
            window.location.href = href; // navega após fade
          }, 300); // tempo do fade em ms (igual ao CSS)
        } else {
          // Em desktop, a navegação segue o comportamento padrão
          window.location.href = href;
        }
      });
    });
  }

  // 🔹 Marca o link ativo no menu (desktop e mobile)
  const currentPath = window.location.pathname;
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}


