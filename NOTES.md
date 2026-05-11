# Portfolio Sabrina Mouédine — Notes techniques

> Mémo pour me souvenir de ce qui a été fait, au cas où je reviens dessus dans plusieurs mois.

---

## 🌐 Hébergement & domaine

- **Hébergement** : GitHub Pages
- **Repo** : https://github.com/sabrina97490/portfolio
- **Domaine** : sabrina-mouedine.fr (passe par Cloudflare)
- **Mise en ligne** : `git push` sur la branche `main` → déploiement automatique en 1-2 min

---

## 📁 Structure du dossier `site-v2/`

```
site-v2/
├── index.html              ← page unique (tout le site)
├── styles.css              ← styles (variables CSS en haut)
├── app.js                  ← interactions JS (lightbox, formulaire, etc.)
├── data.js                 ← données (projets, vidéos, etc.)
├── CV-Sabrina-Mouedine.pdf ← CV téléchargeable depuis le bouton contact
└── assets/
    └── portfolio/          ← images des projets + photo de profil
        └── sab-reunion.jpg ← photo de moi (utilisée dans hero + à propos)
```

---

## 🖼️ Photo de profil (sab-reunion.jpg)

- Utilisée à **deux endroits** :
  1. Hero (en haut à droite, dans `.card-portrait`)
  2. Section "À propos" (`.portrait`)
- Affichée dans un cadre avec dégradé jaune/rose en arrière-plan
- Bandes adhésives décoratives bleue (haut-gauche) et jaune (bas-droite) par-dessus
- Le badge "EST. 2005" a été RETIRÉ (pas envie d'afficher la date)

---

## ✉️ Lien email (colonne gauche du contact)

**Problème rencontré** : Cloudflare a une option "Email Address Obfuscation" qui réécrit
automatiquement les `mailto:` en `[email protected]` pour bloquer les spambots.
Mais sur GitHub Pages, le lien généré renvoyait une 404.

**Solution** : reconstruction du mail en JS au chargement de la page.

Dans `index.html` :
```html
<a class="js-mail" href="#" data-u="sabrina.mouedine" data-d="gmail.com">écrire un mail</a>
```

Dans `app.js` (fonction `bindForm`, fin) :
```js
document.querySelectorAll('.js-mail').forEach(a => {
  const addr = a.dataset.u + '@' + a.dataset.d;
  a.href = 'mailto:' + addr;
  a.textContent = addr;
});
```

→ Cloudflare ne peut pas obfusquer ce qui n'existe pas dans le HTML.

---

## 📬 Formulaire de contact (Web3Forms)

**Avant** : le formulaire ouvrait le client mail (Outlook/Mail) avec un `mailto:` →
mauvaise expérience visiteur, et beaucoup de gens n'ont pas de client mail configuré.

**Maintenant** : le formulaire envoie via **Web3Forms** (service tiers gratuit) → je reçois
les messages directement dans ma boîte Gmail (`sabrina.mouedine@gmail.com`).

### Compte Web3Forms

- **Site** : https://web3forms.com
- **Compte associé** : `sabrina.mouedine@gmail.com` (juste l'email, pas de mot de passe)
- **Plan** : Free (250 messages/mois — largement suffisant)
- **Tableau de bord** : https://web3forms.com/dashboard
  - **Submissions** : voir tous les messages reçus
  - **Settings** : config destinataire, sujet, sender name, captcha

### Clé d'accès (Access Key)

```
f1d3d44c-afb8-4fbf-abcf-11460ade2ac2
```

Cette clé est **publique** (visible dans le HTML, c'est normal). Elle est dans :
```html
<input type="hidden" name="access_key" value="f1d3d44c-afb8-4fbf-abcf-11460ade2ac2">
```

⚠️ Si je révoque/régénère la clé sur Web3Forms, il faut la mettre à jour ici.

### Configuration Web3Forms (Settings)

- **Recipient Emails** : sabrina.mouedine@gmail.com
- **Email Subject** : "Nouveau message — Portfolio sabrina-mouedine.fr" (ou ce que j'ai mis)
- **Sender Name** : Notifications
- **Redirect URL** : (vide — le visiteur reste sur la page, voit le message de succès)
- **Advanced Spam Filter** : ON (Basic)

### hCaptcha (anti-spam)

Activé pour bloquer les robots. Site key publique fournie par Web3Forms (plan Free) :

```
50b2fe65-b00b-4b9e-ad62-3ba471098be2
```

Dans `index.html`, juste avant le bouton "Envoyer" :
```html
<div class="h-captcha" data-captcha="true" data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"></div>
```

Et le script Web3Forms qui gère automatiquement le token captcha (en bas de `<body>`) :
```html
<script src="https://web3forms.com/client/script.js" async defer></script>
```

### Comportement à l'envoi (dans `app.js`, fonction `bindForm`)

1. Validation côté client (nom, email, message obligatoires)
2. `fetch()` POST vers `https://api.web3forms.com/submit`
3. Sur succès → message "Message envoyé. Merci, je vous réponds vite !" + reset du formulaire
4. Sur échec → message d'erreur affiché sous le bouton

---

## 🔧 Si je veux modifier le formulaire plus tard

| Je veux… | Aller dans… |
|---|---|
| Changer l'email destinataire | Web3Forms → Settings → Recipient Emails |
| Changer l'objet du mail reçu | Web3Forms → Settings → Email Subject |
| Désactiver le captcha | Web3Forms → Settings → Captcha = None + retirer la div `.h-captcha` du HTML |
| Voir l'historique des messages | Web3Forms → Submissions |
| Changer le message de succès | `app.js`, ligne avec "Message envoyé. Merci..." |
| Ajouter/modifier un champ | `index.html` (form) + éventuellement `app.js` |

---

## 🚀 Workflow pour mettre en ligne une modif

1. Modifier les fichiers en local
2. `git add . && git commit -m "ma modif"`
3. `git push`
4. Attendre 1-2 min (GitHub Pages déploie)
5. Sur le site : `Ctrl + Shift + R` pour recharger sans cache

---

_Dernière mise à jour : 2026_
