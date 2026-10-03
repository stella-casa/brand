document.addEventListener('DOMContentLoaded', () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const logoAssets = { incastro: { symbol: 'assets/simbolo-incastro.png', lockup: 'assets/logo-incastro.png' } };
  let selectedLogo = 'incastro';
  const paintLogo = value => {
    selectedLogo = 'incastro';
    document.documentElement.dataset.brand = selectedLogo;
    document.querySelectorAll('[data-brand-kind]').forEach(image => { image.src = logoAssets[selectedLogo][image.dataset.brandKind] || logoAssets[selectedLogo].symbol; });
    document.querySelectorAll('[data-brand-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.brandChoice === selectedLogo)));
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) return;
      try { const url = new URL(href, location.href); if (url.origin === location.origin) { link.href = url.href; } } catch (_) {}
    });
  };
  paintLogo(selectedLogo);
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.intro-hero');
  const heroImage = document.querySelector('.hero-image');
  const copy = document.querySelector('.hero-copy');
  let scrollFrame = 0;

  const updateScroll = () => {
    const y = window.scrollY || 0;
    if (header) {
      if (document.body.dataset.page === 'home') {
        const mobile = innerWidth <= 800;
        const p = reduced ? (y > 100 ? 1 : 0) : Math.max(0, Math.min(1, (y - 12) / 220));
        const startWidth = innerWidth; const endWidth = Math.min(1100, innerWidth - (mobile ? 20 : 32));
        const width = startWidth + (endWidth - startWidth) * p;
        const startGutter = mobile ? 20 : Math.min(76, Math.max(22, innerWidth * .05));
        header.style.setProperty('--header-progress', p.toFixed(3));
        header.style.top = `${(mobile ? 8 : 12) * p}px`;
        header.style.left = `${(innerWidth - width) / 2}px`;
        header.style.width = `${width}px`;
        header.style.height = `${(mobile ? 72 : 88) - (mobile ? 12 : 24) * p}px`;
        header.style.transform = 'none';
        header.style.paddingLeft = `${startGutter * (1 - p) + (mobile ? 19 : 26) * p}px`;
        header.style.paddingRight = header.style.paddingLeft;
        header.style.borderRadius = `${48 * p}px`;
        header.style.backgroundColor = `rgba(255,243,231,${.96 * p})`;
        header.style.boxShadow = `0 10px 35px rgba(40,28,45,${.12 * p})`;
        header.style.backdropFilter = `blur(${14 * p}px)`;
        header.classList.toggle('is-scrolled', p > .5);
      } else header.classList.toggle('is-scrolled', y > 28);
    }
    if (hero && copy) {
      const p = Math.min(1, Math.max(0, y / Math.max(1, hero.offsetHeight)));
      hero.style.setProperty('--hero-progress', p.toFixed(3));
      copy.style.setProperty('--copy-y', `${-Math.min(32, p * 60)}px`);
      copy.style.setProperty('--copy-opacity', String(Math.max(0, 1 - p * 1.45)));
      if (heroImage) heroImage.style.setProperty('--scroll-scale', (1 - .04 * p).toFixed(3));
    }
    scrollFrame = 0;
  };
  const queueScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
  window.addEventListener('scroll', queueScroll, { passive: true });
  window.addEventListener('resize', queueScroll);
  updateScroll();

  const motion = document.querySelector('.motion-toggle');
  motion?.addEventListener('click', () => {
    const paused = motion.getAttribute('aria-pressed') === 'true';
    motion.setAttribute('aria-pressed', String(!paused));
    motion.setAttribute('aria-label', paused ? 'Ferma animazione' : 'Avvia animazione');
    motion.querySelector('.motion-label').textContent = paused ? 'Ferma animazione' : 'Avvia animazione';
    document.body.classList.toggle('motion-paused', !paused);
  });

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mobileNav.hidden = open;
      menuButton.textContent = open ? 'Menu' : 'Chiudi';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false'); mobileNav.hidden = true; menuButton.textContent = 'Menu';
    }));
  }

  if (!document.querySelector('.project-toggle')) {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'project-toggle'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'project-panel');
    btn.innerHTML = '<img class="project-toggle-mark" data-brand-kind="symbol" src="assets/simbolo-incastro.png" alt=""><span>Esplora il progetto</span>';
    document.body.append(btn);
    const panel = document.createElement('aside'); panel.className = 'project-panel'; panel.id = 'project-panel'; panel.hidden = true;
    panel.setAttribute('aria-label', 'Altre superfici della proposta');
    panel.innerHTML = '<div class="project-panel-head"><span>Studio / stella.casa</span><button type="button" class="project-close" aria-label="Chiudi pannello">×</button></div><a href="index.html">Proprietari <span>pagina di acquisizione</span></a><a href="instagram.html">Instagram <span>feed</span></a><a href="facebook.html">Facebook <span>pagina e post</span></a><a href="lettere.html">Substack <span>Lettere da casa</span></a><a href="diario.html">Diario <span>guide e articoli</span></a><a href="casa.html">Stella sul Mare <span>scheda e richiesta</span></a><a href="illustrazioni.html">Illustrazioni <span>due famiglie, un accento</span></a>';
    document.body.append(panel);
  }
  document.querySelectorAll('[data-brand-choice]').forEach(button => button.addEventListener('click', () => paintLogo(button.dataset.brandChoice)));
  paintLogo(selectedLogo);
  const projectToggle = document.querySelector('.project-toggle');
  const projectPanel = document.querySelector('.project-panel');
  const close = document.querySelector('.project-close');
  const setPanel = open => { if (!projectToggle || !projectPanel) return; projectToggle.setAttribute('aria-expanded', String(open)); projectPanel.hidden = !open; };
  projectToggle?.addEventListener('click', () => setPanel(projectToggle.getAttribute('aria-expanded') !== 'true'));
  close?.addEventListener('click', () => setPanel(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setPanel(false); });

  const form = document.querySelector('#owner-form');
  const result = document.querySelector('#form-result');
  form?.addEventListener('submit', e => {
    e.preventDefault(); const v = new FormData(form); const name = String(v.get('nome') || '').trim();
    const place = String(v.get('comune') || '').trim(); const size = String(v.get('metri') || '').trim();
    const email = String(v.get('email') || '').trim(); const link = String(v.get('annuncio') || '').trim();
    result.textContent = `${name}, ecco il riepilogo della casa a ${place}: ${size} m². Email indicata: ${email}.${link ? ' Hai aggiunto un link all’annuncio.' : ''} Questa anteprima resta sul dispositivo e non è stata inviata.`; result.hidden = false;
  });
  const subscribe = document.querySelector('#subscribe-form');
  const subscribeResult = document.querySelector('#subscribe-result');
  subscribe?.addEventListener('submit', e => { e.preventDefault(); subscribeResult.textContent = 'Iscrizione di prova: non è stato inviato né salvato nulla.'; subscribeResult.hidden = false; });

  const pilotTrack = document.querySelector('.pilot-track');
  const pilotSlides = [...(pilotTrack?.querySelectorAll('.pilot-slide') || [])];
  const slideCount = document.querySelector('.pilot-count');
  let pilotIndex = 0;
  const updatePilotIndex = () => {
    if (!pilotTrack || !pilotSlides.length) return;
    const stepWidth = pilotSlides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(pilotTrack).gap || '0');
    pilotIndex = Math.max(0, Math.min(pilotSlides.length - 1, Math.round(pilotTrack.scrollLeft / stepWidth)));
    if (slideCount) slideCount.textContent = `${pilotIndex + 1} / ${pilotSlides.length}`;
  };
  document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => {
    if (!pilotTrack || !pilotSlides.length) return;
    const next = Math.max(0, Math.min(pilotSlides.length - 1, pilotIndex + (button.dataset.slide === 'next' ? 1 : -1)));
    pilotTrack.scrollTo({ left: pilotSlides[next].offsetLeft - pilotSlides[0].offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
    pilotIndex = next;
    if (slideCount) slideCount.textContent = `${pilotIndex + 1} / ${pilotSlides.length}`;
  }));
  pilotTrack?.addEventListener('scroll', () => requestAnimationFrame(updatePilotIndex), { passive: true });

  const track = document.querySelector('#process-track');
  const stage = document.querySelector('.process-stage');
  const scenes = [...document.querySelectorAll('.process-scene')];
  const steps = [...document.querySelectorAll('.process-step')];
  const jumps = [...document.querySelectorAll('[data-jump]')];
  if (track && stage && scenes.length > 1) {
    const nav = document.querySelector('.process-jumps');
    if (nav) stage.append(nav);
    const last = scenes.length - 1;
    const stepDuration = 820;
    let on = false;
    let current = 0;
    let animating = false;
    let animTimer = 0;
    let lastWheel = 0;
    let lastDelta = 0;
    let stepAt = 0;
    let gestureUsed = false;
    let wheelSum = 0;
    let touchY = null;
    track.style.setProperty('--steps', String(scenes.length));

    const geometry = () => {
      const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
      const start = track.getBoundingClientRect().top + scrollY - stickyTop;
      const travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
      return { start, end: start + travel, travel };
    };
    const anchor = i => { const g = geometry(); return g.start + g.travel * (i / last); };
    const inside = () => { const g = geometry(); return scrollY >= g.start - 2 && scrollY <= g.end + 2; };
    const indexFromScroll = () => { const g = geometry(); return Math.round(Math.max(0, Math.min(1, (scrollY - g.start) / g.travel)) * last); };

    const render = (next, animate) => {
      const previous = current;
      current = Math.max(0, Math.min(last, next));
      const moving = animate && previous !== current;
      scenes.forEach((scene, i) => {
        const involved = moving && (i === previous || i === current);
        scene.classList.toggle('no-anim', !involved);
        scene.style.setProperty('--y', i === current ? '0%' : i < current ? '-100%' : '100%');
        steps[i].classList.toggle('is-current', i === current);
        steps[i].classList.toggle('is-leaving', involved && i === previous);
        steps[i].setAttribute('aria-hidden', String(i !== current));
        steps[i].inert = i !== current;
      });
      jumps.forEach((a, i) => i === current ? a.setAttribute('aria-current', 'step') : a.removeAttribute('aria-current'));
      if (moving) {
        animating = true;
        stepAt = performance.now();
        clearTimeout(animTimer);
        animTimer = setTimeout(() => { animating = false; steps.forEach(step => step.classList.remove('is-leaving')); }, stepDuration);
      }
    };
    const go = next => {
      next = Math.max(0, Math.min(last, next));
      if (next === current) return;
      render(next, true);
      window.scrollTo({ top: anchor(next), behavior: 'instant' });
      zone = 'inside';
    };

    const setLayout = () => {
      const next = innerWidth > 800 && !reduced;
      if (next !== on) {
        on = next;
        document.body.classList.toggle('process-stepper', on);
        if (!on) {
          scenes.forEach(scene => { scene.classList.remove('no-anim'); scene.style.removeProperty('--y'); });
          steps.forEach(step => { step.classList.remove('is-current', 'is-leaving'); step.removeAttribute('aria-hidden'); step.inert = false; });
          jumps.forEach((a, i) => i ? a.removeAttribute('aria-current') : a.setAttribute('aria-current', 'step'));
          return;
        }
      }
      if (on) { zone = zoneOf(); render(indexFromScroll(), false); }
    };

    let zone = 'above';
    const zoneOf = () => { const g = geometry(); return scrollY < g.start - 2 ? 'above' : scrollY > g.end + 2 ? 'below' : 'inside'; };
    let lockUntil = 0;
    const enter = from => {
      const g = geometry();
      const now = performance.now();
      gestureUsed = true; wheelSum = 0; lastWheel = now; stepAt = now; lockUntil = now + 700;
      render(from === 'above' ? 0 : last, false);
      window.scrollTo({ top: from === 'above' ? g.start : g.end, behavior: 'instant' });
      zone = 'inside';
    };
    window.addEventListener('wheel', e => {
      if (!on || !e.deltaY) return;
      const g = geometry();
      if (!inside()) {
        const target = scrollY + e.deltaY;
        if (scrollY < g.start && target >= g.start) { e.preventDefault(); enter('above'); }
        else if (scrollY > g.end && target <= g.end) { e.preventDefault(); enter('below'); }
        return;
      }
      const dir = Math.sign(e.deltaY);
      const now = performance.now();
      const size = Math.abs(e.deltaY);
      const fresh = now > lockUntil && (now - lastWheel > 200 || (now - stepAt > stepDuration + 150 && size > lastDelta * 2 && size > 20));
      lastWheel = now; lastDelta = size;
      if (fresh) { gestureUsed = false; wheelSum = 0; }
      const edge = (dir > 0 && current === last) || (dir < 0 && current === 0);
      if (edge && !animating && !gestureUsed) return;
      e.preventDefault();
      if (animating || gestureUsed) return;
      wheelSum += e.deltaY;
      if (Math.abs(wheelSum) < 24) return;
      gestureUsed = true; wheelSum = 0;
      go(current + dir);
    }, { passive: false });

    window.addEventListener('touchstart', e => { touchY = on && inside() ? e.touches[0].clientY : null; }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (touchY === null) return;
      const dir = Math.sign(touchY - e.touches[0].clientY);
      const edge = (dir > 0 && current === last) || (dir < 0 && current === 0);
      if (!edge || animating) e.preventDefault();
    }, { passive: false });
    window.addEventListener('touchend', e => {
      if (touchY === null || performance.now() < lockUntil) { touchY = null; return; }
      const dy = touchY - e.changedTouches[0].clientY; touchY = null;
      if (Math.abs(dy) > 40 && !animating) go(current + Math.sign(dy));
    });

    document.addEventListener('keydown', e => {
      if (!on || !inside() || e.target.closest('input, textarea, select, [contenteditable]')) return;
      const dir = ['ArrowDown', 'PageDown', ' '].includes(e.key) ? (e.shiftKey && e.key === ' ' ? -1 : 1) : ['ArrowUp', 'PageUp'].includes(e.key) ? -1 : 0;
      if (!dir) return;
      const edge = (dir > 0 && current === last) || (dir < 0 && current === 0);
      if (edge) return;
      e.preventDefault();
      if (!animating) go(current + dir);
    });

    window.addEventListener('scroll', () => {
      if (!on) return;
      const now = zoneOf();
      if (now === 'inside' && zone !== 'inside') { enter(zone); return; }
      zone = now;
      if (animating) return;
      const g = geometry();
      if (scrollY < g.start) { if (current !== 0) render(0, false); return; }
      if (scrollY > g.end) { if (current !== last) render(last, false); return; }
      if (performance.now() - lastWheel < 250) return;
      const raw = (scrollY - g.start) / g.travel * last;
      if (Math.abs(raw - current) > .6) render(Math.round(raw), true);
    }, { passive: true });

    jumps.forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      const index = Number(a.dataset.jump);
      if (!on) { scenes[index]?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' }); return; }
      go(index);
    }));
    window.addEventListener('resize', setLayout);
    setLayout();
  }

  document.querySelectorAll('[data-social-action]').forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.socialAction;
    const result = button.closest('.fb-post')?.querySelector('.fb-action-result');
    if (kind === 'like') {
      const liked = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!liked)); button.querySelector('span').textContent = liked ? 'Mi piace' : 'Ti piace';
      button.firstChild.textContent = liked ? '♡ ' : '♥ ';
      if (result) { result.textContent = 'Interazione di anteprima, visibile solo qui.'; result.hidden = false; }
    } else if (result) {
      result.textContent = kind === 'comment' ? 'Commenti disattivati nell’anteprima.' : 'La condivisione non è stata pubblicata.';
      result.hidden = false;
    }
  }));

  const propertyTrack = document.querySelector('.property-gallery-track');
  const propertySlides = [...(propertyTrack?.querySelectorAll('.property-slide') || [])];
  let propertyIndex = 0;
  document.querySelectorAll('[data-gallery-slide]').forEach(button => button.addEventListener('click', () => {
    if (!propertyTrack || !propertySlides.length) return;
    propertyIndex = Math.max(0, Math.min(propertySlides.length - 1, propertyIndex + (button.dataset.gallerySlide === 'next' ? 1 : -1)));
    propertyTrack.scrollTo({ left: propertySlides[propertyIndex].offsetLeft - propertySlides[0].offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
  }));
  propertyTrack?.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      if (!propertySlides.length) return;
      const lefts = propertySlides.map(slide => Math.abs(slide.offsetLeft - propertyTrack.scrollLeft));
      propertyIndex = lefts.indexOf(Math.min(...lefts));
    });
  }, { passive: true });

  const requestForm = document.querySelector('#reservation-request');
  const reservationResult = document.querySelector('#reservation-result');
  const arrivalInput = requestForm?.querySelector('[name="arrivo"]');
  const departureInput = requestForm?.querySelector('[name="partenza"]');
  if (arrivalInput && departureInput) {
    const today = new Date(); const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    arrivalInput.min = localToday; departureInput.min = localToday;
    arrivalInput.addEventListener('change', () => {
      if (!arrivalInput.value) return;
      const nextDate = new Date(`${arrivalInput.value}T12:00:00`); nextDate.setDate(nextDate.getDate() + 1);
      const nextIso = new Date(nextDate.getTime() - nextDate.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      departureInput.min = nextIso;
      if (departureInput.value && departureInput.value <= arrivalInput.value) departureInput.value = '';
    });
  }
  requestForm?.addEventListener('submit', e => {
    e.preventDefault(); const data = new FormData(requestForm);
    const arrival = String(data.get('arrivo') || ''); const departure = String(data.get('partenza') || '');
    const guests = Number(data.get('ospiti') || 1);
    if (!arrival || !departure || departure <= arrival) { reservationResult.textContent = 'Scegli una data di partenza successiva all’arrivo.'; reservationResult.hidden = false; return; }
    const nights = Math.round((new Date(`${departure}T12:00:00`) - new Date(`${arrival}T12:00:00`)) / 86400000);
    const fmt = value => new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
    reservationResult.innerHTML = `<strong>Riepilogo locale</strong><span>${fmt(arrival)} → ${fmt(departure)} · ${nights} ${nights === 1 ? 'notte' : 'notti'} · ${guests} ${guests === 1 ? 'ospite' : 'ospiti'}</span><span>Disponibilità e prezzo da confermare con stella.casa. Il riepilogo non è stato inviato.</span>`;
    reservationResult.hidden = false;
  });
});
