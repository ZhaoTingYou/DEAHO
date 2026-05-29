const root = document.documentElement;
const siteHeader = document.getElementById('siteHeader');
const reveals = document.querySelectorAll('.reveal');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navTriggers = Array.from(document.querySelectorAll('.nav-trigger'));
const megaMenu = document.getElementById('megaMenu');
const megaCollectionHeading = document.getElementById('megaCollectionHeading');
const megaSuggestionHeading = document.getElementById('megaSuggestionHeading');
const megaCollectionList = document.getElementById('megaCollectionList');
const megaSuggestionList = document.getElementById('megaSuggestionList');
const megaTitle = document.getElementById('megaTitle');
const megaCards = document.getElementById('megaCards');
const megaCta = document.getElementById('megaCta');
const introSlides = Array.from(document.querySelectorAll('.intro-slide'));
const collection = document.getElementById('collection');
const introProgress = document.getElementById('introProgress');
const progressBars = introProgress ? Array.from(introProgress.querySelectorAll('.bar')) : [];
const quoteForm = document.getElementById('quoteForm');
const quoteFeedback = document.getElementById('quoteFeedback');
const showcaseMainImage = document.getElementById('showcaseMainImage');
const showcaseDetailImage = document.getElementById('showcaseDetailImage');
const showcaseProductImage = document.getElementById('showcaseProductImage');
const showcaseEyebrow = document.getElementById('showcaseEyebrow');
const showcaseTitle = document.getElementById('showcaseTitle');
const showcaseSpec = document.getElementById('showcaseSpec');
const showcaseDesc = document.getElementById('showcaseDesc');
const showcasePage = document.getElementById('showcasePage');
const showcasePrev = document.getElementById('showcasePrev');
const showcaseNext = document.getElementById('showcaseNext');
const showcaseTabs = document.getElementById('showcaseTabs');

// Replace image URLs here when you receive real DAHO product photos.
const imageAssets = {
  hero_primary: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=2200',
  hero_secondary: 'https://images.pexels.com/photos/834980/pexels-photo-834980.jpeg?auto=compress&cs=tinysrgb&w=2200',
  collection_mvp: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1200',
  collection_team: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1200',
  collection_legacy: 'https://images.pexels.com/photos/834980/pexels-photo-834980.jpeg?auto=compress&cs=tinysrgb&w=1200',
  heritage_story: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1600',
  showcase_mvp_main: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1800',
  showcase_mvp_detail: 'https://images.pexels.com/photos/834980/pexels-photo-834980.jpeg?auto=compress&cs=tinysrgb&w=1800',
  showcase_mvp_product: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=800',
  showcase_team_main: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1800',
  showcase_team_detail: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1800',
  showcase_team_product: 'https://images.pexels.com/photos/1098879/pexels-photo-1098879.jpeg?auto=compress&cs=tinysrgb&w=800',
  showcase_legacy_main: 'https://images.pexels.com/photos/834980/pexels-photo-834980.jpeg?auto=compress&cs=tinysrgb&w=1800',
  showcase_legacy_detail: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1800',
  showcase_legacy_product: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800'
};

const collectionShowcaseData = [
  {
    tab: 'MVP Signature',
    eyebrow: 'CHAMPIONSHIP EDITION',
    title: 'MVP Signature',
    spec: 'Custom stone / Initial engraving / Premium finish',
    desc: '센터 스톤과 이니셜 각인으로 선수 개인의 커리어 서사를 강조한 프리미엄 모델.',
    main: 'showcase_mvp_main',
    detail: 'showcase_mvp_detail',
    product: 'showcase_mvp_product'
  },
  {
    tab: 'Team Dynasty',
    eyebrow: 'TEAM PROGRAM',
    title: 'Team Dynasty',
    spec: 'Team crest / Season records / Championship year',
    desc: '팀 엠블럼, 시즌 레코드, 우승 연도를 정교하게 담아내는 단체 우승 기념 라인.',
    main: 'showcase_team_main',
    detail: 'showcase_team_detail',
    product: 'showcase_team_product'
  },
  {
    tab: 'Legacy Classic',
    eyebrow: 'EXECUTIVE LINE',
    title: 'Legacy Classic',
    spec: 'Classic silhouette / Bespoke metal options',
    desc: '클래식한 실루엣에 현대적 세공을 더해 선수단과 구단 임원 모두에게 어울리는 디자인.',
    main: 'showcase_legacy_main',
    detail: 'showcase_legacy_detail',
    product: 'showcase_legacy_product'
  }
];

