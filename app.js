/* Sabrina Mouédine — interactions du portfolio */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

/* ---------- Provider vidéo (YouTube + Vimeo) ---------- */
function parseVideo(url) {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { provider: 'youtube', id: yt[1] };
  const vm = url.match(/vimeo\.com\/(?:video\/|channels\/[^/]+\/|groups\/[^/]+\/videos\/)?(\d+)/);
  if (vm) return { provider: 'vimeo', id: vm[1] };
  return null;
}
function videoThumb(parsed, custom) {
  if (custom) return custom;
  if (!parsed) return '';
  if (parsed.provider === 'youtube') return `https://i.ytimg.com/vi/${parsed.id}/hqdefault.jpg`;
  if (parsed.provider === 'vimeo')   return `https://vumbnail.com/${parsed.id}.jpg`;
  return '';
}
function videoEmbedUrl(parsed) {
  if (!parsed) return '';
  if (parsed.provider === 'youtube') return `https://www.youtube.com/embed/${parsed.id}?autoplay=1&rel=0`;
  if (parsed.provider === 'vimeo')   return `https://player.vimeo.com/video/${parsed.id}?autoplay=1`;
  return '';
}

/* ---------- Cards vidéos / projets ---------- */
function renderVideos(arr, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = arr.map((v, i) => {
    if (v.type === 'projet') {
      const cover = v.thumbnail || (v.videos && v.videos[0] && videoThumb(parseVideo(v.videos[0].videoUrl)));
      return `
      <article class="video-card video-card--projet" data-projet-idx="${i}" data-mount="${mountId}">
        <div class="video-thumb">
          <img src="${cover}" alt="${escapeHtml(v.title)}" loading="lazy">
          <div class="video-play" aria-hidden="true"></div>
          <span class="campaign-badge">Campagne · ${v.videos.length} vidéos</span>
        </div>
        <div class="video-meta">
          <span class="video-cat">${v.cat}</span>
          <h3 class="video-title">${escapeHtml(v.title)}</h3>
          ${v.client ? `<span class="video-client">${escapeHtml(v.client)}</span>` : ''}
          ${v.description ? `<p class="video-desc">${escapeHtml(v.description)}</p>` : ''}
        </div>
      </article>`;
    }
    const p = parseVideo(v.videoUrl);
    const thumb = videoThumb(p, v.thumbnail);
    return `
    <article class="video-card" data-video-url="${v.videoUrl || ''}" data-title="${escapeHtml(v.title)}">
      <div class="video-thumb">
        <img src="${thumb}" alt="${escapeHtml(v.title)}" loading="lazy">
        <div class="video-play" aria-hidden="true"></div>
      </div>
      <div class="video-meta">
        <span class="video-cat">${v.cat}</span>
        <h3 class="video-title">${escapeHtml(v.title)}</h3>
        ${v.client ? `<span class="video-client">${escapeHtml(v.client)}</span>` : ''}
        ${v.description ? `<p class="video-desc">${escapeHtml(v.description)}</p>` : ''}
      </div>
    </article>`;
  }).join('');

  $$('.video-card', mount).forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('video-card--projet')) {
        const idx = parseInt(card.dataset.projetIdx, 10);
        const list = card.dataset.mount === 'videosProGrid' ? window.VIDEOS_PRO : window.VIDEOS_PERSO;
        openLightbox({ type: 'projet', projet: list[idx] });
      } else {
        const url = card.dataset.videoUrl;
        const p = parseVideo(url);
        if (p) openLightbox({ type: 'video', parsed: p, caption: card.dataset.title });
      }
    });
  });
}

