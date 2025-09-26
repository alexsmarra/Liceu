export function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');

    if (!items.length) return;

    let currentIndex = 0;
    const totalItems = items.length;
    let autoAdvanceInterval;

    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function resetAutoAdvance() {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = setInterval(function () {
            currentIndex = (currentIndex + 1) % totalItems;
            showItem(currentIndex);
        }, 6000);
    }

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', function () {
            currentIndex = i;
            showItem(currentIndex);
            resetAutoAdvance();
        });
    });

    // Swipe apenas no mobile
    let startX = 0;
    let isDragging = false;
    const carousel = document.querySelector('.carousel');

    // Impede o arraste padrão das imagens
    carousel.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
        // Clique na imagem avança para a próxima (apenas desktop)
        img.addEventListener('click', function (e) {
            if (!isMobile()) {
                currentIndex = (currentIndex + 1) % totalItems;
                showItem(currentIndex);
                resetAutoAdvance();
            }
        });
    });

    function isMobile() {
        return window.matchMedia("(pointer: coarse)").matches;
    }

    function onDragStart(e) {
        if (!isMobile()) return;
        isDragging = true;
        startX = e.touches[0].clientX;
        document.body.style.overflow = 'hidden';
    }

    function onDragMove(e) {
        if (!isMobile() || !isDragging) return;
        e.preventDefault();
    }

    function onDragEnd(e) {
        if (!isMobile() || !isDragging) return;
        isDragging = false;
        document.body.style.overflow = '';
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                currentIndex = (currentIndex + 1) % totalItems;
            } else {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            }
            showItem(currentIndex);
            resetAutoAdvance();
        }
    }

    if (carousel) {
        // Apenas mobile: swipe
        carousel.addEventListener('touchstart', onDragStart, { passive: false });
        carousel.addEventListener('touchmove', onDragMove, { passive: false });
        carousel.addEventListener('touchend', onDragEnd);
    }

    // Auto-avanço a cada 6 segundos
    resetAutoAdvance();
    showItem(currentIndex);
}