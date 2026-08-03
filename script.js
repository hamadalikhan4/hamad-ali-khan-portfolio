const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-navigation');
const navigationLinks = [...document.querySelectorAll('#site-navigation a')];
const sections = [...document.querySelectorAll('section[id]')];
const revealElements = document.querySelectorAll('.reveal');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  menuButton.classList.toggle('is-open', !isOpen);
  navigation?.classList.toggle('is-open', !isOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    menuButton?.classList.remove('is-open');
    navigation?.classList.remove('is-open');
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

  if (!visible) return;
  navigationLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-30% 0px -60%', threshold: [0.05, 0.2, 0.5] });

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealElements.forEach((element) => revealObserver.observe(element));

const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());
