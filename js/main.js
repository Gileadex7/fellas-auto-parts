/* ============================================================
   FELLAS AUTO PARTS — Main JavaScript v2
   ============================================================ */

'use strict';

// ── Data ──────────────────────────────────────────────────────

const MODELS = {
  'Fiat':       ['Toro', 'Argo', 'Cronos', 'Pulse', 'Fastback', 'Strada', 'Mobi', 'Uno'],
  'Jeep':       ['Compass', 'Renegade', 'Commander', 'Wrangler'],
  'Volkswagen': ['T-Cross', 'Taos', 'Nivus', 'Polo', 'Virtus', 'Amarok', 'Gol', 'Saveiro'],
  'Chevrolet':  ['Tracker', 'Onix', 'Cruze', 'S10', 'Trailblazer', 'Spin'],
  'Ford':       ['Ranger', 'Territory', 'Bronco Sport', 'Ka'],
  'Toyota':     ['Hilux', 'SW4', 'Corolla Cross', 'Yaris', 'Corolla'],
  'Honda':      ['HR-V', 'WR-V', 'Civic', 'City', 'Fit'],
  'Hyundai':    ['HB20', 'Creta', 'Tucson', 'i30']
};

const REVISION_TYPES = [
  'Revisão Básica (10.000 km)',
  'Revisão Completa (20.000 km)',
  'Revisão Preventiva (40.000 km)',
  'Revisão Geral (60.000 km)',
  'Troca de Óleo',
  'Outra'
];

const KIT_TYPES = [
  'Kit Básico — só óleo e filtros',
  'Kit Completo — todos os componentes',
  'Kit Personalizado — você escolhe',
];

const KITS_PRONTOS = [
  {
    id: 1,
    cat: 'KIT',
    name: 'Revisão Básica',
    img: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800&q=80&auto=format&fit=crop',
    desc: 'Óleo, filtro de óleo e filtro de ar.',
    features: [
      'Óleo lubrificante de alta qualidade',
      'Filtro de óleo original',
      'Filtro de ar',
      'Para revisões de 10.000 km'
    ],
    price: 'R$ 189,90',
    priceLabel: 'A partir de',
    full: 'Kit Revisão Básica',
  },
  {
    id: 2,
    cat: 'KIT',
    name: 'Revisão Completa',
    img: 'https://images.unsplash.com/photo-1635770310756-2c2b0a4e5e94?w=800&q=80&auto=format&fit=crop',
    desc: 'Todos os filtros, velas e óleo.',
    features: [
      'Óleo motor sintético',
      'Filtros de óleo, ar, combustível e cabine',
      'Velas de ignição',
      'Para revisões de 20.000–40.000 km'
    ],
    price: 'R$ 349,90',
    priceLabel: 'A partir de',
    full: 'Kit Revisão Completa',
  },
  {
    id: 3,
    cat: 'KIT',
    name: 'Troca de Óleo',
    img: 'https://images.unsplash.com/photo-1620891549027-942faa3f8b0e?w=800&q=80&auto=format&fit=crop',
    desc: 'Óleo lubrificante e filtro de óleo.',
    features: [
      'Óleo lubrificante premium',
      'Filtro de óleo original',
      'Anel de vedação do bujão',
      'Selo de garantia incluído'
    ],
    price: 'R$ 139,90',
    priceLabel: 'A partir de',
    full: 'Kit Troca de Óleo',
  },
  {
    id: 4,
    cat: 'KIT',
    name: 'Correias + Tensores',
    img: 'https://images.unsplash.com/photo-1635073908681-b4dfbed4429a?w=800&q=80&auto=format&fit=crop',
    desc: 'Correias, tensores e rolamentos.',
    features: [
      'Correia dentada principal',
      'Correia auxiliar (acessórios)',
      'Tensores hidráulicos',
      'Rolamentos auxiliares'
    ],
    price: 'R$ 299,90',
    priceLabel: 'A partir de',
    full: 'Kit Correias + Tensores',
  },
];

const REVIEWS = [
  {
    text: 'Excelente atendimento e produtos de qualidade! Já comprei várias vezes e sempre fui muito bem atendido.',
    name: 'Ricardo S.',
    loc: 'São Paulo – SP',
    init: 'R',
    stars: 5,
  },
  {
    text: 'Kit chegou rápido e completo. Atendimento via WhatsApp foi excepcional. Recomendo demais!',
    name: 'Marcos O.',
    loc: 'Belo Horizonte – MG',
    init: 'M',
    stars: 5,
  },
  {
    text: 'Profissionalismo total. Me ajudaram a montar o kit certo pro meu Compass sem complicação.',
    name: 'Camila F.',
    loc: 'Curitiba – PR',
    init: 'C',
    stars: 5,
  },
];

