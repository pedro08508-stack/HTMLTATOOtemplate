/**
 * SANTO TRAÇO TATTOO STUDIO
 * JavaScript Puro (Vanilla JS, 100% estático, sem frameworks)
 * Controle de filtros de estilo, modal lightbox e animações de scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. FILTROS DO PORTFÓLIO POR ESTILO
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      portfolioCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');

        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // 2. MODAL LIGHTBOX EDITORIAL
  const modalBackdrop = document.getElementById('tattooModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalWaBtn = document.getElementById('modalWaBtn');
  const modalCloseIcon = document.getElementById('modalCloseIcon');

  portfolioCards.forEach((card) => {
    card.addEventListener('click', () => {
      const imgEl = card.querySelector('img');
      const titleEl = card.querySelector('.card-title');
      const tagEl = card.querySelector('.card-category-tag');
      const descEl = card.querySelector('.card-description');

      const title = titleEl ? titleEl.textContent : 'Projeto Autoral';
      const category = tagEl ? tagEl.textContent : 'Estilo';
      const desc = descEl ? descEl.textContent : '';
      const src = imgEl ? imgEl.getAttribute('src') : '';

      if (modalImage) modalImage.src = src;
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDesc) modalDesc.textContent = desc;

      if (modalWaBtn) {
        const msg = encodeURIComponent(`Olá! Vi o projeto "${title}" (${category}) no site do Santo Traço e gostaria de solicitar um orçamento.`);
        modalWaBtn.href = `https://wa.me/5511998765432?text=${msg}`;
      }

      if (modalBackdrop) {
        modalBackdrop.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseIcon) {
    modalCloseIcon.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // 3. MICRO-ANIMAÇÕES SUTIS DE FADE-IN AO ROLAR (INTERSECTION OBSERVER)
  const fadeElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((el) => fadeObserver.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add('is-visible'));
  }
});
