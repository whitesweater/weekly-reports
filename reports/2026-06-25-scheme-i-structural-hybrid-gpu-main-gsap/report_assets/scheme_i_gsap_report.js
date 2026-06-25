(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rows = Array.from(document.querySelectorAll('#resultTable tbody tr'));
  const variantCards = Array.from(document.querySelectorAll('.variant-card'));
  const heatCells = Array.from(document.querySelectorAll('.heat-cell'));
  const filterButtons = Array.from(document.querySelectorAll('#filters button'));
  const progress = document.querySelector('#scroll-progress');

  function setFilter(variant) {
    filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.variant === variant));
    const all = variant === 'all';
    [...rows, ...variantCards, ...heatCells, ...document.querySelectorAll('.bar-row')].forEach(el => {
      const active = all || el.dataset.variant === variant;
      el.classList.toggle('is-dimmed', !active);
    });
    if (window.gsap && !prefersReduced) {
      gsap.fromTo(rows.filter(r => all || r.dataset.variant === variant), {x: 16, autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: .35, stagger: .015, ease: 'power2.out'});
    }
  }

  filterButtons.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.variant)));
  variantCards.forEach(card => card.addEventListener('click', () => setFilter(card.dataset.variant)));
  heatCells.forEach(cell => cell.addEventListener('click', () => setFilter(cell.dataset.variant)));

  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? scrollY / max * 100 : 0;
    progress.style.width = `${pct}%`;
  }
  addEventListener('scroll', updateProgress, {passive:true});
  addEventListener('resize', updateProgress); updateProgress();

  if (!window.gsap || prefersReduced) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.set('.reveal', {autoAlpha: 0, y: 24});
  gsap.timeline({defaults:{ease:'power3.out'}})
    .from('.topbar', {y: -20, autoAlpha: 0, duration: .5})
    .from('.eyebrow', {y: 12, autoAlpha: 0, duration: .45}, '-=.2')
    .from('.hero h1', {y: 28, autoAlpha: 0, duration: .75}, '-=.15')
    .from('.hero p,.hero-actions', {y: 18, autoAlpha: 0, duration: .55, stagger:.08}, '-=.35')
    .from('.orb', {scale: .4, autoAlpha: 0, duration: 1.2, stagger:.12}, '-=.65')
    .from('.ring', {scale: .75, rotate: -12, autoAlpha: 0, duration: .8}, '-=.8');

  gsap.to('.orb-a', {x: 22, y: -18, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'});
  gsap.to('.orb-b', {x: -18, y: 26, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut'});
  gsap.to('.orb-c', {x: 28, y: 18, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut'});
  gsap.to('.ring', {rotate: 360, duration: 42, repeat: -1, ease: 'none'});

  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.to(el, {autoAlpha: 1, y: 0, duration: .65, ease: 'power3.out', scrollTrigger: {trigger: el, start: 'top 86%', once: true}});
  });

  document.querySelectorAll('.counter').forEach((el) => {
    const target = Number(el.dataset.count || 0);
    ScrollTrigger.create({trigger: el, start: 'top 88%', once: true, onEnter: () => {
      const state = {value: 0};
      gsap.to(state, {value: target, duration: 1, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(state.value); }});
    }});
  });

  gsap.set('.story-grid article,.story-callout', {autoAlpha: 0, y: 18, scale: .98});
  gsap.to('.story-callout,.story-grid article', {autoAlpha: 1, y: 0, scale: 1, duration: .45, stagger: .06, ease: 'power3.out', scrollTrigger: {trigger: '#story', start: 'top 76%', once: true}});

  gsap.set('.primer-summary article,.g02-step,.g02-flow>i', {autoAlpha: 0, y: 18, scale: .98});
  gsap.to('.primer-summary article,.g02-step,.g02-flow>i', {autoAlpha: 1, y: 0, scale: 1, duration: .45, stagger: .06, ease: 'power3.out', scrollTrigger: {trigger: '#g02-g04-primer', start: 'top 76%', once: true}});

  gsap.set('.arch-lane-title,.stable-arch .arch-node,.arch-arrow,.arch-down-arrow,.arch-explain-grid article', {autoAlpha: 0, y: 18, scale: .98});
  const archTl = gsap.timeline({
    defaults: {ease: 'power3.out'},
    scrollTrigger: {trigger: '#experiment-flow', start: 'top 70%', once: true}
  });
  archTl
    .to('.stable-arch .arch-lane-title', {autoAlpha: 1, y: 0, scale: 1, duration: .32, stagger: .12})
    .to('.data-node', {autoAlpha: 1, y: 0, scale: 1, duration: .45, stagger: .10}, '-=.2')
    .to('.data-row .arch-arrow', {autoAlpha: 1, y: 0, scale: 1, duration: .25, stagger: .08}, '-=.35')
    .to('.arch-down-arrow', {autoAlpha: 1, y: 0, scale: 1, duration: .28, stagger: .10}, '-=.05')
    .to('.base-node', {autoAlpha: 1, y: 0, scale: 1, duration: .5}, '-=.25')
    .to('.branch-node', {autoAlpha: 1, y: 0, scale: 1, duration: .42, stagger: .08}, '-=.15')
    .to('.fusion-node,.output-row .arch-arrow,.eval-node', {autoAlpha: 1, y: 0, scale: 1, duration: .42, stagger: .10}, '-=.05')
    .to('.arch-explain-grid article', {autoAlpha: 1, y: 0, scale: 1, duration: .36, stagger: .08}, '-=.05');
  gsap.to('.stable-arch .arch-arrow', {x: 6, duration: .8, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: .08});
  gsap.to('.arch-down-arrow', {y: 4, duration: .9, repeat: -1, yoyo: true, ease: 'sine.inOut'});
  gsap.to('.fusion-ring', {rotation: 360, scale: 1.08, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut'});

  gsap.from('.bar-track i', {scaleX: 0, duration: .9, ease: 'power3.out', stagger: .08, scrollTrigger: {trigger: '.bars', start: 'top 85%', once: true}});
})();