const WPP_NUMBER = '5577998213444';
const WPP_BASE = `https://wa.me/${WPP_NUMBER}`;

function openWpp(msg) {
  window.open(`${WPP_BASE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ══════════════════════════════════════════════════════════
// NAVBAR
// ══════════════════════════════════════════════════════════

(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
})();

// ══════════════════════════════════════════════════════════
// HERO QUOTE FORM (multi-step)
// ══════════════════════════════════════════════════════════

(function initQuoteForm() {
  let currentStep = 1;

  const stepIndicators = document.querySelectorAll('.quote-step');
  const stepPanels = document.querySelectorAll('.quote-form-step');

  function showStep(n) {
    currentStep = n;
    stepPanels.forEach((p) => p.classList.toggle('active', +p.dataset.step === n));
    stepIndicators.forEach((s) => {
      const stepNum = +s.dataset.step;
      s.classList.toggle('active', stepNum === n);
      s.classList.toggle('done', stepNum < n);
    });
  }

  // Brand → Model cascade
  const brandSel = document.getElementById('q-brand');
  const modelSel = document.getElementById('q-model');

  brandSel.addEventListener('change', () => {
    const models = MODELS[brandSel.value] || [];
    modelSel.innerHTML = '<option value="">Selecione o modelo</option>' +
      models.map((m) => `<option>${m}</option>`).join('');
  });

  // Navigation buttons
  document.getElementById('q-next-1').addEventListener('click', () => {
    if (!brandSel.value || !modelSel.value || !document.getElementById('q-year').value) {
      showToast('Por favor, preencha marca, modelo e ano.');
      return;
    }
    showStep(2);
  });

  document.getElementById('q-back-2').addEventListener('click', () => showStep(1));

  document.getElementById('q-next-2').addEventListener('click', () => {
    if (!document.getElementById('q-revision').value) {
      showToast('Selecione o tipo de revisão.');
      return;
    }
    showStep(3);
  });

  document.getElementById('q-back-3').addEventListener('click', () => showStep(2));

  document.getElementById('q-submit').addEventListener('click', () => {
    const brand = brandSel.value;
    const model = modelSel.value;
    const year = document.getElementById('q-year').value;
    const revision = document.getElementById('q-revision').value;
    const kit = document.getElementById('q-kit-type').value;

    const msg = `Olá! Quero um orçamento de revisão:
• Veículo: ${brand} ${model} ${year}
• Tipo de revisão: ${revision}
• Tipo de kit: ${kit}

Aguardo o orçamento, obrigado!`;

    openWpp(msg);
    showToast('Redirecionando para o WhatsApp...');
  });
})();

// ══════════════════════════════════════════════════════════
// KITS PRONTOS
// ══════════════════════════════════════════════════════════

function renderKitsPron() {
  const grid = document.getElementById('kits-pron-grid');
  if (!grid) return;
  grid.innerHTML = KITS_PRONTOS.map((k) => `
    <article class="kit-pron-card reveal" data-id="${k.id}">
      <div class="kit-pron-img">
        <img src="${k.img}" alt="${k.full}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="kit-pron-body">
        <h3 class="kit-pron-name"><span>${k.cat}</span>${k.name}</h3>
        <p class="kit-pron-desc">${k.desc}</p>
        <div>
          <div class="kit-pron-price-label">${k.priceLabel}</div>
          <div class="kit-pron-price">${k.price}</div>
        </div>
        <button class="kit-pron-btn" data-id="${k.id}">Solicitar Orçamento</button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.kit-pron-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') openModal(+card.dataset.id);
    });
  });
  grid.querySelectorAll('.kit-pron-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const k = KITS_PRONTOS.find((x) => x.id === +btn.dataset.id);
      if (k) openWpp(`Olá! Tenho interesse no ${k.full} (${k.price}). Pode me passar mais informações?`);
    });
  });

  grid.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

// ══════════════════════════════════════════════════════════
// PRODUCT MODAL
// ══════════════════════════════════════════════════════════

const modalOverlay = document.getElementById('product-modal');
let currentModalKit = null;

function openModal(id) {
  const k = KITS_PRONTOS.find((x) => x.id === id);
  if (!k) return;
  currentModalKit = k;

  document.getElementById('modal-title').innerHTML = `<span>KIT</span> ${k.name}`;
  document.getElementById('modal-sub').textContent = 'Kit completo para revisão automotiva premium';
  document.getElementById('modal-img-tag').src = k.img;
  document.getElementById('modal-img-tag').alt = k.full;
  document.getElementById('modal-desc').textContent = k.desc + ' Kit profissional, montado por nossa equipe técnica especializada, com peças de procedência garantida e adequadas ao seu veículo.';
  document.getElementById('modal-features-list').innerHTML = k.features.map((f) => `<li>${f}</li>`).join('');
  document.getElementById('modal-price').textContent = k.price;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  currentModalKit = null;
}

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
document.getElementById('modal-close').addEventListener('click', closeModal);

