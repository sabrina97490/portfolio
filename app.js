/* Sabrina Mouédine — interactions du portfolio */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const ytThumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

function renderVideos(arr, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = arr.map(v => `
    <article class="video-card" data-video-id="${v.youtubeId}" data-title="${escapeHtml(v.title)}">
      <div class="video-thumb">
        <img src="${ytThumb(v.youtubeId)}" alt="${escapeHtml(v.title)}" loading="lazy">
        <div class="video-play" aria-hidden="true"></div>
      </div>
      <div class="video-meta">
        <span class="video-cat">${v.cat}</span>
        <h3 class="video-title">${escapeHtml(v.title)}</h3>
        ${v.client ? `<span class="video-client">${escapeHtml(v.client)}</span>` : ''}
      </div>
    </article>
  `).join('');

  $$('.video-card', mount).forEach(card => {
    card.addEventListener('click', () => {
      openLightbox({ type: 'video', videoId: card.dataset.videoId, caption: card.dataset.title });
    });
  });
}

function renderMasonry(arr, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = arr.map((item, i) => `
    <div class="masonry-item" data-img="${item.src}" data-title="${escapeHtml(item.title)}" data-index="${i}">
      <img src="${item.src}" alt="${escapeHtml(item.title)}" loading="lazy">
      <div class="item-cap"><strong>${escapeHtml(item.title)}</strong><span>${item.kind}</span></div>
    </div>
  `).join('');
  bindImageGroup(mount, arr);
}

function renderLogos(arr, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = arr.map((item, i) => `
    <div class="logo-card" data-img="${item.src}" data-title="${escapeHtml(item.title)}" data-index="${i}">
      <div class="logo-img"><img src="${item.src}" alt="${escapeHtml(item.title)}" loading="lazy"></div>
      <div class="item-cap"><strong>${escapeHtml(item.title)}</strong><span>${item.kind}</span></div>
    </div>
  `).join('');
  bindImageGroup(mount, arr);
}

function renderSites(arr, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = arr.map((s, i) => `
    <article class="site-card" data-img="${s.src}" data-title="${escapeHtml(s.title)}" data-index="${i}">
      <div class="site-frame">
        <div class="site-dots"><span></span><span></span><span></span></div>
        <span class="site-url">${escapeHtml(s.url)}</span>
        <span style="width:48px"></span>
      </div>
      <div class="site-shot"><img src="${s.src}" alt="${escapeHtml(s.title)}" loading="lazy"></div>
      <div class="site-meta">
        <h3 class="site-title">${escapeHtml(s.title)}</h3>
        <span class="site-stack">${escapeHtml(s.stack)}</span>
      </div>
    </article>
  `).join('');
  bindImageGroup(mount, arr);
}

function bindImageGroup(mount, arr) {
  $$('[data-img]', mount).forEach(el => {
    el.addEventListener('click', () => {
      openLightbox({ type: 'image', gallery: arr, index: parseInt(el.dataset.index, 10) });
    });
  });
}

const lb = { el: null, stage: null, cap: null, state: null };
function initLightbox() {
  lb.el = $('#lightbox');
  lb.stage = $('.lb-stage', lb.el);
  lb.cap = $('.lb-caption', lb.el);
  $('.lb-close', lb.el).addEventListener('click', closeLightbox);
  $('.lb-prev',  lb.el).addEventListener('click', () => navLightbox(-1));
  $('.lb-next',  lb.el).addEventListener('click', () => navLightbox(+1));
  lb.el.addEventListener('click', e => { if (e.target === lb.el) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (lb.el.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(+1);
  });
}
function openLightbox(state) {
  lb.state = state;
  lb.el.hidden = false;
  document.body.style.overflow = 'hidden';
  renderLightbox();
}
function closeLightbox() {
  lb.el.hidden = true;
  lb.stage.innerHTML = '';
  document.body.style.overflow = '';
}
function navLightbox(dir) {
  if (!lb.state || lb.state.type !== 'image') return;
  const len = lb.state.gallery.length;
  lb.state.index = (lb.state.index + dir + len) % len;
  renderLightbox();
}
function renderLightbox() {
  const s = lb.state;
  const showNav = s.type === 'image';
  $('.lb-prev', lb.el).style.display = showNav ? '' : 'none';
  $('.lb-next', lb.el).style.display = showNav ? '' : 'none';
  if (s.type === 'video') {
    lb.stage.innerHTML = `<iframe src="https://www.youtube.com/embed/${s.videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    lb.cap.textContent = s.caption || '';
  } else {
    const item = s.gallery[s.index];
    lb.stage.innerHTML = `<img src="${item.src}" alt="${escapeHtml(item.title)}">`;
    lb.cap.textContent = `${item.title} · ${item.kind || ''}`;
  }
}

function bindForm() {
  const f = $('#contactForm');
  if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const subject = f.subject.value.trim() || 'Contact via portfolio';
    const message = f.message.value.trim();
    if (!name || !email || !message) {
      $('#formStatus').textContent = 'Merci de remplir tous les champs requis.';
      return;
    }
    const body = `Nom: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:sabrina.mouedine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('#formStatus').textContent = 'Ouverture de votre application mail…';
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function bindTabs() {
  $$('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      $$('.tab').forEach(b => b.classList.toggle('active', b === btn));
      $$('[data-tab-panel]').forEach(p => p.classList.toggle('hidden', p.dataset.tabPanel !== target));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  renderVideos(window.VIDEOS_PRO, 'videosProGrid');
  renderVideos(window.VIDEOS_PERSO, 'videosPersoGrid');
  renderMasonry(window.AFFICHES, 'affichesGrid');
  renderLogos(window.LOGOS, 'logosGrid');
  renderSites(window.SITES, 'sitesGrid');
  bindForm();
  bindTabs();
});
