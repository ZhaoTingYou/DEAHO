// DAEHO Legacy / Credibility motion example
// Requires: gsap + ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

const ease = 'power3.out';

gsap.utils.toArray('.credibility-section').forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
      once: true
    }
  });

  tl.from(section.querySelectorAll('.js-title-line'), {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    ease,
    stagger: 0.1
  })
  .from(section.querySelectorAll('.js-copy'), {
    y: 24,
    opacity: 0,
    duration: 0.7,
    ease,
    stagger: 0.08
  }, '-=0.45')
  .from(section.querySelectorAll('.js-visual'), {
    scale: 0.96,
    y: 24,
    opacity: 0,
    duration: 1.0,
    ease,
    stagger: 0.12
  }, '-=0.35');
});

function animateCount(el, from, to, duration = 1.4) {
  const obj = { value: from };
  gsap.to(obj, {
    value: to,
    duration,
    ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(obj.value).toLocaleString(); }
  });
}
