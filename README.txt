Portfolio — Sabrina Mouédine
============================

Structure
---------
index.html          Page principale
styles.css          Styles
app.js              Interactions (lightbox, formulaire)
data.js             Données (vidéos, affiches, logos, sites)
assets/portfolio/   Visuels
CV-Sabrina-Mouedine.pdf

Modifier les contenus
---------------------
Tout passe par data.js :
- VIDEOS_PRO / VIDEOS_PERSO : remplacer "youtubeId" par l'ID de la vidéo YouTube
  (exemple : pour https://www.youtube.com/watch?v=ABC123 -> youtubeId: 'ABC123')
- AFFICHES, LOGOS, SITES : ajouter, retirer, ou éditer les entrées.
  Les images vont dans assets/portfolio/.

Mise en ligne
-------------
1. GitHub Pages
   - Créer un dépôt nommé "mouedine.fr" (ou autre).
   - Y déposer tout le contenu du dossier "site".
   - Settings -> Pages -> Source : main / root.
   - Acheter un domaine (OVH, Gandi, Namecheap...).
   - Pages : "Custom domain" -> y indiquer le domaine.
   - Chez le registrar, configurer les DNS comme indiqué dans la doc Pages.

2. OVH ou autre hébergeur classique
   - Uploader le contenu du dossier "site" dans www/ via FTP.

3. Netlify
   - Glisser-déposer le dossier "site" sur netlify.com -> en ligne en 30 s.
