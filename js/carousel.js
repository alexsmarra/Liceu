export function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');

    if (!items.length) return; // se não existir carrossel na página, não roda

    let currentIndex = 0;
    const totalItems = items.length;

    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            showItem(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % totalItems;
            showItem(currentIndex);
        });
    }

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', function () {
            currentIndex = i;
            showItem(currentIndex);
        });
    });

    // Auto-avanço a cada 6 segundos
    setInterval(function () {
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
    }, 6000);

    // Inicia mostrando o primeiro
    showItem(currentIndex);
}
