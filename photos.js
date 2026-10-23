/* Photos des participants : envoi (en attente de validation) et affichage des photos publiées */
(() => {
  "use strict";
  const cfg = window.BIVOUAC_SUPABASE_CONFIG || {};
  const $ = s => document.querySelector(s);
  const dlg = $("#photo-dialog"), form = $("#photo-form"), msg = $("#photo-status");
  const strip = $("#shared-strip"), note = $("#shared-note");
  const db = window.supabase?.createClient && cfg.url && cfg.anonKey ? window.supabase.createClient(cfg.url, cfg.anonKey) : null;
  const pubUrl = p => `${cfg.url}/storage/v1/object/public/photos-public/${p}`;
  const say = (t, err) => { msg.textContent = t; msg.dataset.state = err ? "error" : "ok"; };

  $("#photo-open").addEventListener("click", () => { say(""); dlg.showModal(); });
  $("#photo-close").addEventListener("click", () => dlg.close());

  // Réduit la photo (1600 px, JPEG) pour économiser les données mobiles et le stockage.
  async function compress(file, max = 1600) {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    return new Promise((ok, ko) => c.toBlob(b => (b ? ok(b) : ko(new Error("compression"))), "image/jpeg", 0.82));
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const f = form.elements, btn = form.querySelector('[type="submit"]');
    if (f.website.value) return; // bot
    if (!f.photo.files[0]) return say("Choisis une photo.", true);
    if (!db) return say("L'envoi n'est pas encore configuré.", true);
    let last = 0;
    try { last = +localStorage.getItem("bnz-last-upload") || 0; } catch (_) {}
    if (Date.now() - last < 60000) return say("Patiente une minute avant d'envoyer une autre photo.", true);

    btn.disabled = true;
    say("Envoi en cours…");
    try {
      const blob = await compress(f.photo.files[0]);
      const path = `${crypto.randomUUID()}.jpg`;
      let r = await db.storage.from("photos-pending").upload(path, blob, { contentType: "image/jpeg" });
      if (r.error) throw r.error;
      r = await db.from("photo_submissions").insert({
        path, status: "pending",
        author: f.author.value.trim().slice(0, 60) || null,
        caption: f.caption.value.trim().slice(0, 200) || null
      });
      if (r.error) throw r.error;
      try { localStorage.setItem("bnz-last-upload", String(Date.now())); } catch (_) {}
      form.reset();
      say("Merci ! Ta photo apparaîtra après validation par un modérateur.");
    } catch (err) {
      console.error("Envoi photo :", err);
      say("L'envoi a échoué. Vérifie ta connexion (photo JPG, PNG ou WebP) et réessaie.", true);
    } finally {
      btn.disabled = false;
    }
  });

  async function loadShared() {
    if (!db) { note.textContent = "Les photos des participants apparaîtront ici une fois Supabase configuré."; return; }
    const { data, error } = await db.from("photo_submissions")
      .select("path, author, caption")
      .eq("status", "published").order("created_at", { ascending: false }).limit(60);
    if (error) { console.error(error); note.textContent = "Photos des participants indisponibles pour le moment."; return; }
    if (!data.length) { note.textContent = "Aucune photo de participant pour le moment. Sois le premier !"; return; }
    note.hidden = true;
    const photos = data.map(d => ({
      src: pubUrl(d.path),
      alt: `Photo de ${d.author || "un participant"}${d.caption ? " : " + d.caption : ""}`
    }));
    data.forEach((d, i) => {
      const fig = document.createElement("figure");
      fig.tabIndex = 0;
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", `Agrandir : ${photos[i].alt}`);
      const img = new Image();
      img.src = photos[i].src; img.alt = photos[i].alt; img.loading = "lazy"; img.decoding = "async";
      img.addEventListener("error", () => fig.remove());
      fig.append(img);
      if (d.author || d.caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = [d.author, d.caption].filter(Boolean).join(" · ");
        fig.append(cap);
      }
      const open = () => (window.openLightbox ? window.openLightbox(photos, i, fig) : window.open(photos[i].src, "_blank", "noopener"));
      fig.addEventListener("click", open);
      fig.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(); } });
      strip.append(fig);
    });
  }
  loadShared();
})();
