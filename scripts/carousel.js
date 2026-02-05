document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // Initialisation des carrousels
    // ================================
    document.querySelectorAll('.carousel-container').forEach(container => {
        const carousel = container.querySelector('.carousel');
        const items = carousel.querySelectorAll('.carousel-img');
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');
        const dotsContainer = container.querySelector('.carousel-dots');

        let currentIndex = 0;

        // Création des dots
        items.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function update() {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === currentIndex);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goTo(index) {
            currentIndex = (index + items.length) % items.length;
            update();
        }

        prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

        // Ouverture lightbox au clic
        items.forEach((item, i) => {
            item.addEventListener('click', () => openLightbox(i, Array.from(items)));
        });

        update();
    });

    // ================================
    // Lightbox globale
    // ================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxVideo = lightbox.querySelector('.lightbox-video');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const currentSpan = lightbox.querySelector('.current');
    const totalSpan = lightbox.querySelector('.total');

    let lightboxItems = [];
    let lightboxIndex = 0;

    function openLightbox(index, items) {
        lightboxItems = items;
        lightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
    }

    function updateLightbox() {
        const item = lightboxItems[lightboxIndex];

        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';

        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt || '';

        currentSpan.textContent = lightboxIndex + 1;
        totalSpan.textContent = lightboxItems.length;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        lightboxImg.src = '';
        lightboxVideo.pause();
        lightboxVideo.src = '';
    }

    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', () => {
        lightboxIndex =
            (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        updateLightbox();
    });

    nextBtn.addEventListener('click', () => {
        lightboxIndex =
            (lightboxIndex + 1) % lightboxItems.length;
        updateLightbox();
    });

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
});
