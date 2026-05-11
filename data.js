/* Sabrina Mouédine — données du portfolio
   --------------------------------------------------
   Format vidéo : URL complète YouTube OU Vimeo dans `videoUrl`.
   Format affiche/tract : `src` peut être .png/.jpg OU .pdf (le PDF s'ouvre dans un nouvel onglet).
*/

window.VIDEOS_PRO = [
  // ====== CAMPAGNE TPE 2024 (3 shorts) ======
  {
    id: 'campagne-tpe-2024',
    type: 'projet',
    title: "Campagne Élections TPE 2024",
    client: 'CFDT Services',
    cat: 'CAMPAGNE',
    thumbnail: 'https://i.ytimg.com/vi/lCoBKlV810s/hqdefault.jpg',
    description: "Série de capsules verticales pour mobiliser autour des élections TPE.",
    context: "Production interne CFDT Services — réalisée en autonomie, du brief à l'export.",
    approach: "Format short vertical, DA unifiée, motion design, voix-off et sous-titres pour les réseaux sociaux.",
    production: "Premiere Pro · After Effects · Canva · IA générative",
    videos: [
      { title: "TPE — Réseaux sociaux",   videoUrl: 'https://youtube.com/shorts/lCoBKlV810s' },
      { title: "TPE V2",                  videoUrl: 'https://youtube.com/shorts/n74V521eB-Y' },
      { title: "TPE — Vos identifiants",  videoUrl: 'https://youtube.com/shorts/8J9BXel3tMU' },
    ]
  },

  // ====== VIDÉOS SOLO ======
  { id: 'v-jingle',     title: "Jingle Congrès CFDT 2025",  client: 'CFDT Services',       cat: 'INSTITUTIONNEL',
    videoUrl: 'https://youtu.be/Bjt6B3v3xHU', description: "Jingle d'ouverture pour le Congrès 2025 de la CFDT." },
  { id: 'v-technicien', title: "Technicien.io",             client: 'Technicien.io',       cat: 'PROMO',
    videoUrl: 'https://youtu.be/phTjbxYMjYA', description: "Capsule de présentation de la plateforme." },
  { id: 'v-juscanne',   title: "Jus de Canne 974",          client: 'Jus de Canne 974',    cat: 'PROMO',
    videoUrl: 'https://youtu.be/StO-lS06ye0', description: "Vidéo promo aux couleurs de La Réunion." },
  { id: 'v-gmstore',    title: "GM Store",                  client: 'GM Store',            cat: 'PRODUIT',
    videoUrl: 'https://youtu.be/GmqFFPrsano', description: "Présentation produit pour GM Store." },
  { id: 'v-feminin',    title: "Le Féminin Sacré",          client: 'Le Féminin Sacré',    cat: 'BRAND',
    videoUrl: 'https://youtu.be/iAf3hw4wuDM', description: "Vidéo de marque, univers doux et incarné." },
  { id: 'v-niagara',    title: "Résidences Niagara",        client: 'Résidences Niagara',  cat: 'TOURISME',
    videoUrl: 'https://youtu.be/S5beUM5pGfc', description: "Capsule promotionnelle pour un hébergement insulaire à La Réunion." },
];

