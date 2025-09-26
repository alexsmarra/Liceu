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

    const carousel = document.querySelector('.carousel');

    // Impede o arraste padrão das imagens
    carousel.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
        img.addEventListener('click', function (e) {
            if (!isMobile()) {
                const rect = img.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                if (clickX < rect.width / 2) {
                    // Clique à esquerda: imagem anterior
                    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                } else {
                    // Clique à direita: próxima imagem
                    currentIndex = (currentIndex + 1) % totalItems;
                }
                showItem(currentIndex);
                resetAutoAdvance();
            }
        });
    });

    function isMobile() {
        return window.matchMedia("(pointer: coarse)").matches;
    }

    // Mobile swipe (mantém igual)
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    function onDragStart(e) {
        if (!isMobile()) return;
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }

    function onDragMove(e) {
        if (!isMobile() || !isDragging) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);

        if (diffX > diffY) {
            e.preventDefault();
        }
    }

    function onDragEnd(e) {
        if (!isMobile() || !isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX < 0) {
                currentIndex = (currentIndex + 1) % totalItems;
            } else {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            }
            showItem(currentIndex);
            resetAutoAdvance();
        }
    }

    if (carousel) {
        // Mobile swipe
        carousel.addEventListener('touchstart', onDragStart, { passive: true });
        carousel.addEventListener('touchmove', onDragMove, { passive: false });
        carousel.addEventListener('touchend', onDragEnd);
    }

    // Auto-avanço a cada 6 segundos
    resetAutoAdvance();
    showItem(currentIndex);
}