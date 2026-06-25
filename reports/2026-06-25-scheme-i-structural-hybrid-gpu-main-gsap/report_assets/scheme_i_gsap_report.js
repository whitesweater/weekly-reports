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

  if (!window.gsap || prefersReduced) {
    if (progress) progress.style.width = '100%';
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (progress) {
    gsap.to(progress, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.25
      }
    });
  }
  gsap.timeline({defaults:{ease:'power3.out'}})
    .from('.topbar', {y: -20, duration: .5})
    .from('.eyebrow', {y: 12, duration: .45}, '-=.2')
    .from('.hero h1', {y: 28, duration: .75}, '-=.15')
    .from('.hero p,.hero-actions', {y: 18, duration: .55, stagger:.08}, '-=.35')
    .from('.report-map .map-row', {y: 16, duration: .55, stagger:.08}, '-=.35');

  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.from(el, {y: 18, duration: .55, ease: 'power3.out', scrollTrigger: {trigger: el, start: 'top 86%', once: true}});
  });

  document.querySelectorAll('.counter').forEach((el) => {
    const target = Number(el.dataset.count || 0);
    ScrollTrigger.create({trigger: el, start: 'top 88%', once: true, onEnter: () => {
      const state = {value: 0};
      gsap.to(state, {value: target, duration: 1, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(state.value); }});
    }});
  });

  gsap.set('.story-grid article,.story-callout', {y: 18, scale: .98});
  gsap.to('.story-callout,.story-grid article', {y: 0, scale: 1, duration: .45, stagger: .06, ease: 'power3.out', scrollTrigger: {trigger: '#story', start: 'top 76%', once: true}});

  gsap.set('.primer-summary article,.g02-step,.g02-flow>i', {y: 18, scale: .98});
  gsap.to('.primer-summary article,.g02-step,.g02-flow>i', {y: 0, scale: 1, duration: .45, stagger: .06, ease: 'power3.out', scrollTrigger: {trigger: '#g02-g04-primer', start: 'top 76%', once: true}});

  gsap.set('.arch-lane-title,.stable-arch .arch-node,.arch-arrow,.arch-down-arrow,.arch-explain-grid article', {y: 18, scale: .98});
  const archTl = gsap.timeline({
    defaults: {ease: 'power3.out'},
    scrollTrigger: {trigger: '#experiment-flow', start: 'top 70%', once: true}
  });
  archTl
    .to('.stable-arch .arch-lane-title', {y: 0, scale: 1, duration: .32, stagger: .12})
    .to('.data-node', {y: 0, scale: 1, duration: .45, stagger: .10}, '-=.2')
    .to('.data-row .arch-arrow', {y: 0, scale: 1, duration: .25, stagger: .08}, '-=.35')
    .to('.arch-down-arrow', {y: 0, scale: 1, duration: .28, stagger: .10}, '-=.05')
    .to('.base-node', {y: 0, scale: 1, duration: .5}, '-=.25')
    .to('.branch-node', {y: 0, scale: 1, duration: .42, stagger: .08}, '-=.15')
    .to('.fusion-node,.output-row .arch-arrow,.eval-node', {y: 0, scale: 1, duration: .42, stagger: .10}, '-=.05')
    .to('.arch-explain-grid article', {y: 0, scale: 1, duration: .36, stagger: .08}, '-=.05');
  gsap.from('.bar-track i', {scaleX: 0, duration: .9, ease: 'power3.out', stagger: .08, scrollTrigger: {trigger: '.bars', start: 'top 85%', once: true}});
})();