window.VIDEOS_PERSO = [
  { id: 'fausse-pub-kleenex-gobelins',
    title: "Kleenex — Fausse publicité tournée au smartphone",
    client: 'Projet Gobelins',
    cat: 'PROJET PÉDAGOGIQUE',
    videoUrl: 'https://youtu.be/XHZB2o3NEqg',
    description: "Fausse publicité Kleenex tournée au smartphone — projet pédagogique réalisé dans le cadre de la formation Gobelins." },
  { id: 'pointe-grouin-2021',
    title: "Pointe du Grouin — Essai gimbal & DaVinci",
    cat: 'CAPTATION PAYSAGE',
    videoUrl: 'https://youtu.be/Ccrs1CNZLSE',
    description: "Captation contemplative de la Pointe du Grouin (Côtes-d'Armor) montée sur musique électro planante. Premier projet réalisé sous DaVinci Resolve, dans une démarche d'essai personnel en immersion paysage.",
    context: "Tournage personnel pendant un séjour en Bretagne, conçu comme un terrain d'expérimentation : prise en main approfondie du gimbal en conditions réelles (vent, lumière changeante), passage à DaVinci Resolve pour l'étalonnage et le montage.",
    approach: "Travail sur la synchronisation rythmique image/musique : choix d'une bande son électro planante mais structurée, montage calé sur les temps et les ruptures musicales, effets de transition au service du rythme. Captation à hauteur d'homme, plans amples, lumière naturelle de bord de mer.",
    production: "Tournage gimbal · DaVinci Resolve · Étalonnage · Montage rythmique" },
  { id: 'podcast-ou-va-le-monde',
    title: "« Où va le monde » — Podcast",
    cat: 'PODCAST',
    videoUrl: 'https://youtu.be/lY_O_KWX1GQ',
    description: "Podcast d'analyse réalisé pendant la période de confinement, conçu comme un espace de prise de recul sur l'actualité.",
    context: "Création personnelle initiée pendant le confinement, en pleine période de saturation médiatique. L'idée : proposer un format audio posé, pour reprendre du recul sur les informations qui tournaient en boucle. Sources éditoriales : Le Monde, Le Point, Zinfos974.",
    approach: "Travail sur la voix off et le mixage audio : prise de son maîtrisée, jingle d'ouverture, fond musical discret, rythme posé pour laisser de la place à la réflexion. Une démarche d'autrice plutôt qu'un format calibré pour l'algorithme.",
    production: "Adobe Audition · Voix off · Habillage sonore (musiques libres de droits)" },
];

window.AFFICHES = [
  // Tracts (PDF)
  { src: 'assets/portfolio/tract-nao-chaussexpo.pdf',         title: "Tract NAO — Chauss'Expo",          kind: 'TRACT · PDF' },
  { src: 'assets/portfolio/tract-coiffure-c2p-2019.pdf',      title: "Tract Coiffure C2P 2019",          kind: 'TRACT · PDF' },
  { src: 'assets/portfolio/tract-nao-cfdt-api.pdf',           title: "Tract NAO CFDT API — Nov. 2025",   kind: 'TRACT · PDF' },
  { src: 'assets/portfolio/tract-travail-cuisine-chaleur.pdf',title: "Travail en cuisine, forte chaleur",kind: 'TRACT · PDF' },
  { src: 'assets/portfolio/tract-v5.pdf',                     title: "Tract V5",                         kind: 'TRACT · PDF' },
  { src: 'assets/portfolio/livret-action.pdf',                title: "Livret d'action",                  kind: 'LIVRET · PDF' },
  { src: 'assets/portfolio/livret-action-v2.pdf',             title: "Livret d'action — Version 2",      kind: 'LIVRET · PDF' },

  // Affiches & illustrations (image)
  { src: 'assets/portfolio/affiche-chaleur-amazon.jpg',       title: "Travailler dans la chaleur — Amazon", kind: 'AFFICHE' },
  { src: 'assets/portfolio/livre-wes-01.jpg',                 title: "Windows 10, vous aussi soyez un pro !", kind: 'ILLUSTRATION · LIVRE' },
];

window.LOGOS = [
  { src: 'assets/portfolio/logo-marie-bienetre.jpg', title: 'Marie — Bien-être & Équilibre', kind: 'LOGOTYPE' },
];

window.SITES = [
  { src: 'assets/portfolio/site-assmat.png',              title: "Assistant.e.s maternel.le.s — Droits au cœur", url: 'assistantes-maternelles-agreees.fr', stack: 'Joomla · CFDT Services' },
  { src: 'assets/portfolio/site-cfdt-casino.png',         title: "CFDT Groupe Casino",                            url: 'cfdt-casino.fr',                     stack: 'Joomla · CFDT Services' },
  { src: 'assets/portfolio/site-notilus-sommaire.png',    title: "Notilus — Vidéos de formation",                 url: 'docs.cfdt-services.fr',              stack: 'Documentation interactive' },
  { src: 'assets/portfolio/site-notilus-mode-emploi.png', title: "Notilus — Mode d'emploi",                       url: 'docs.cfdt-services.fr',              stack: 'Documentation interactive' },
  { src: 'assets/portfolio/site-reflexologue.jpg',        title: "Marie — Bien-être & Équilibre",                 url: 'marie-bienetre-equilibre.fr',        stack: 'Site vitrine one-page · Réflexologie' },
];
