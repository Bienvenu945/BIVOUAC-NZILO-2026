# 🏕️ BIVOUAC Nzilo 2026

<p align="center">
  <img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/communes/plus_822.jpg" alt="Bivouac Nzilo 2026" width="100%">
</p>

<h3 align="center">Une semaine de foi, de fraternité et d'aventure</h3>

<p align="center">
  <strong>Groupe KIRO BAKANJA</strong><br>
  Paroisse Sainte Barbe et Saint Éloi · Décanat de Kolwezi
</p>

<p align="center">
  📍 Cité de Nzilo, Lualaba, RDC<br>
  📅 Du 9 au 16 août 2026
</p>

<p align="center">
  <a href="https://bienvenu945.github.io/BIVOUAC-NZILO-2026/"><strong>🌐 Visiter le site</strong></a>
  ·
  <a href="https://github.com/Bienvenu945/BIVOUAC-NZILO-2026"><strong>💻 Voir le code source</strong></a>
</p>

---

## 📖 À propos du projet

**BIVOUAC Nzilo 2026** est un site web rétrospectif consacré au bivouac annuel du Groupe KIRO BAKANJA, rattaché à la paroisse Sainte Barbe et Saint Éloi, dans le décanat de Kolwezi.

Organisée du **9 au 16 août 2026** à la Cité de Nzilo, cette retraite a été une semaine de prière, de jeux, de chants, de feux de camp, de fraternité et de vie communautaire.

Ce site a été conçu pour conserver la mémoire de cette édition, rassembler les photographies des participants et permettre à chacun de revivre les moments forts de cette aventure.

## ✨ Fonctionnalités

- **Présentation de l'événement :** dates, lieu, organisateur et ambiance du bivouac.
- **Galerie photographique :** affichage des souvenirs répartis en six catégories.
- **Chargement progressif :** affichage des photos par lots afin de préserver la fluidité de navigation.
- **Galerie dynamique :** récupération des photographies depuis le dépôt GitHub, sans devoir modifier le code à chaque ajout pris en charge.
- **Design responsive :** interface adaptée aux téléphones, tablettes et ordinateurs.
- **Navigation accessible :** menu mobile, rôles ARIA, lien d'évitement et annonces dynamiques.

## 🖼️ Les six catégories de la galerie

Les photographies sont organisées dans six sous-dossiers distincts. Voici un aperçu de chaque catégorie.

### 1. COMMUNES

<p align="center">
  <img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/communes/plus_822.jpg" alt="Catégorie Communes" width="80%">
</p>

**Dossier :** `images/communes/`

### 2. BAKAYOUKI

<p align="center">
  <img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/bakayouki/photo_062.JPG" alt="Catégorie Bakayouki" width="80%">
</p>

**Dossier :** `images/bakayouki/`

### 3. YOUPI

<p align="center">
  <img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/youpi/photo_006.JPG" alt="Catégorie Youpi" width="80%">
</p>

**Dossier :** `images/youpi/`

### 4. GEN

<p align="center">
  <img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/gen/plus_1093.JPG" alt="Catégorie Gen" width="80%">
</p>

**Dossier :** `images/gen/`

### 5. ASPIRANT

<p align="center">
  <img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/aspirant/photo_001.JPG" alt="Catégorie Aspirant" width="80%">
</p>

**Dossier :** `images/aspirant/`

### 6. DIRIGEANT

<p align="center">
  <img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/dirigeant/photo_005.JPG" alt="Catégorie Dirigeant" width="80%">
</p>

**Dossier :** `images/dirigeant/`

*Les images ci-dessus sont des photographies représentatives référencées directement depuis le dépôt GitHub. Tu peux les remplacer par d'autres clichés pour mettre en avant des moments plus précis.*

## 📁 Structure du dépôt

