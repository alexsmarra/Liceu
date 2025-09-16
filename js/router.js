import { initCarousel } from "./carousel.js";

export class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
        this.homeContent = document.getElementById('content').innerHTML;
        this.init();
    }

    init() {
    this.addRoute('home', null);
    this.addRoute('sobre', 'pages/sobre.html');
    this.addRoute('horarios', 'pages/horarios.html');
    this.addRoute('aulas-online', 'pages/aulas-online.html');
    this.addRoute('contato', 'pages/contato.html');

    window.addEventListener('hashchange', () => this.loadRoute());
    window.addEventListener('load', () => this.loadRoute());

    // ✅ Captura os links do menu desktop
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page) {
                window.location.hash = page;
            }
        });
    });

    // Captura o clique na logo
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = 'home';
        });
    }
}


    addRoute(path, template) {
        this.routes[path] = template;
    }

    async loadRoute() {
        const path = window.location.hash.slice(1) || 'home';
        const template = this.routes[path];
        const main = document.querySelector('main');

        if (path === 'home') {
            main.classList.remove('fill-screen');
            if (template === null) {
                document.getElementById('content').innerHTML = this.homeContent;
                initCarousel(); // ✅ chama o carrossel aqui
                this.updateActiveLink('home');
                return;
            }
        } else {
            main.classList.add('fill-screen');
        }

        if (template) {
            try {
                const response = await fetch(template);
                if (!response.ok) throw new Error('Página não encontrada');
                const content = await response.text();
                document.getElementById('content').innerHTML = content;

                this.updateActiveLink(path);
            } catch (error) {
                document.getElementById('content').innerHTML = `
                    <div class="page-content">
                        <h2>Página não encontrada</h2>
                        <p>A página que você está procurando não existe.</p>
                        <p><a href="#home">Voltar para a página inicial</a></p>
                    </div>
                `;
                console.error('Erro ao carregar a página:', error);
            }
        }
    }

    updateActiveLink(activePage) {
        document.querySelectorAll('nav a').forEach(link => {
            link.style.color = (link.getAttribute('data-page') === activePage)
                ? '#a3b6c0'
                : 'white';
        });
    }
}


