# BIVOUAC NZILO 2026 — intégration des fonctionnalités

Ce paquet contient les fichiers à ajouter/remplacer pour :
1. Recherche et filtre photo par section et nom de fichier.
2. Livre d'or partagé via Supabase, avec modération.
3. Mode hors ligne pour la page et les photos déjà consultées.
4. Partage de liens vers les photos.
5. Lecteur audio pour un fichier d'ambiance.

## Fichiers à intégrer

- Remplacer `index.html` par celui du paquet.
- Remplacer `script.js` par la version fournie plus bas dans ce paquet.
- Ajouter `features.css`, `features.js`, `sw.js`, `manifest.webmanifest`, `supabase-config.js`.
- Garder le `style.css` original du dépôt : les styles additionnels sont dans `features.css`.
- Ajouter un fichier audio libre de droits à `assets/audio/ambiance.mp3`.
- Exécuter `supabase/schema.sql` dans le SQL Editor de Supabase.

## Configurer le livre d'or collectif

1. Créer un projet Supabase.
2. Dans le tableau de bord, ouvrir SQL Editor et exécuter `supabase/schema.sql`.
3. Dans Project Settings / API (ou Connect), copier l'URL du projet et la clé publique `anon` / `publishable`.
4. Remplacer les valeurs vides de `supabase-config.js` :
   ```js
   window.BIVOUAC_SUPABASE_CONFIG = {
     url: "https://TON-PROJET.supabase.co",
     anonKey: "TA_CLE_PUBLIQUE"
   };
   ```
5. Ne jamais mettre la clé `service_role` dans le code du site.
6. Les messages arrivent avec le statut `pending`. Dans Supabase Table Editor, passe `status` à `published` pour publier un message, ou `rejected` pour le rejeter. La politique RLS empêche les visiteurs de modifier ou supprimer les messages.

La clé publique est destinée au navigateur : la sécurité dépend des politiques RLS. Pour un usage public à grande échelle, ajouter une limitation anti-spam côté serveur / Edge Function et un CAPTCHA.

## Ajouter la musique

Place un fichier MP3 autorisé à l'emplacement exact `assets/audio/ambiance.mp3`.
Aucun fichier audio n'est inclus dans le paquet : utilise une musique dont tu possèdes les droits ou une piste avec licence compatible. Le lecteur ne démarre pas automatiquement.

## Mode hors ligne

Le site doit être servi en HTTPS (GitHub Pages le fait) ou via `localhost`. Le service worker met en cache la coquille du site et les ressources same-origin au fur et à mesure de leur consultation. Les images non consultées ne sont pas préchargées. Les appels à l'API GitHub et Supabase ne fonctionnent pas hors ligne ; le site et les images déjà mises en cache restent disponibles.

Après la première publication, ouvre le site en ligne une fois, consulte les photos à conserver hors ligne, puis revisite le site sans connexion pour tester.

## Recherche

La recherche porte sur le nom des fichiers et la section, pas sur le contenu visuel de l'image. Pour rechercher « feu de camp », renomme les photos avec des noms descriptifs ou ajoute plus tard des légendes et mots-clés.

## Test rapide

- Tester la recherche sur un nom de fichier existant.
- Filtrer chaque section et vérifier « Toutes les sections ».
- Tester le partage sur mobile et sur ordinateur.
- Soumettre un message : il ne doit pas apparaître avant modération.
- Publier un message depuis Supabase, puis cliquer « Actualiser ».
- Démarrer la musique après avoir ajouté le MP3.
- Consulter quelques photos en ligne, activer le mode avion et recharger le site.