/* ---------- Autres grilles (inchangé) ---------- */
function renderMasonry(arr, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = arr.map((item, i) => {
    const isPdf = /\.pdf(\?|$)/i.test(item.src);
    if (isPdf) {
      return `
      <a class="masonry-item masonry-item--pdf" href="${item.src}" target="_blank" rel="noopener" data-title="${escapeHtml(item.title)}">
        <div class="pdf-cover">
          <object data="${item.src}#toolbar=0&navpanes=0&view=FitH" type="application/pdf"></object>
          <span class="pdf-flag">PDF</span>
          <span class="pdf-hover">Ouvrir le document ↗</span>
        </div>
        <div class="item-cap"><strong>${escapeHtml(item.title)}</strong><span>${item.kind}</span></div>
      </a>`;
    }
    return `
    <div class="masonry-item" data-img="${item.src}" data-title="${escapeHtml(item.title)}" data-index="${i}">
      <img src="${item.src}" alt="${escapeHtml(item.title)}" loading="lazy">
      <div class="item-cap"><strong>${escapeHtml(item.title)}</strong><span>${item.kind}</span></div>
    </div>`;
  }).join('');
  bindImageGroup(mount, arr);
}
function renderLogos(arr, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = arr.map((item, i) => `
    <div class="logo-card" data-img="${item.src}" data-title="${escapeHtml(item.title)}" data-index="${i}">
      <div class="logo-img"><img src="${item.src}" alt="${escapeHtml(item.title)}" loading="lazy"></div>
      <div class="item-cap"><strong>${escapeHtml(item.title)}</strong><span>${item.kind}</span></div>
    </div>`).join('');
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
    </article>`).join('');
  bindImageGroup(mount, arr);
}
function bindImageGroup(mount, arr) {
  $$('[data-img]', mount).forEach(el => {
    el.addEventListener('click', () => {
      openLightbox({ type: 'image', gallery: arr, index: parseInt(el.dataset.index, 10) });
    });
  });
}

/* ---------- Lightbox (image / video / projet) ---------- */
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
  lb.el.classList.toggle('lightbox--projet', state.type === 'projet');
  document.body.style.overflow = 'hidden';
  renderLightbox();
}
function closeLightbox() {
  lb.el.hidden = true;
  lb.el.classList.remove('lightbox--projet');
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
    lb.stage.innerHTML = `<iframe src="${videoEmbedUrl(s.parsed)}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    lb.cap.textContent = s.caption || '';
    return;
  }

  if (s.type === 'projet') {
    const p = s.projet;
    const playerId = 'projetPlayer';
    const initial = p.videos[0];
    const initialParsed = parseVideo(initial.videoUrl);
    lb.stage.innerHTML = `
      <div class="projet-wrap">
        <div class="projet-player">
          <iframe id="${playerId}" src="${videoEmbedUrl(initialParsed)}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
          <div class="projet-now">▶ <strong id="projetNowTitle">${escapeHtml(initial.title)}</strong></div>
        </div>
        <aside class="projet-side">
          <span class="projet-eyebrow">${escapeHtml(p.cat)} · ${escapeHtml(p.client)}</span>
          <h2 class="projet-title">${escapeHtml(p.title)}</h2>
          ${p.description ? `<p class="projet-desc">${escapeHtml(p.description)}</p>` : ''}
          ${p.context ? `<p class="projet-block"><strong>Contexte —</strong> ${escapeHtml(p.context)}</p>` : ''}
          ${p.approach ? `<p class="projet-block"><strong>Approche —</strong> ${escapeHtml(p.approach)}</p>` : ''}
          ${p.production ? `<p class="projet-block"><strong>Production —</strong> ${escapeHtml(p.production)}</p>` : ''}
          <div class="projet-grid">
            ${p.videos.map((v, i) => {
              const vp = parseVideo(v.videoUrl);
              return `<button class="projet-mini${i === 0 ? ' is-active' : ''}" data-idx="${i}">
                <img src="${videoThumb(vp, v.thumbnail)}" alt="${escapeHtml(v.title)}" loading="lazy">
                <span>${escapeHtml(v.title)}</span>
              </button>`;
            }).join('')}
          </div>
        </aside>
      </div>`;
    lb.cap.textContent = '';
    $$('.projet-mini', lb.stage).forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const v = p.videos[idx];
        const vp = parseVideo(v.videoUrl);
        $('#' + playerId).src = videoEmbedUrl(vp);
        $('#projetNowTitle').textContent = v.title;
        $$('.projet-mini', lb.stage).forEach(b => b.classList.toggle('is-active', b === btn));
      });
    });
    return;
  }

  const item = s.gallery[s.index];
  lb.stage.innerHTML = `<img src="${item.src}" alt="${escapeHtml(item.title)}">`;
  lb.cap.textContent = `${item.title} · ${item.kind || ''}`;
}

/* ---------- Formulaire + tabs ---------- */
function bindForm() {
  const f = $('#contactForm');
  if (!f) return;
  const status = $('#formStatus');
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const message = f.message.value.trim();
    if (!name || !email || !message) { status.textContent = 'Merci de remplir tous les champs requis.'; return; }
    status.textContent = 'Envoi en cours…';
    try {
      const res = await fetch(f.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(f) });
      const data = await res.json();
      if (data.success) { status.textContent = 'Message envoyé. Merci, je vous réponds vite !'; f.reset(); }
      else { status.textContent = 'Oups — ' + (data.message || 'envoi impossible. Réessayez.'); }
    } catch (err) { status.textContent = 'Erreur réseau. Réessayez ou écrivez-moi directement.'; }
  });
  document.querySelectorAll('.js-mail').forEach(a => {
    const addr = a.dataset.u + '@' + a.dataset.d;
    a.href = 'mailto:' + addr;
    a.textContent = addr;
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