const megaMenuData = {
  rings: {
    collectionLabel: 'RING CATEGORIES',
    suggestionLabel: 'POPULAR REQUESTS',
    title: 'CHAMPIONSHIP RINGS',
    ctaText: 'VIEW ALL RINGS',
    ctaHref: '#collection',
    collections: ['Basketball Champion', 'Baseball Champion', 'Football Champion', 'Esports Winner', 'Hall of Fame'],
    suggestions: ['MVP Edition', 'Captain Edition', 'Executive Edition', 'Anniversary Ring', 'Legacy Box Set'],
    cards: [
      { name: 'MVP SIGNATURE', image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'TEAM DYNASTY', image: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'LEGACY CLASSIC', image: 'https://images.pexels.com/photos/834980/pexels-photo-834980.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'CAPTAIN CUT', image: 'https://images.pexels.com/photos/1098879/pexels-photo-1098879.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'ALL STAR', image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ]
  },
  studio: {
    collectionLabel: 'DESIGN OPTIONS',
    suggestionLabel: 'MATERIAL & DETAILS',
    title: 'DESIGN STUDIO',
    ctaText: 'OPEN DESIGN BRIEF',
    ctaHref: '#craft',
    collections: ['Ring Silhouette', 'Side Engraving', 'Top Plate', 'Stone Layout', 'Inner Message'],
    suggestions: ['Silver 925', '14K Gold', '18K Gold', 'Black Rhodium', 'Custom Enamel'],
    cards: [
      { name: 'SHAPE BOARD', image: 'https://images.pexels.com/photos/10983787/pexels-photo-10983787.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'STONE MAP', image: 'https://images.pexels.com/photos/8370320/pexels-photo-8370320.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'LOGO ENGRAVE', image: 'https://images.pexels.com/photos/9428774/pexels-photo-9428774.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'COLOR ENAMEL', image: 'https://images.pexels.com/photos/5370705/pexels-photo-5370705.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'FINAL MOCKUP', image: 'https://images.pexels.com/photos/8370747/pexels-photo-8370747.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ]
  },
  custom: {
    collectionLabel: 'ORDER FLOW',
    suggestionLabel: 'DELIVERY MODES',
    title: 'CUSTOM ORDERS',
    ctaText: 'REQUEST QUOTE',
    ctaHref: '#quote',
    collections: ['Briefing', '3D Preview', 'Sample Approval', 'Mass Production', 'Final Delivery'],
    suggestions: ['Standard 6 Weeks', 'Rush 4 Weeks', 'Team Batch', 'VIP Packaging', 'Global Shipment'],
    cards: [
      { name: 'BRIEF SESSION', image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'CAD REVIEW', image: 'https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'SAMPLE RING', image: 'https://images.pexels.com/photos/1454188/pexels-photo-1454188.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'BATCH PRODUCTION', image: 'https://images.pexels.com/photos/3912572/pexels-photo-3912572.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'TROPHY CASE', image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ]
  },
  services: {
    collectionLabel: 'SERVICE MENU',
    suggestionLabel: 'PARTNERSHIP',
    title: 'CLIENT SERVICES',
    ctaText: 'BOOK CONSULTATION',
    ctaHref: '#quote',
    collections: ['Team Contract', 'League Partnership', 'Sponsor Collaboration', 'Aftercare', 'Certificate Support'],
    suggestions: ['Dedicated PM', 'Monthly Reporting', 'Multi-country Shipping', 'Insurance Delivery', 'Renewal Program'],
    cards: [
      { name: 'TEAM PACKAGE', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'LEAGUE PROJECT', image: 'https://images.pexels.com/photos/5999735/pexels-photo-5999735.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'GLOBAL SHIP', image: 'https://images.pexels.com/photos/7363098/pexels-photo-7363098.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'QC REPORT', image: 'https://images.pexels.com/photos/5716037/pexels-photo-5716037.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'AFTERCARE', image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ]
  },
  story: {
    collectionLabel: 'DAHO ARCHIVE',
    suggestionLabel: 'EDITORIAL',
    title: 'DAHO STORY',
    ctaText: 'EXPLORE STORY',
    ctaHref: '#heritage',
    collections: ['Brand Mission', 'Workroom', 'Hall of Champions', 'Client Voices', 'Media'],
    suggestions: ['Case Studies', 'Behind The Craft', 'Launch News', 'Event Gallery', 'Press Kit'],
    cards: [
      { name: 'WORKROOM', image: 'https://images.pexels.com/photos/5370644/pexels-photo-5370644.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'CHAMPION WALL', image: 'https://images.pexels.com/photos/7135055/pexels-photo-7135055.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'DESIGN NOTES', image: 'https://images.pexels.com/photos/5816297/pexels-photo-5816297.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'PROJECT RECAP', image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'PRESS ROOM', image: 'https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ]
  }
};

let headerHovered = false;
let activeMenuKey = '';
let lastScrollY = window.scrollY;
let showSolidHeaderInContent = true;

const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

const applyImageAssets = () => {
  document.querySelectorAll('[data-bg-key]').forEach((el) => {
    const key = el.getAttribute('data-bg-key');
    const imageUrl = key ? imageAssets[key] : '';
    if (imageUrl) {
      el.style.setProperty('--intro-image', `url('${imageUrl}')`);
    }
  });

  document.querySelectorAll('img[data-img-key]').forEach((img) => {
    const key = img.getAttribute('data-img-key');
    const imageUrl = key ? imageAssets[key] : '';
    if (imageUrl) {
      img.src = imageUrl;
    }
  });
};

const resolveImageAsset = (imageKeyOrUrl) => imageAssets[imageKeyOrUrl] || imageKeyOrUrl || '';

let showcaseIndex = 0;

const renderShowcaseTabs = () => {
  if (!showcaseTabs) {
    return;
  }

  showcaseTabs.innerHTML = collectionShowcaseData
    .map(
      (item, index) =>
        `<button class="showcase-tab${index === 0 ? ' active' : ''}" type="button" data-index="${index}" role="tab" aria-selected="${index === 0}">${item.tab}</button>`
    )
    .join('');
};

const renderCollectionShowcase = (nextIndex) => {
  if (
    !collectionShowcaseData.length ||
    !showcaseMainImage ||
    !showcaseDetailImage ||
    !showcaseProductImage ||
    !showcaseEyebrow ||
    !showcaseTitle ||
    !showcaseSpec ||
    !showcaseDesc
  ) {
    return;
  }

  const total = collectionShowcaseData.length;
  showcaseIndex = (nextIndex + total) % total;
  const item = collectionShowcaseData[showcaseIndex];

  showcaseMainImage.src = resolveImageAsset(item.main);
  showcaseMainImage.alt = `${item.title} 메인 비주얼`;
  showcaseDetailImage.src = resolveImageAsset(item.detail);
  showcaseDetailImage.alt = `${item.title} 디테일 비주얼`;
  showcaseProductImage.src = resolveImageAsset(item.product);
  showcaseProductImage.alt = `${item.title} 제품 이미지`;

  showcaseEyebrow.textContent = item.eyebrow;
  showcaseTitle.textContent = item.title;
  showcaseSpec.textContent = item.spec;
  showcaseDesc.textContent = item.desc;

  if (showcasePage) {
    showcasePage.textContent = `${showcaseIndex + 1} / ${total}`;
  }

  if (showcaseTabs) {
    showcaseTabs.querySelectorAll('.showcase-tab').forEach((tab, index) => {
      const active = index === showcaseIndex;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  }
};

const initCollectionShowcase = () => {
  if (!showcaseTabs || !showcasePrev || !showcaseNext) {
    return;
  }

  renderShowcaseTabs();
  renderCollectionShowcase(0);

  showcasePrev.addEventListener('click', () => {
    renderCollectionShowcase(showcaseIndex - 1);
  });

  showcaseNext.addEventListener('click', () => {
    renderCollectionShowcase(showcaseIndex + 1);
  });

  showcaseTabs.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    const index = Number(target.dataset.index);
    if (!Number.isFinite(index)) {
      return;
    }

    renderCollectionShowcase(index);
  });
};

const renderMenuList = (target, items) => {
  if (!target) {
    return;
  }

  target.innerHTML = items
    .map(
      (item, index) =>
        `<li><button type="button" class="mega-link${index === 0 ? ' active' : ''}">${item}</button></li>`
    )
    .join('');
};

const renderMegaCards = (cards) => {
  if (!megaCards) {
    return;
  }

  megaCards.innerHTML = cards
    .map(
      (card) => `
        <article class="mega-card">
          <div class="mega-card-image">
            <img src="${card.image}" alt="${card.name}" loading="lazy" />
          </div>
          <p>${card.name}</p>
        </article>
      `
    )
    .join('');
};

const renderMegaMenu = (menuKey) => {
  const menu = megaMenuData[menuKey];
  if (!menu) {
    return;
  }

  if (megaCollectionHeading) {
    megaCollectionHeading.textContent = menu.collectionLabel;
  }

  if (megaSuggestionHeading) {
    megaSuggestionHeading.textContent = menu.suggestionLabel;
  }

  if (megaTitle) {
    megaTitle.textContent = menu.title;
  }

  if (megaCta) {
    megaCta.textContent = menu.ctaText;
    megaCta.setAttribute('href', menu.ctaHref);
  }

  renderMenuList(megaCollectionList, menu.collections);
  renderMenuList(megaSuggestionList, menu.suggestions);
  renderMegaCards(menu.cards);
};

const setActiveTrigger = (menuKey) => {
  navTriggers.forEach((trigger) => {
    const isActive = trigger.dataset.menu === menuKey;
    trigger.classList.toggle('active', isActive);
    trigger.setAttribute('aria-expanded', String(isActive && !!activeMenuKey));
  });
};

const getIntroBoundary = () => (collection ? collection.offsetTop - 120 : 120);

const updateHeaderSurface = () => {
  if (!siteHeader) {
    return;
  }

  const inIntroZone = window.scrollY < getIntroBoundary();
  const shouldSolid = headerHovered || Boolean(activeMenuKey) || (!inIntroZone && showSolidHeaderInContent);

  siteHeader.classList.toggle('is-solid', shouldSolid);
};

const setIntroSnapMode = () => {
  if (!collection) {
    return;
  }

  const introBoundary = collection.offsetTop - 8;
  const inIntro = window.scrollY < introBoundary && !activeMenuKey;

  root.classList.toggle('intro-snap', inIntro);

  if (introProgress) {
    introProgress.classList.toggle('hidden', !inIntro);
  }
};

const setActiveBar = (index) => {
  progressBars.forEach((bar, idx) => {
    bar.classList.toggle('active', idx === index);
  });
};

const syncActiveBarWithScroll = () => {
  if (!introSlides.length || !progressBars.length) {
    return;
  }

  const pivot = window.scrollY + window.innerHeight * 0.5;
  let activeIndex = 0;

  introSlides.forEach((slide, idx) => {
    if (pivot >= slide.offsetTop) {
      activeIndex = idx;
    }
  });

  setActiveBar(activeIndex);
};

const closeMegaMenu = () => {
  if (!siteHeader || !megaMenu || !activeMenuKey) {
    activeMenuKey = '';
    setActiveTrigger('');
    return;
  }

  activeMenuKey = '';
  siteHeader.classList.remove('menu-open');
  megaMenu.setAttribute('aria-hidden', 'true');
  setActiveTrigger('');
  setIntroSnapMode();
  updateHeaderSurface();
};

const openMegaMenu = (menuKey) => {
  if (!siteHeader || !megaMenu || !megaMenuData[menuKey]) {
    return;
  }

  renderMegaMenu(menuKey);
  activeMenuKey = menuKey;
  siteHeader.classList.add('menu-open');
  megaMenu.setAttribute('aria-hidden', 'false');
  setActiveTrigger(menuKey);
  setIntroSnapMode();
  updateHeaderSurface();
};

const onScroll = () => {
  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;
  const inIntroZone = currentY < getIntroBoundary();

  if (Math.abs(delta) > 2) {
    if (inIntroZone) {
      showSolidHeaderInContent = false;
    } else if (delta < 0) {
      // Scrolling up: reveal solid header.
      showSolidHeaderInContent = true;
    } else {
      // Scrolling down: fade back to transparent header.
      showSolidHeaderInContent = false;
    }
  }

  lastScrollY = currentY;
  updateHeaderSurface();
  setIntroSnapMode();
  syncActiveBarWithScroll();
};

applyImageAssets();
initCollectionShowcase();
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => {
  if (!isDesktop()) {
    closeMegaMenu();
  }

  onScroll();
});

if (siteHeader) {
  siteHeader.addEventListener('mouseenter', () => {
    if (!isDesktop()) {
      return;
    }

    headerHovered = true;
    updateHeaderSurface();
  });

  siteHeader.addEventListener('mouseleave', () => {
    headerHovered = false;
    updateHeaderSurface();
  });
}

const mobileMenuTargets = {
  rings: '#collection',
  studio: '#craft',
  custom: '#quote',
  services: '#service',
  story: '#heritage'
};

navTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();

    const menuKey = trigger.dataset.menu;
    if (!menuKey) {
      return;
    }

    if (!isDesktop()) {
      const targetSelector = mobileMenuTargets[menuKey] || '#collection';
      const targetSection = document.querySelector(targetSelector);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (mainNav) {
        mainNav.classList.remove('open');
      }

      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }

      return;
    }

    if (activeMenuKey === menuKey) {
      closeMegaMenu();
      return;
    }

    openMegaMenu(menuKey);
  });

  trigger.addEventListener('mouseenter', () => {
    const menuKey = trigger.dataset.menu;
    if (!menuKey || !activeMenuKey || !isDesktop() || menuKey === activeMenuKey) {
      return;
    }

    openMegaMenu(menuKey);
  });
});

if (megaMenu) {
  megaMenu.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.classList.contains('mega-link')) {
      return;
    }

    const group = target.closest('.mega-list');
    if (!group) {
      return;
    }

    group.querySelectorAll('.mega-link').forEach((item) => item.classList.remove('active'));
    target.classList.add('active');
  });
}

document.addEventListener('click', (event) => {
  if (!activeMenuKey || !siteHeader) {
    return;
  }

  const target = event.target;
  if (target instanceof Node && !siteHeader.contains(target)) {
    closeMegaMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMegaMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => revealObserver.observe(el));

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

const setQuoteFeedback = (message, type = '') => {
  if (!quoteFeedback) {
    return;
  }

  quoteFeedback.textContent = message;
  quoteFeedback.classList.remove('success', 'error');
  if (type) {
    quoteFeedback.classList.add(type);
  }
};

if (quoteForm) {
  const deadlineInput = quoteForm.querySelector('input[name="deadline"]');
  if (deadlineInput instanceof HTMLInputElement) {
    deadlineInput.min = new Date().toISOString().slice(0, 10);
  }

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!quoteForm.checkValidity()) {
      quoteForm.reportValidity();
      setQuoteFeedback('필수 항목을 확인해 주세요.', 'error');
      return;
    }

    const formData = new FormData(quoteForm);
    const payload = Object.fromEntries(formData.entries());
    console.info('DAHO quote request:', payload);

    setQuoteFeedback('문의가 접수되었습니다. 1영업일 내 대호 팀이 회신드립니다.', 'success');
    quoteForm.reset();

    if (deadlineInput instanceof HTMLInputElement) {
      deadlineInput.min = new Date().toISOString().slice(0, 10);
    }
  });
}
