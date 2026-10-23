/* Recherche, partage, livre d'or partagé et mode hors ligne */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Recherche : charger les lots restants avant de filtrer, pour couvrir toute la galerie.
  const search = $("#photo-search");
  const sectionFilter = $("#section-filter");
  const filterStatus = $("#filter-status");
  const sectionNames = {
    communes: "Images communes", bakayouki: "Bakayouki", youpi: "Youpi",
    gen: "Gen", aspirant: "Aspirant", dirigeant: "Dirigeant"
  };
  let loadingAll = false;
  let applying = false;

  async function loadAllPhotos() {
    if (loadingAll) return;
    loadingAll = true;
    try {
      for (const section of $$(".cat")) {
        const more = $(".more", section);
        let guard = 0;
        while (more && !more.hidden && guard < 200) {
          more.click();
          guard++;
        }
      }
    } finally {
      loadingAll = false;
    }
  }

  function applyFilters() {
    if (applying) return;
    applying = true;
    const query = (search?.value || "").trim().toLocaleLowerCase("fr");
    const selected = sectionFilter?.value || "all";
    let visible = 0;
    for (const section of $$(".cat")) {
      const key = section.dataset.sec || "";
      let sectionVisible = 0;
      for (const figure of $$("figure", section)) {
        const img = $("img", figure);
        const file = figure.dataset.filename || (img?.src.split("/").pop() || "");
        const haystack = `${file} ${img?.alt || ""} ${sectionNames[key] || key}`.toLocaleLowerCase("fr");
        const matches = (selected === "all" || selected === key) && (!query || haystack.includes(query));
        figure.hidden = !matches;
        if (matches) { visible++; sectionVisible++; }
      }
      section.hidden = (selected !== "all" && selected !== key) || (Boolean(query) && sectionVisible === 0);
    }
    if (filterStatus) {
      filterStatus.textContent = query || selected !== "all"
        ? `${visible} photo(s) correspondent aux filtres. Recherche sur le nom du fichier et la section.`
        : "Toutes les photos sont affichées par section.";
    }
    applying = false;
  }

  let filterTimer;
  async function filterPhotos() {
    if ((search?.value.trim() || sectionFilter?.value !== "all") && !loadingAll) await loadAllPhotos();
    applyFilters();
  }
  search?.addEventListener("input", () => {
    clearTimeout(filterTimer);
    filterTimer = setTimeout(filterPhotos, 180);
  });
  sectionFilter?.addEventListener("change", filterPhotos);

  // Partage par photo. Le bouton n'active pas la visionneuse sous-jacente.
  function addShareButtons(root = document) {
    $$(".cat figure", root).forEach(figure => {
      if ($(".share-photo", figure)) return;
      const img = $("img", figure);
      if (!img) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "share-photo";
      button.textContent = "↗";
      button.title = "Partager cette photo";
      button.setAttribute("aria-label", "Partager cette photo");
      button.addEventListener("click", async event => {
        event.stopPropagation();
        const url = new URL(img.getAttribute("src"), location.href).href;
        const title = img.alt || "Souvenir du bivouac Nzilo 2026";
        try {
          if (navigator.share) {
            await navigator.share({ title, text: "Un souvenir du Bivouac Nzilo 2026 — KIRO Bakanja", url });
          } else if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(url);
            button.textContent = "✓";
            button.title = "Lien copié";
            setTimeout(() => { button.textContent = "↗"; button.title = "Partager cette photo"; }, 1800);
          } else {
            window.prompt("Copie ce lien pour partager la photo :", url);
          }
        } catch (error) {
          if (error?.name !== "AbortError") window.prompt("Copie ce lien pour partager la photo :", url);
        }
      });
      figure.append(button);
    });
  }

  const gallery = $("#galeries");
  if (gallery) {
    const observer = new MutationObserver(() => {
      addShareButtons();
      if (search?.value || sectionFilter?.value !== "all") applyFilters();
    });
    observer.observe(gallery, { childList: true, subtree: true });
    addShareButtons();
  }

  // Livre d'or Supabase : insertion en attente de modération, lecture des messages publiés.
  const form = $("#guestbook-form");
  const list = $("#guestbook-list");
  const status = $("#guestbook-status");
  const refreshButton = $("#refresh-messages");
  const submitButton = form?.querySelector('button[type="submit"]');
  const config = window.BIVOUAC_SUPABASE_CONFIG || {};
  let supabaseClient = null;

  function setGuestbookStatus(message, isError = false) {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = isError ? "error" : "ok";
  }

  function renderGuestbook(messages) {
    if (!list) return;
    list.replaceChildren();
    if (!messages.length) {
      const empty = document.createElement("p");
      empty.className = "guestbook-empty";
      empty.textContent = "Aucun souvenir publié pour le moment. Reviens bientôt !";
      list.append(empty);
      return;
    }
    for (const item of messages) {
      const card = document.createElement("article");
      card.className = "guest-message";
      const name = document.createElement("strong");
      name.textContent = item.name;
      const message = document.createElement("p");
      message.textContent = item.message;
      const time = document.createElement("time");
      time.dateTime = item.created_at;
      const date = new Date(item.created_at);
      time.textContent = Number.isNaN(date.getTime()) ? "" :
        date.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
      card.append(name, message, time);
      list.append(card);
    }
  }

  async function loadGuestbook() {
    if (!supabaseClient) {
      setGuestbookStatus("Le livre d'or doit être configuré : renseigne l'URL et la clé publique dans supabase-config.js.", true);
      if (list) {
        list.replaceChildren();
        const note = document.createElement("p");
        note.className = "guestbook-empty";
        note.textContent = "Les messages partagés apparaîtront ici une fois Supabase configuré.";
        list.append(note);
      }
      return;
    }
    if (refreshButton) refreshButton.disabled = true;
    try {
      const { data, error } = await supabaseClient
        .from("guestbook")
        .select("id, name, message, created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      renderGuestbook(data || []);
      setGuestbookStatus("Les messages publiés sont partagés avec tous les visiteurs.");
    } catch (error) {
      setGuestbookStatus("Impossible de charger les messages. Vérifie la configuration et la connexion.", true);
      console.error("Livre d'or :", error);
    } finally {
      if (refreshButton) refreshButton.disabled = false;
    }
  }

  if (window.supabase?.createClient && config.url && config.anonKey) {
    supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  }

  form?.addEventListener("submit", async event => {
    event.preventDefault();
    const name = $("#guest-name")?.value.trim() || "";
    const message = $("#guest-message")?.value.trim() || "";
    const honeypot = $("#guest-website")?.value || "";
    if (honeypot) return; // formulaire rempli par un bot
    if (!name || !message) {
      setGuestbookStatus("Renseigne ton nom ou surnom et ton message.", true);
      return;
    }
    if (!supabaseClient) {
      setGuestbookStatus("Le livre d'or n'est pas encore configuré. Les messages ne sont pas envoyés.", true);
      return;
    }
    if (submitButton) submitButton.disabled = true;
    try {
      const { error } = await supabaseClient.from("guestbook").insert({
        name: name.slice(0, 50),
        message: message.slice(0, 500),
        status: "pending"
      });
      if (error) throw error;
      form.reset();
      setGuestbookStatus("Merci ! Ton souvenir a été envoyé et apparaîtra après validation par un modérateur.");
    } catch (error) {
      setGuestbookStatus("L'envoi a échoué. Réessaie lorsque ta connexion sera disponible.", true);
      console.error("Envoi du livre d'or :", error);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });

  refreshButton?.addEventListener("click", loadGuestbook);
  loadGuestbook();

  // Service worker : cache de la page et des ressources consultées, pas du catalogue GitHub API.
  if ("serviceWorker" in navigator &&
      (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => {
        console.warn("Mode hors ligne indisponible :", error);
      });
    });
  }
})();
