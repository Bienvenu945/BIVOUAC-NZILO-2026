/* BIVOUAC NZILO 2026 — KIRO BAKANJA */
(() => {
  "use strict";

  const USER = "bienvenu945", REPO = "BIVOUAC-NZILO-2026", ROOT = "images";
  const BATCH = 12, EXT = /\.(jpe?g|png|webp|gif)$/i;
  const CATS = [
    { k: "communes", t: "Images communes", d: "Les moments vécus par tout le groupe." },
    { k: "bakayouki", t: "Bakayouki", d: "Souvenirs de la section Bakayouki." },
    { k: "youpi", t: "Youpi", d: "Souvenirs de la section Youpi." },
    { k: "gen", t: "Gen", d: "Souvenirs de la section Gen." },
    { k: "aspirant", t: "Aspirant", d: "Souvenirs de la section Aspirant." },
    { k: "dirigeant", t: "Dirigeant", d: "Souvenirs des dirigeants." }
  ];

  const $ = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  };
  const url = (k, f) => `${ROOT}/${k}/${encodeURIComponent(f)}`;
  const bars = document.getElementById("bars");
  const wrap = document.getElementById("galeries");

  // ---------- Visionneuse ----------
  const lb = document.getElementById("lb");
  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector(".lb-c");
  let list = [], idx = 0, origin = null;

  const show = i => {
    idx = (i + list.length) % list.length;
    lbImg.src = list[idx].src;
    lbImg.alt = list[idx].alt;
    lbCap.textContent = `${list[idx].alt} (${idx + 1} sur ${list.length})`;
  };
  const openLb = (l, i, from) => {
    list = l; origin = from; show(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-x").focus();
  };
  const closeLb = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    lbImg.src = "";
    if (origin) origin.focus();
  };
  lb.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (e.target === lb || (b && b.classList.contains("lb-x"))) closeLb();
    else if (b && b.classList.contains("lb-p")) show(idx - 1);
    else if (b && b.classList.contains("lb-n")) show(idx + 1);
  });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  // ---------- Chargement d'une section ----------
  async function load(c, ui) {
    try {
      const r = await fetch(`https://api.github.com/repos/${USER}/${REPO}/contents/${ROOT}/${c.k}`);
      if (!r.ok) throw new Error("Dossier introuvable");
      const files = (await r.json())
        .filter(f => f.type === "file" && EXT.test(f.name))
        .map(f => f.name)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

      if (!files.length) {
        ui.note.textContent = `Pas encore de photos. Ajoute des images dans le dossier images/${c.k}/ de ton dépôt GitHub.`;
        return;
      }
      ui.note.remove();

      const photos = files.map((f, i) => ({ src: url(c.k, f), alt: `${c.t}, photo ${i + 1}` }));

      // La première photo colore la bande du hero
      const thumb = new Image();
      thumb.alt = "";
      thumb.src = photos[0].src;
      ui.bar.prepend(thumb);

      let shown = 0;
      const render = () => {
        photos.slice(shown, shown + BATCH).forEach((p, j) => {
          const fig = $("figure");
          fig.tabIndex = 0;
          fig.setAttribute("role", "button");
          fig.setAttribute("aria-label", `Agrandir : ${p.alt}`);
          const img = new Image();
          img.src = p.src;
          img.alt = p.alt;
          img.loading = "lazy";
          img.decoding = "async";
          img.addEventListener("error", () => fig.remove());
          fig.append(img);
          const i = shown + j;
          const open = () => openLb(photos, i, fig);
          fig.addEventListener("click", open);
          fig.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
          });
          ui.strip.insertBefore(fig, ui.more);
        });
        shown = Math.min(shown + BATCH, photos.length);
        ui.more.hidden = shown >= photos.length;
        ui.count.textContent = `${shown} sur ${photos.length} photos`;
      };
      ui.more.addEventListener("click", render);
      render();
    } catch (err) {
      console.error(`Galerie ${c.k} :`, err);
      ui.note.textContent = `Galerie indisponible. Vérifie que le dossier images/${c.k}/ existe dans le dépôt GitHub.`;
    }
  }

  // ---------- Construction de la page ----------
  CATS.forEach((c, n) => {
    const bar = $("a");
    bar.className = "bar";
    bar.href = "#g-" + c.k;
    bar.dataset.sec = c.k;
    bar.style.setProperty("--i", n);
    bar.append($("span", "", c.t));
    bars.append(bar);

    const sec = $("section", "cat");
    sec.id = "g-" + c.k;
    sec.dataset.sec = c.k;

    const head = $("div", "cat-head");
    const title = $("div");
    title.append($("h2", "", c.t), $("p", "", c.d));
    const count = $("p", "count");
    head.append(title, count);

    const note = $("p", "note", "Chargement des photos…");
    const strip = $("div", "strip");
    const more = $("button", "more", "Voir plus");
    more.hidden = true;
    strip.append(more);

    sec.append(head, note, strip);
    wrap.append(sec);
    load(c, { bar, strip, more, note, count });
  });
})();