// Helpers
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

// Año en footer
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Toggle de menú en mobile
const toggleBtn = $('.nav-toggle');
const nav = $('#site-nav');
if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(open));
  });
}

// Elevar header al hacer scroll
const header = document.querySelector('[data-elevate]');
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  if (header) {
    if (y > 8 && y > lastY) header.classList.add('elevated');
    if (y < 4) header.classList.remove('elevated');
  }
  lastY = y;
}, {passive:true});

// Scroll reveal (IntersectionObserver)
const io = ('IntersectionObserver' in window)
  ? new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, {threshold: 0.16})
  : null;

io && $$('.reveal').forEach(el => io.observe(el));

// Enlaces de contacto — PERSONALIZA AQUÍ
const CONTACT = {
  instagramUser: 'tu_usuario',
  whatsappNumberE164: '+5491100000000', // E.164
  email: 'tuemail@dominio.com'
};

// Construcción de URLs seguras
const ig = $('#link-instagram');
const wa = $('#link-whatsapp');
const mail = $('#link-email');

if (ig && CONTACT.instagramUser) {
  ig.href = `https://instagram.com/${encodeURIComponent(CONTACT.instagramUser)}`;
}
if (wa && CONTACT.whatsappNumberE164) {
  const digits = CONTACT.whatsappNumberE164.replace(/\D/g, '');
  wa.href = `https://wa.me/${digits}?text=${encodeURIComponent('Hola Luis, vi tu portafolio y me gustaría contactarte.')}`;
}
if (mail && CONTACT.email) {
  mail.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Consulta desde tu portafolio')}`;
}

// Tema (persistente). Por defecto oscura.
const themeToggle = $('#theme-toggle');
const lsKey = 'pref-theme';

function applyTheme(theme){ // 'light' | 'dark' | 'auto'
  document.documentElement.dataset.theme = theme;
}

(function initTheme(){
  const saved = localStorage.getItem(lsKey);
  applyTheme(saved || 'dark');
})();

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.dataset.theme || 'dark';
  const next = current === 'dark' ? 'light' : current === 'light' ? 'auto' : 'dark';
  applyTheme(next);
  localStorage.setItem(lsKey, next);
});

// Scroll suave para "volver arriba"
$$('[data-scroll]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href') || '#';
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
    }
  });
});
