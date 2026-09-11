// ==================================================================
// 1) ANO DINAMICO NO RODAPE (não precisa editar)
// ==================================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ==================================================================
// 2) NAVBAR: ganha fundo mais solido ao rolar
// ==================================================================
const navbar = document.getElementById("navbar");
const onScroll = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ==================================================================
// 3) FILTRO DO PORTFOLIO POR ESTILO
//    Cada botao tem data-filter="estilo" e cada foto tem a classe
//    correspondente (ex: class="card fineline"). Para adicionar um
//    novo estilo, crie o botao e marque as fotos com a class nova.
// ==================================================================
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // destaca o botao ativo
    filterButtons.forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });

    // mostra/esconde as fotos
    cards.forEach((card) => {
      const show = filter === "all" || card.classList.contains(filter);

      if (show) {
        card.classList.remove("hidden");
        card.classList.remove("fading");
        // forca o navegador a detectar a mudanca antes de re-animar
        void card.offsetWidth;
        card.classList.add("fading");
      } else {
        card.classList.add("hidden");
        card.classList.remove("fading");
      }
    });
  });
});

// ==================================================================
// 4) MICRO-ANIMACOES: fade-in ao rolar (IntersectionObserver)
//    Elementos com a classe "reveal" entram suavemente quando
//    aparecem na tela.
// ==================================================================
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // anima apenas 1x
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // fallback para navegadores antigos: mostra tudo sem animacao
  revealEls.forEach((el) => el.classList.add("active"));
}