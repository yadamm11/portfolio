(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise(r => setTimeout(r, reduced ? 0 : ms));
  const photos = typeof PHOTOS !== "undefined" ? PHOTOS : [];
  const videos = typeof VIDEOS !== "undefined" ? VIDEOS : [];

  // Bildquelle: Pexels-ID (automatisch passende Grösse) oder eigener Pfad
  const PX = (id, w) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
  const srcOf = (p, w) => p.pexels ? PX(p.pexels, w) : p.src;
  const srcsetOf = (p) => p.pexels ? [500, 800, 1200, 1600].map(w => `${PX(p.pexels, w)} ${w}w`).join(", ") : "";

  /* ---------- Reveal beim Scrollen ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 })
    : null;
  const observe = (el) => io ? io.observe(el) : el.classList.add("is-visible");

  /* ---------- Fotos ---------- */
  const gallery = $("#gallery");
  $("#photoCount").textContent = `${photos.length} ${photos.length === 1 ? "bild" : "bilder"}`;
  photos.forEach((p, i) => {
    const li = document.createElement("li");
    li.className = "reveal";
    li.innerHTML = `
      <button class="tile" type="button" aria-label="bild ${i + 1} öffnen: ${escapeHtml(p.title || p.alt || "")}">
        <div class="tile__media"><img src="${srcOf(p, 1200)}" ${p.pexels ? `srcset="${srcsetOf(p)}" sizes="(max-width:560px) 92vw, (max-width:1100px) 46vw, 31vw"` : ""} alt="${escapeHtml(p.alt || "")}" loading="lazy" decoding="async"></div>
        ${p.title ? `<div class="tile__caption"><span>${escapeHtml(p.title)}</span><span class="tile__index">${String(i + 1).padStart(2, "0")}</span></div>` : ""}
      </button>`;
    li.querySelector("img").addEventListener("error", (e) => { e.currentTarget.style.visibility = "hidden"; });
    li.querySelector("button").addEventListener("click", (e) => openLightbox(i, e.currentTarget));
    gallery.appendChild(li);
    observe(li);
  });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCaption"), lbCount = $("#lbCounter");
  let current = 0, lastFocus = null, busy = false;

  function setImage(i) {
    const p = photos[i];
    lbImg.classList.remove("is-ready");
    lbImg.onload = () => requestAnimationFrame(() => lbImg.classList.add("is-ready"));
    lbImg.src = srcOf(p, lightboxWidth());
    lbImg.alt = p.alt || "";
    if (lbImg.complete) lbImg.onload();
    lbCap.textContent = p.title || "";
    lbCount.textContent = `${i + 1} / ${photos.length}`;
    // Nachbarn vorladen
    [i - 1, i + 1].forEach(n => { const q = photos[(n + photos.length) % photos.length]; if (q) new Image().src = srcOf(q, lightboxWidth()); });
  }
  function lightboxWidth() {
    const need = Math.max(window.innerWidth, window.innerHeight) * Math.min(window.devicePixelRatio || 1, 2);
    return need > 2000 ? 2600 : need > 1300 ? 1920 : 1280;
  }
  async function openLightbox(i, trigger) {
    if (!photos.length) return;
    current = i; lastFocus = trigger || document.activeElement;
    lb.hidden = false; document.body.style.overflow = "hidden";
    setImage(i);
    requestAnimationFrame(() => lb.classList.add("is-open"));
    $("#lbClose").focus({ preventScroll: true });
  }
  async function closeLightbox() {
    lb.classList.remove("is-open");
    await wait(320);
    lb.hidden = true; lbImg.classList.remove("is-ready"); document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  async function go(dir) {
    if (busy || photos.length < 2) return;
    busy = true;
    lbImg.classList.add(dir > 0 ? "to-left" : "to-right");
    await wait(180);
    current = (current + dir + photos.length) % photos.length;
    lbImg.classList.remove("to-left", "to-right", "is-ready");
    setImage(current);
    busy = false;
  }
  $("#lbPrev").addEventListener("click", () => go(-1));
  $("#lbNext").addEventListener("click", () => go(1));
  $("#lbClose").addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-figure")) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) { if (e.key === "Escape" && document.body.classList.contains("menu-open")) toggleMenu(false); return; }
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "Escape") closeLightbox();
    else if (e.key === "Tab") { // Fokus in der Lightbox halten
      const f = $$("button", lb); const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // Swipe
  let sx = 0, sy = 0, tracking = false;
  lb.addEventListener("touchstart", (e) => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; tracking = true; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (!tracking) return; tracking = false;
    const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) go(dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) closeLightbox();
  }, { passive: true });

  /* ---------- Videos ---------- */
  const list = $("#videoList");
  $("#videoCount").textContent = `${videos.length} ${videos.length === 1 ? "video" : "videos"}`;
  videos.forEach((v) => {
    const id = parseYouTubeId(v.youtube || v.id || "");
    const file = v.file || "";                       // eigenes Video (mp4) statt YouTube
    const poster = v.poster || (id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "");
    const li = document.createElement("li");
    li.className = "video reveal";
    const title = escapeHtml(v.title || "video");
    li.innerHTML = `
      <div class="video__frame">
        ${id || file ? `
          <button class="video__poster" type="button" aria-label="${title} abspielen">
            ${poster ? `<img src="${poster}" alt="" loading="lazy" decoding="async">` : ""}
            <span class="video__play"><img src="assets/play.png" alt="" width="256" height="256"></span>
          </button>` : `
          <div class="video__empty">
            <svg class="icon"><use href="#i-video"/></svg>
            <span>YouTube-Link in data.js eintragen</span>
          </div>`}
      </div>
      <div class="video__meta">${v.title ? `<h2>${title}</h2>` : ""}<div class="video__side">${v.info ? `<p>${escapeHtml(v.info)}</p>` : ""}</div></div>`;

    const frame = li.querySelector(".video__frame");

    if (id && !file && poster.includes("ytimg")) {
      const img = li.querySelector("img");
      img.addEventListener("error", function onErr() {
        // maxresdefault gibt es nicht bei jedem Video -> hqdefault als Rückfall
        if (!img.dataset.fallback) { img.dataset.fallback = "1"; img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }
        else { img.style.visibility = "hidden"; img.removeEventListener("error", onErr); }
      });
    }

    // Fällt das Abspielen auf der Seite aus (z. B. Einbetten im Video deaktiviert),
    // erscheint erst dann ein Hinweis mit Link – im Normalfall sieht man ihn nie.
    function showFallback(msg) {
      if (frame.querySelector(".video__fallback")) return;
      frame.querySelectorAll("iframe, video").forEach(el => el.remove());
      const box = document.createElement("div");
      box.className = "video__fallback";
      box.innerHTML = `<p>${msg}</p>${id ? `<a class="video__yt" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">auf youtube ansehen<svg class="icon"><use href="#i-arrow-up-right"/></svg></a>` : ""}`;
      frame.appendChild(box);
    }

    if (id || file) {
      li.querySelector(".video__poster").addEventListener("click", (e) => {
        const btn = e.currentTarget;
        const remove = () => setTimeout(() => btn.remove(), reduced ? 0 : 400);

        if (file) {                                   // --- eigener Player, ganz ohne YouTube
          const vid = document.createElement("video");
          vid.src = file; vid.controls = true; vid.autoplay = true; vid.playsInline = true;
          if (v.poster) vid.poster = v.poster;
          vid.setAttribute("controlsList", "nodownload");
          vid.addEventListener("loadeddata", () => vid.classList.add("is-ready"));
          vid.addEventListener("error", () => showFallback("das video konnte nicht geladen werden."));
          frame.appendChild(vid);
          vid.classList.add("is-ready");
          remove();
          return;
        }

        // --- YouTube-Player auf der eigenen Seite
        if (location.protocol === "file:") {
          showFallback("lokal geöffnet: youtube braucht eine echte webadresse. auf dem webspace läuft das video direkt hier.");
          remove();
          return;
        }
        const params = new URLSearchParams({
          autoplay: "1", rel: "0", playsinline: "1", modestbranding: "1",
          enablejsapi: "1", origin: location.origin, widget_referrer: location.href
        });
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${id}?${params}`;
        iframe.title = v.title || "youtube-video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        iframe.addEventListener("load", () => {
          iframe.classList.add("is-ready");
          try { // Fehlermeldungen des Players empfangen
            iframe.contentWindow.postMessage(JSON.stringify({ event: "listening", id: id, channel: "widget" }), "https://www.youtube.com");
          } catch (_) {}
        });
        frame.appendChild(iframe);
        setTimeout(() => { iframe.classList.add("is-ready"); btn.remove(); }, reduced ? 0 : 400);

        const onMsg = (ev) => {
          if (!/^https:\/\/(www\.)?youtube(-nocookie)?\.com$/.test(ev.origin)) return;
          let d; try { d = typeof ev.data === "string" ? JSON.parse(ev.data) : ev.data; } catch (_) { return; }
          if (d && d.event === "onError") {
            window.removeEventListener("message", onMsg);
            showFallback("dieses video erlaubt das einbetten nicht.");
          }
        };
        window.addEventListener("message", onMsg);
      });
    }
    list.appendChild(li);
    observe(li);
  });

  /* ---------- Kontakt: Reveal ---------- */
  $$('[data-view="kontakt"] .reveal').forEach(observe);

  /* ---------- Router (sanfter Seitenwechsel) ---------- */
  const titles = { fotos: "fotos", videos: "videos", kontakt: "kontakt" };
  let active = null, routing = Promise.resolve();

  function route(first = false) {
    const name = (location.hash.replace("#", "") || "fotos").toLowerCase();
    const target = titles[name] ? name : "fotos";
    routing = routing.then(() => show(target, first));
  }
  async function show(name, first) {
    if (name === active) return;
    const next = $(`.view[data-view="${name}"]`);
    const prev = active ? $(`.view[data-view="${active}"]`) : null;
    $$("[data-route]").forEach(a => a.dataset.route === name ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    document.title = `${titles[name]} – yanic dammann`;
    if (prev && !first) { prev.classList.add("is-leaving"); await wait(220); prev.hidden = true; prev.classList.remove("is-leaving"); }
    $$(".view").forEach(v => { if (v !== next) v.hidden = true; });
    next.classList.add("is-entering"); next.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => requestAnimationFrame(() => next.classList.remove("is-entering")));
    if (!first) $("#main").focus({ preventScroll: true });
    active = name;
  }
  window.addEventListener("hashchange", () => { toggleMenu(false); route(); });
  route(true);

  /* ---------- Mobile-Menü ---------- */
  const toggle = $("#menuToggle"), menu = $("#mobileMenu");
  async function toggleMenu(open) {
    const isOpen = document.body.classList.contains("menu-open");
    if (open === isOpen) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    toggle.querySelector("use").setAttribute("href", open ? "#i-xmark" : "#i-menu");
    document.body.classList.toggle("menu-open", open);
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add("is-open")); }
    else { menu.classList.remove("is-open"); await wait(300); if (!document.body.classList.contains("menu-open")) menu.hidden = true; }
  }
  toggle.addEventListener("click", () => toggleMenu(!document.body.classList.contains("menu-open")));
  window.addEventListener("resize", () => { if (window.innerWidth > 900) toggleMenu(false); });

  /* ---------- Header-Linie, Footer ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#year").textContent = new Date().getFullYear();
  $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));

  /* ---------- Helfer ---------- */
  function parseYouTubeId(input) {
    const s = String(input).trim();
    if (/^[\w-]{11}$/.test(s)) return s;
    const m = s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : "";
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
})();
