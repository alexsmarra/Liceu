class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
        this.homeContent = document.getElementById('content').innerHTML;
        this.init();
    }

    init() {
        // Definir rotas
        this.addRoute('home', null);
        this.addRoute('sobre', 'pages/sobre.html');
        this.addRoute('ministerios', 'pages/ministerios.html');
        this.addRoute('eventos', 'pages/eventos.html');
        this.addRoute('contato', 'pages/contato.html');
        this.addRoute('devocionais', 'pages/devocionais.html');

        // Configurar event listeners
        window.addEventListener('hashchange', () => this.loadRoute());
        window.addEventListener('load', () => this.loadRoute());

        // Prevenir comportamento padrão dos links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                window.location.hash = page;
            });
        });

        // Prevenir comportamento padrão do link da logo
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

        // Adiciona ou remove a classe fill-screen conforme a rota
        if (path === 'home') {
            main.classList.remove('fill-screen');
            if (template === null) {
                document.getElementById('content').innerHTML = this.homeContent;
                this.initCarousel();
                this.updateActiveLink('home');
                return;
            }
        } else {
            main.classList.add('fill-screen');
        }

        if (template) {
            try {
                const response = await fetch(template);
                if (!response.ok) {
                    throw new Error('Página não encontrada');
                }
                const content = await response.text();
                document.getElementById('content').innerHTML = content;

                // Atualizar navegação
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
            if (link.getAttribute('data-page') === activePage) {
                link.style.color = '#3498db';
            } else {
                link.style.color = 'white';
            }
        });
    }

    initCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicators = document.querySelectorAll('.indicator');

        let currentIndex = 0;
        const totalItems = items.length;

        // Função para atualizar o carrossel
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Atualizar indicadores
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        // Event listeners para os botões
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            });
        }

        // Event listeners para os indicadores
        if (indicators.length > 0) {
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function () {
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateCarousel();
                });
            });
        }

        // Auto-avanço do carrossel a cada 5 segundos
        setInterval(function () {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    }
}

// Inicializar o router
const router = new Router();