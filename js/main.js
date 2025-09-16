// Configurações e funções adicionais podem ser adicionadas aqui
document.addEventListener('DOMContentLoaded', function () {
    // Código de inicialização adicional se necessário
    console.log('Site da igreja carregado com sucesso!');
});

document.addEventListener('DOMContentLoaded', function () {
    console.log('Site da igreja carregado com sucesso!');

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.style.display = 'flex';
        menuToggle.setAttribute('aria-expanded', 'true');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        menuToggle.setAttribute('aria-expanded', 'false');
    });

    // Fecha o menu se o usuário clicar fora
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.style.display = 'none';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Captura todos os links do menu mobile
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // previne recarregamento da página

            // Pega o valor do data-page (se existir)
            const page = link.getAttribute('data-page');

            if (page) {
                // Atualiza o hash para que o router carregue a página correta
                window.location.hash = page;
            } else {
                // Caso o link não tenha data-page, usa o href normal
                const href = link.getAttribute('href');
                if (href) window.location.href = href;
            }

            // Fecha o menu
            mobileMenu.style.display = 'none';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
});