```text
BIVOUAC-NZILO-2026/
├── .gitattributes
├── index.html
├── README.md
└── images/
    ├── communes/
    │   ├── plus_822.jpg
    │   ├── photo_035.JPG
    │   ├── photo_063.JPG
    │   └── ...
    ├── bakayouki/
    │   ├── photo_062.JPG
    │   ├── photo_064.JPG
    │   └── ...
    ├── youpi/
    │   ├── photo_006.JPG
    │   ├── photo_009.JPG
    │   └── ...
    ├── gen/
    │   ├── photo_030.JPG
    │   ├── photo_036.JPG
    │   └── ...
    ├── aspirant/
    │   ├── photo_001.JPG
    │   ├── photo_002.JPG
    │   └── ...
    └── dirigeant/
        ├── photo_005.JPG
        ├── photo_014.JPG
        └── ...
```

> **Remarque :** cette arborescence est illustrative. Les fichiers affichés sont des exemples et les points de suspension représentent les autres photographies présentes dans les dossiers.

## 📸 Ajouter de nouvelles photographies

La galerie est conçue pour récupérer les images depuis GitHub. Pour ajouter des photos :

1. Place les nouvelles images dans le sous-dossier correspondant à leur catégorie.
2. Enregistre les modifications dans Git.
3. Envoie-les sur GitHub.
4. Vérifie le site en ligne après le déploiement.

Exemple en ligne de commande :

```bash
git add images/
git commit -m "Ajout de nouvelles photos"
git push
```

Aucune modification de `index.html` n'est nécessaire pour les ajouts ordinaires, tant que les photos sont placées dans les dossiers pris en charge par la galerie.

Le chargement des images est effectué progressivement afin de limiter le poids affiché au premier chargement. En cas d'indisponibilité de l'API GitHub, le comportement de secours prévu par le site peut prendre le relais.

## 🎨 Design et identité visuelle

L'identité graphique s'inspire de la nature, du camping et du scoutisme.

- **Vert forêt :** nature, espérance et vie communautaire.
- **Orange marigold :** chaleur, énergie et convivialité.
- **Tons kaki et crème :** esprit bivouac et sobriété visuelle.

**Typographies :**

- Anton pour les titres.
- Karla pour les textes courants.

L'interface est responsive et comprend un menu mobile ainsi que plusieurs améliorations d'accessibilité.

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure et contenu du site |
| CSS3 | Mise en page, couleurs et adaptation aux écrans |
| JavaScript | Interactions et chargement dynamique de la galerie |
| GitHub Contents API | Récupération des contenus du dépôt |
| GitHub Pages | Hébergement gratuit du site |
| Google Fonts | Chargement des polices Anton et Karla |

Le site est construit autour d'un fichier principal `index.html` qui regroupe le HTML, le CSS et le JavaScript. Aucune installation de dépendances n'est nécessaire.

## ✏️ Personnalisation

Pour modifier le contenu du site, ouvre `index.html`.

- **Informations pratiques :** section `#infos`.
- **Présentation de l'événement :** section `#a-propos`.
- **Galerie :** section `#galerie` et son code JavaScript.
- **Couleurs :** règles CSS définies dans le fichier.
- **Navigation mobile :** code HTML, CSS et JavaScript du menu.

Pour modifier une catégorie, veille à conserver la cohérence entre son nom, son dossier et la logique de chargement des images.

## 🚀 Hébergement

Le site est publié gratuitement grâce à GitHub Pages.

- 🌐 **Site public :** https://bienvenu945.github.io/BIVOUAC-NZILO-2026/
- 💻 **Dépôt source :** https://github.com/Bienvenu945/BIVOUAC-NZILO-2026

## 👤 Auteur

**Bienvenu Kalenga Kamoy Bienvenu**  
Étudiant en électromécanique à la Faculté Polytechnique de l'Université de Kolwezi.

Site conçu et déployé pour le Groupe KIRO BAKANJA, dans le but de préserver les souvenirs du Bivouac Nzilo 2026.

---

<p align="center">
  <strong>🏕️ KIRO BAKANJA · NZILO 2026</strong><br>
  <em>Des souvenirs partagés, une fraternité qui demeure.</em>
</p>