document.getElementById('modal-buy-btn').addEventListener('click', () => {
  if (currentModalKit) openWpp(`Olá! Quero comprar o ${currentModalKit.full} (${currentModalKit.price}). Pode me passar o link de pagamento?`);
});
document.getElementById('modal-ask-btn').addEventListener('click', () => {
  if (currentModalKit) openWpp(`Olá! Tenho dúvidas sobre o ${currentModalKit.full}. Pode me ajudar?`);
});

// ══════════════════════════════════════════════════════════
// REVIEWS CAROUSEL
// ══════════════════════════════════════════════════════════

(function initReviews() {
  const stage = document.getElementById('reviews-stage');
  if (!stage) return;

  stage.innerHTML = `
    <div class="reviews-nav">
      <button id="rev-prev" aria-label="Anterior">‹</button>
      <button id="rev-next" aria-label="Próxima">›</button>
    </div>
  ` + REVIEWS.map((r, i) => `
    <div class="review-slide${i === 0 ? ' active' : ''}" data-i="${i}">
      <div class="review-stars" aria-label="${r.stars} estrelas">${'★'.repeat(r.stars)}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-author">
        <div class="review-avatar">${r.init}</div>
        <div>
          <div class="review-info-name">${r.name}</div>
          <div class="review-info-loc">${r.loc}</div>
        </div>
      </div>
    </div>
  `).join('');

  let current = 0;
  const slides = stage.querySelectorAll('.review-slide');

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
  }

  stage.querySelector('#rev-prev').addEventListener('click', () => show(current - 1));
  stage.querySelector('#rev-next').addEventListener('click', () => show(current + 1));

  // Auto-rotate
  setInterval(() => show(current + 1), 6000);
})();

// ══════════════════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════════════════

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

function setupReveal() {
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

// ══════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════

let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ══════════════════════════════════════════════════════════
// WHATSAPP FLOAT
// ══════════════════════════════════════════════════════════

document.getElementById('wpp-float').addEventListener('click', (e) => {
  e.preventDefault();
  openWpp('Olá! Vim pelo site da Fellas Auto Parts e gostaria de falar com um vendedor.');
});

// ══════════════════════════════════════════════════════════
// BUILD KIT ICONS — scroll to quote form
// ══════════════════════════════════════════════════════════

document.querySelectorAll('.build-kit-icon').forEach((icon) => {
  icon.addEventListener('click', () => {
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    showToast(`Item selecionado: ${icon.querySelector('span').textContent}`);
  });
});

// Montar Meu Kit button
const btnMontarKit = document.getElementById('btn-montar-kit');
if (btnMontarKit) {
  btnMontarKit.addEventListener('click', () => {
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    showToast('Configure seu kit no formulário ao lado');
  });
}

// "Fazer Orçamento" hero button
const btnFazerOrc = document.getElementById('btn-fazer-orc');
if (btnFazerOrc) {
  btnFazerOrc.addEventListener('click', () => {
    document.querySelector('.quote-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// "Ver Kits Prontos" hero button
const btnVerKits = document.getElementById('btn-ver-kits');
if (btnVerKits) {
  btnVerKits.addEventListener('click', () => {
    document.getElementById('kits-section').scrollIntoView({ behavior: 'smooth' });
  });
}

// "Ver todos os kits"
const btnVerTodos = document.getElementById('btn-ver-todos');
if (btnVerTodos) {
  btnVerTodos.addEventListener('click', () => {
    openWpp('Olá! Quero ver todos os kits disponíveis no catálogo da Fellas.');
  });
}

// "Falar com especialista"
const btnEspecialista = document.getElementById('btn-especialista');
if (btnEspecialista) {
  btnEspecialista.addEventListener('click', () => {
    openWpp('Olá! Gostaria de falar com um especialista da Fellas Auto Parts para tirar dúvidas sobre manutenção.');
  });
}

// ══════════════════════════════════════════════════════════
// NAV ACTIVE LINK (scrollspy)
// ══════════════════════════════════════════════════════════

(function initScrollspy() {
  const sections = ['hero', 'kits-section', 'monte-section', 'why', 'about-cta', 'contact'];
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActive() {
    const scrollY = window.scrollY + 200;
    let active = 'hero';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) active = id;
    }
    navLinks.forEach((a) => a.classList.toggle('active', a.dataset.section === active));
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

// ══════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════

renderKitsPron();
setupReveal();

// Initialize brand → model on quote form
const initBrand = document.getElementById('q-brand');
if (initBrand && initBrand.value) {
  const models = MODELS[initBrand.value] || [];
  document.getElementById('q-model').innerHTML = '<option value="">Selecione o modelo</option>' +
    models.map((m) => `<option>${m}</option>`).join('');
}
