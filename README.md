# Bivouac Nzilo 2026

<img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/communes/plus_822.jpg" alt="Bivouac Nzilo 2026" width="100%">

**Une semaine de foi, de fraternité et d'aventure.**
Groupe KIRO Bakanja, paroisse Sainte Barbe et Saint Éloi, décanat de Kolwezi.
Cité de Nzilo (Lualaba, RDC), du 9 au 16 août 2026.

[Visiter le site](https://bienvenu945.github.io/BIVOUAC-NZILO-2026/) | [Voir le code source](https://github.com/Bienvenu945/BIVOUAC-NZILO-2026)

---

## À propos

Ce site garde la mémoire du bivouac annuel du groupe KIRO Bakanja : une semaine de prière, de jeux, de chants, de feux de camp et de vie communautaire. Il rassemble les photos des participants pour que chacun puisse revivre les moments forts de cette édition.

## Les six sections

Chaque section a sa couleur, son dossier de photos et sa propre bande sur le site.

<table>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/communes/plus_822.jpg" alt="Communes" width="100%"><br><b>Communes</b><br><code>images/communes/</code><br>jaune</td>
    <td align="center"><img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/bakayouki/photo_062.JPG" alt="Bakayouki" width="100%"><br><b>Bakayouki</b><br><code>images/bakayouki/</code><br>vert</td>
    <td align="center"><img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/youpi/photo_006.JPG" alt="Youpi" width="100%"><br><b>Youpi</b><br><code>images/youpi/</code><br>rouge</td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/gen/plus_1093.jpg" alt="Gen" width="100%"><br><b>Gen</b><br><code>images/gen/</code><br>bleu</td>
    <td align="center"><img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/aspirant/photo_001.JPG" alt="Aspirant" width="100%"><br><b>Aspirant</b><br><code>images/aspirant/</code><br>orange</td>
    <td align="center"><img src="https://raw.githubusercontent.com/Bienvenu945/BIVOUAC-NZILO-2026/main/images/dirigeant/photo_005.JPG" alt="Dirigeant" width="100%"><br><b>Dirigeant</b><br><code>images/dirigeant/</code><br>blanc</td>
  </tr>
</table>

## Ce que fait le site

- **Page d'accueil en six bandes :** une bande de couleur par section, teintée par sa première photo, qui mène directement à sa galerie.
- **Galeries en défilement horizontal :** les photos se parcourent d'un geste du doigt ou à la souris, et se chargent par lots de 12 avec le bouton « Voir plus ».
- **Visionneuse plein écran :** flèches à l'écran, touches ← et →, Échap pour fermer.
- **Galeries automatiques :** les photos sont lues directement dans le dépôt GitHub, sans toucher au code.
- **Responsive :** les bandes s'empilent sur téléphone, avec une mise en page adaptée aux tablettes et aux ordinateurs.
- **Accessible :** lien d'évitement, navigation au clavier, textes alternatifs, animations coupées si le système le demande.
- **Mesure d'audience :** comptage des visites avec Cloudflare Web Analytics.

## Structure du dépôt

```text
BIVOUAC-NZILO-2026/
├── .gitattributes
├── README.md
├── index.html      contenu et structure
├── style.css       design et responsive
├── script.js       galeries et visionneuse
└── images/
    ├── communes/
    ├── bakayouki/
    ├── youpi/
    ├── gen/
    ├── aspirant/
    └── dirigeant/
```

## Ajouter des photos

1. Place les images dans le dossier de leur section (`.jpg`, `.jpeg`, `.png`, `.webp` ou `.gif`).
2. Envoie-les sur GitHub :

```bash
git add images/
git commit -m "Ajout de nouvelles photos"
git push
```

3. Attends le déploiement de GitHub Pages, puis vérifie le site en ligne.

Les photos s'affichent dans l'ordre alphabétique des noms de fichiers (`photo_2` avant `photo_10`). Aucune modification du code n'est nécessaire.

## Design

L'affiche tient sur une idée : une couleur par section.

| Élément | Valeur |
|---|---|
| Encre et pied de page | `#0E2F2C` |
| Fond | `#E8EEEA` |
| Communes | `#D9A91C` |
| Bakayouki | `#1E7A3B` |
| Youpi | `#C62828` |
| Gen | `#1C5FA8` |
| Aspirant | `#D97217` |
| Dirigeant | `#FFFFFF` |

Typographies : **Archivo** (largeur étendue, graisse 900) pour les titres, **Hanken Grotesk** pour les textes.

## Technologies

| Technologie | Utilisation |
|---|---|
| HTML5, CSS3 | Structure, mise en page et design |
| JavaScript | Galeries, visionneuse, aucune dépendance |
| API GitHub Contents | Lecture des photos du dépôt |
| GitHub Pages | Hébergement gratuit |
| Google Fonts | Archivo et Hanken Grotesk |
| Cloudflare Web Analytics | Comptage des visites |

## Personnalisation

- **Textes et infos pratiques :** section `#infos` dans `index.html`.
- **Couleurs :** variables `:root` et règles `[data-sec=...]` dans `style.css`.
- **Sections et paramètres :** tableau `CATS` et constantes en haut de `script.js` (`USER`, `REPO`, `BATCH`).

Pour ajouter une septième section, il faut trois choses qui portent le même nom : un dossier dans `images/`, une entrée dans `CATS` et une règle `[data-sec=nom]` dans `style.css`.

## Limite à connaître

Le site interroge l'API GitHub à chaque visite, à raison d'une requête par section. GitHub limite ces requêtes sans authentification, par adresse IP. Si cette limite est atteinte, par exemple sur un réseau partagé par beaucoup de visiteurs, une galerie peut afficher « Galerie indisponible » jusqu'au retour à la normale. Un rechargement un peu plus tard règle le problème.

## Hébergement

- Site : https://bienvenu945.github.io/BIVOUAC-NZILO-2026/
- Dépôt : https://github.com/Bienvenu945/BIVOUAC-NZILO-2026

## Auteur

**Bienvenu Kalenga Kamoy Bienvenu**, étudiant en électromécanique à la Faculté Polytechnique de l'Université de Kolwezi.
Site conçu et déployé pour le groupe KIRO Bakanja, pour garder vivants les souvenirs du Bivouac Nzilo 2026.

---

**KIRO Bakanja, Nzilo 2026.** *Des souvenirs partagés, une fraternité qui demeure.*
