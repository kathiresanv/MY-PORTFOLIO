// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s) => document.querySelector(s);
  const nav = $('#nav'), menu = $('#menu'), burger = $('#burger'), topBtn = $('#top');

  $('#year').textContent = new Date().getFullYear();

  /* ---- Mobile menu ---- */
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    burger.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---- Scroll: nav border, back-to-top ---- */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    topBtn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Active nav link highlighting ---- */
  const links = [...menu.querySelectorAll('a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

  /* ---- Scroll reveal ---- */
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

  /* ---- Contact form validation ---- */
  const form = $('#form'), status = $('#status');
  const rules = {
    name: (v) => v.trim().length >= 2 || 'Enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
    subject: (v) => v.trim().length >= 3 || 'Enter a subject.',
    message: (v) => v.trim().length >= 10 || 'Write at least 10 characters.'
  };
  const check = (id) => {
    const input = $('#' + id), res = rules[id](input.value);
    $('#' + id + '-err').textContent = res === true ? '' : res;
    input.classList.toggle('invalid', res !== true);
    input.setAttribute('aria-invalid', res !== true);
    return res === true;
  };
  Object.keys(rules).forEach((id) => $('#' + id).addEventListener('blur', () => check(id)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) return;
    // No backend: open the visitor's email app with the message filled in.
    // For real delivery, replace this with a fetch() to Formspree / Netlify Forms.
    const body = `Name: ${$('#name').value}\nEmail: ${$('#email').value}\n\n${$('#message').value}`;
    window.location.href = `mailto:kathiresansjcetcse@gmail.com?subject=${encodeURIComponent($('#subject').value)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app…';
    form.reset();
  });
});
