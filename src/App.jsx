import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * --- CONFIGURATION DU THÈME & CONTENUS ---
 */
const CONTENT = {
  FR: {
    brand: "dubontemps",
    meta: {
      title: "Dubontemps | Photographe paysage & documentaire | Paris",
      description: "Dubontemps développe une écriture photographique entre nature, présence et mémoire. Explorez ses séries et tirages d'art, distinctions (ND Awards MH, Lensculture Editors' Pick) et collaborations (Musée de Cluny)."
    },
    nav: { works: 'images', index: 'index', contact: 'contact', lang: 'english' },
    hero: { 
      url: '/images/dubontemps-smithsonian-2026-biarritz--surfers-mist-washi-lg.jpg',
      alt: 'Surfeurs dans la brume, Biarritz, collines espagnoles, 2026, tirage d’art papier washi japonais, Dubontemps'
    },
    sections: {
      manifesto: "Manifeste et démarche",
      gallery: "Galerie de travaux photographiques",
      index: "Index, collaborations et distinctions",
      contact: "Coordonnées et réseaux sociaux"
    },
manifesto: [
  "Un paysage n’est pas un décor. C’est un langage vivant.", 
  "\nSi les cadrages distants évoquent la neutralité d’un satellite, ils soulignent pourtant un écart fondamental : la perception humaine est toujours subjective.", 
  "\nÀ mesure que la technologie influence nos manières de voir, ce travail interroge la persistance du regard : comment un signal discret, même une absence, active des sensations et réveille l’imaginaire.",
  "\nPhotographier est écouter. L’image que l’on retient ne capture rien. Elle révèle une rencontre entre un lieu et une mémoire. À chaque fois imprévisible.",
],
    bio: {
      label: "",
      lead: "dubontemps explore notre relation au paysage et à l’imaginaire",
      text: "Photographe docuementaire basée à Paris, elle collabore avec des artisans, des artistes et des institutions culturelles, après une carrière en conseil. Son travail s'attache aux liens entre lieu, sensation et mémoire. Formée à la narration visuelle à Lee Strasberg, New York et diplômée de Dauphine et de Sciences Po Paris, son approche s'appuie sur ce double parcours, entre rigueur analytique et sensibilité perceptive. Chaque tirage est réalisé par procédé pigmentaire d’archivage sur papier Fine Art, baryté ou washi japonais fait main."
    },
    stream: [
        { 
        id: 'wandering-souls-dubontemps', 
        url: '/images/dubontemps-equationsauvage-2026-palma-shadows-baryta-lg.jpg', 
        caption: "Équation sauvage", 
        coords: "39°34'11\"N 2°38'56\"E",
        year: "en cours",
        tech: "Tirage pigmentaire, papier baryté",
        alt: "Ombres de palmier et marcheurs, Palma de Majorque, série Équation Sauvage 2026, tirage pigmentaire papier baryté, Dubontemps",
        note: "" 
      },
      { 
        id: 'between-realms-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-idf-mysterious-windows-matte-lg.jpg', 
        caption: "L’art du silence", 
        coords: "48°51'24\"N 2°21'08\"E",
        year: "2025",
        tech: "Tirage pigmentaire, papier fine art mat",
        alt: "Fenêtres sur la rivière dans une forêt brumeuse, Île-de-France, série L’Art du Silence 2025, tirage pigmentaire papier fine art mat, Dubontemps",
        note: "",
        side: 'right'
      },
      { 
        id: 'roots-of-time-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-brittany-tree-shadow-matte-lg.jpg', 
        caption: "L’art du silence", 
        coords: "48°34'42\"N 4°32'43\"W",
        year: "2025",
        tech: "Tirage pigmentaire, papier fine art mat",
        alt: "Grand arbre et ombres vues de haut, pâquerettes, chaise en retrait, Finistère Nord Bretagne, série L’Art du Silence 2025, tirage pigmentaire papier fine art mat, Dubontemps",
        note: "" 
      }
    ],
    index: {
      collabs: {
        label: "Collaborations",
        num: "01",
        items: [
          { client: 'Musée national de Cluny', role: "Campagne patrimoniale, reportage, inauguration ministérielle.", date: '2025' },
          { client: 'Louis Wallecan', role: "Portrait pour Duel Magazine.", date: '2025' },
          { client: 'French Theory', role: "Portraits presse artistes, art shooting et DA d'exposition.", date: '23-25' },
          { client: 'Communauté Écotable', role: "Portraits de l'alimentation durable (Ground Control, François Hollande x LFSE, Refugee Food,...).", date: '21—24' }
        ]
      },
      awards: {
        label: "Distinctions",
        num: "02",
        items: [
          { label: "Smithsonian Magazine", subtitle: "Art Shortlist, 2026" },
          { label: "Lensculture", subtitle: "Art Editors' Pick, 2025" },
          { label: "ND Awards", subtitle: "Honorable Mention, 2025", url: "https://ndawards.net/winners-gallery/nd-awards-2025/professional/landscape/hm/22577/" },
          { label: "World Food Awards", subtitle: "Shortlist Récolte, 2023" }
        ]
      },
      exhibitions: {
        label: "Expositions",
        num: "03",
        items: [
          { label: "French Theory Paris", subtitle: "Solo Show, 2025" },
          { label: "Glasgow Gallery", subtitle: "Collective, 2023" }
        ]
      },
      publications: {
        label: "Parutions",
        num: "04",
        items: [
          { name: "Dodho", url: "https://www.dodho.com/the-art-of-silence-by-dubontemps-photography-between-shadow-and-light/" },
          { name: "Duel Magazine", url: "https://www.duelmagazine.com/louis-wallecan/" },
          { name: "National Geographic" },
          { name: "M Le Monde" },
          { name: "Corriere della Sera" },
          { name: "Le Parisien", url: "https://www.leparisien.fr/paris-75/paris-les-restaurateurs-s-associent-pour-offrir-des-repas-aux-etudiants-09-03-2021-8427762.php" },
          { name: "Le Bonbon", url: "https://www.lebonbon.fr/paris/loisirs/ce-jardin-medieval-4000m2-ressucite-plein-paris/" },
          { name: "Epok Formidable", url: "https://www.1-epok-formidable.fr/archives/18498" },
        ]
      }
    },
     contact: {
      title: "hello.",
      placeholderMsg: "votre message",
      placeholderEmail: "votre email",
      submit: "envoyer",
      sending: "...",
      success: "merci",
      error: "erreur",
      instagram: "instagram",
      portfolio: "catalogue sur demande",
      autoRequest: "hello dubontemps, j'aimerais recevoir votre catalogue de tirages d'art."
    },
    footer: {
      location: "48° 53' 10.115\" N 2° 20' 35.246\" E"
    }

  },  
  EN: {
    brand: "dubontemps",
    meta: {
      title: "Dubontemps | Landscape & Documentary Photographer | Paris",
      description: "Dubontemps develops a photographic language between nature, presence, and memory. Explore her series and fine art prints, her awards ((ND Awards MH, Lensculture Editors' Pick) and collaborations (Musée de Cluny)."
    },
    nav: { works: 'images', index: 'index', contact: 'contact', lang: 'français' },
    hero: { 
      url: '/images/dubontemps-smithsonian-2026-biarritz--surfers-mist-washi-lg.jpg',
      alt: 'Surfers in the mist facing Spanish hills, Biarritz, 2026, art print on Japanese washi paper, Dubontemps'
    },
    sections: {
      manifesto: "Manifesto and approach",
      gallery: "Photographic work gallery",
      index: "Index, collaborations and awards",
      contact: "Contact details and social media"
    },
    manifesto: [
  "A landscape is not a backdrop. It is a living language.", 
  "\nIf distant framing evokes the neutrality of a satellite, yet it underscores a fundamental difference: human perception is always subjective.", 
  "\nAs technology influences the way we see, this work questions the persistence of looking: how a subtle signal, even an absence, activates sensations and stir the imagination.",
  "\nPhotography is listening. The image we retain captures nothing. It reveals an encounter between a place and a memory. Each time unpredictable.",
               ],
    bio: {
      label: "",
      lead: "dubontemps explores our relationship to landscape and imagination",
      text: "Documentary photographer based in Paris, she collaborates with artisans, artists and cultural institutions, following a consulting career. Her work focuses on the connections between place, sensation, and memory. Trained in visual storytelling at Lee Strasberg New York, and a graduate of Dauphine and Sciences Po Paris, her approach draws on this dual background, between analytical rigor and perceptual sensitivity. Each print is produced using archival pigment processes on Fine Art paper, baryta, or handmade Japanese washi."
     },
    stream: [
      { 
        id: 'wandering-souls-dubontemps', 
        url: '/images/dubontemps-equationsauvage-2026-palma-shadows-baryta-lg.jpg', 
        caption: 'Wild Equation', 
        coords: "39°34'11\"N 2°38'56\"E",
        year: "ongoing",
        tech: "Pigment inkjet print, baryta paper",
        alt: "Palm shadows and walkers, Palma de Mallorca, Équation Sauvage series 2026, pigment print on baryta paper, Dubontemps",
        note: "" 
      },
       { 
        id: 'between-realms-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-idf-mysterious-windows-matte-lg.jpg', 
        caption: 'Art of Silence', 
        coords: "48°51'24\"N 2°21'08\"E",
        year: "2025",
        tech: "Pigment inkjet print, matte fine art paper",
        alt: "Windows over river in the misty forest, Île-de-France, L’Art of Silence series 2025, pigment print on fine art matte paper, Dubontemps",
        note: "",
        side: 'right'
      },
      { 
        id: 'roots-of-time-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-brittany-tree-shadow-matte-lg.jpg', 
        caption: 'Art of Silence', 
        coords: "48°34'42\"N 4°32'43\"W",
        year: "2025",
        tech: "Pigment inkjet print, matte fine art paper",
        alt: "Large tree's shadows from above, daisies, chair in the distance, Finistère North Brittany, L’Art of Silence series 2025, pigment print on fine art matte paper, Dubontemps",
        note: "" 
      }
    ],
    index: {
      collabs: { 
        label: "Collaborations", 
        num: "01", 
        items: [
            { client: 'Musée national de Cluny', role: "Heritage campaign, documentary, ministerial inauguration.", date: '2025' },
            { client: 'Louis Wallecan', role: "Documentary portrait for Duel Magazine.", date: '2025' },
            { client: 'French Theory', role: "Artists' press portraits, art shooting, exhibition AD.", date: '23-25' },
            { client: 'Communauté Écotable', role: "Portraits of sustainable food (Ground Control, François Hollande x LFSE, Refugee Food,...).", date: '21—24' }
        ] 
      },
      awards: { 
        label: "Awards", 
        num: "02", 
        items: [
            { label: "Smithsonian Magazine", subtitle: "Art Shortlist, 2026" },
            { label: "Lensculture", subtitle: "Art Editors' Pick, 2025" },
            { label: "ND Awards", subtitle: "Honorable Mention, 2025", url: "https://ndawards.net/winners-gallery/nd-awards-2025/professional/landscape/hm/22577/" },
            { label: "World Food Awards", subtitle: "Shortlist Crop, 2023" }
        ] 
      },
      exhibitions: { 
        label: "Exhibitions", 
        num: "03", 
        items: [
            { label: "French Theory Paris", subtitle: "Solo Show, 2025" },
            { label: "Glasgow Gallery", subtitle: "Collective, 2023" }
        ] 
      },
      publications: { 
        label: "Publications", 
        num: "04", 
        items: [
          { name: "Dodho", url: "https://www.dodho.com/the-art-of-silence-by-dubontemps-photography-between-shadow-and-light/" },
          { name: "Duel Magazine", url: "https://www.duelmagazine.com/louis-wallecan/" },
          { name: "National Geographic" },
          { name: "M Le Monde" },
          { name: "Corriere della Sera" },
          { name: "Le Parisien", url: "https://www.leparisien.fr/paris-75/paris-les-restaurateurs-s-associent-pour-offrir-des-repas-aux-etudiants-09-03-2021-8427762.php" },
          { name: "Le Bonbon", url: "https://www.lebonbon.fr/paris/loisirs/ce-jardin-medieval-4000m2-ressucite-plein-paris/" },
          { name: "Epok Formidable", url: "https://www.1-epok-formidable.fr/archives/18498" },
        ] 
      }
    },
    contact: {
      title: "hello.",
      placeholderMsg: "your message",
      placeholderEmail: "your email",
      submit: "send",
      sending: "...", 
      success: "merci",
      error: "error",
      instagram: "instagram",
      portfolio: "catalogue on demand",
      autoRequest: "hello dubontemps, I would like to receive your fine art print catalogue."
    },
    footer: {
      location: "48° 53' 10.115\" N 2° 20' 35.246\" E"
    }
  }
};

const TypographyStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&family=Shippori+Mincho:wght@300;400;500;600;700&display=swap');

    :root {
      --bg-white: #FFFFFF;
      --bg-off-white: #F9F9F9;
      --border-light: #F0F0F0;
      --ink: #111111;
      --ink-soft: #555555; 
      --accent: #97A9B4;
      --accent-soft : rgba(151, 169, 180, 0.08);
      --sans: 'Inter', sans-serif;
      --serif: 'Shippori Mincho', serif;
      --header-h: 120px;
      --feed-margin-v: 32px;
    }

    body { 
      background-color: var(--bg-white); 
      color: var(--ink); 
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      margin: 0;
      overflow-x: clip;
      position: relative; 
      scrollbar-width: none; /* Pour Firefox */
      -ms-overflow-style: none; /* Pour Edge/IE */
}
/* Pour Chrome, Safari et Opera */
body::-webkit-scrollbar { display: none;
    }
    html, body {
      max-width: 100%;
      overflow-x: clip;
      position: relative;
    }
    a, button {
      text-decoration: none;
      color: inherit;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
    }
    button:focus {
      outline: none;
    }
    button:focus-visible {
      outline: 1px solid var(--accent);
      outline-offset: 2px;
    }
    .logo-style {
      font-family: var(--serif);
      font-size: 24px; 
      font-weight: 500; 
      letter-spacing: -0.03em; 
      background: none;
      border: none;
      color: var(--ink);
      padding: 0; 
      line-height: 1; 
      display: inline-flex;
      align-items: baseline;
      text-transform: lowercase; 
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }   
    .logo-style:hover { color: var(--accent); 
    }
   .nav-title {
     font-family: var(--sans);
     font-size: 18px;
     font-weight: 300; 
     text-transform: uppercase;
     line-height: 1;
     letter-spacing: 0.1em;
     transition: color 0.4s ease;
     background: none; /* Sécurité pour éviter le fond noir */
     border: none;
     padding: 0;
     color: var(--ink);
     transition: color 0.5s ease;
      }
    .nav-title:hover { color: var(--accent); }

    .menu-btn-plus {
      font-family: var(--sans);
      font-size: 36px; 
      font-weight: 100;
      line-height: 1;
      background: transparent;
      border: none;
      outline: none !important;
      display: inline-flex;
      width: auto;
    }
    .text-meta { 
      font-size: 11px; 
      letter-spacing: 0.2em; 
      text-transform: uppercase; 
      opacity: 0.3; 
      font-weight: 400; 
    }
    .footer-text {
      font-size: 9px;
      text-transform: uppercase; 
      text-transform: lowercase;
      letter-spacing: 0.2em;
      font-weight: 300;
      opacity : 0.15;
    }
  .manifesto-large {
    font-family: var(--sans);
    font-size: 14px; 
    text-transform: uppercase;
    line-height: 1.6;
    letter-spacing: 0.2em;
    opacity: 0.6; 
    font-weight: 300;
    color: var(--ink);
    max-width: 100%; 
    margin: 0;
    white-space: pre-line;
    text-align: left; 
    padding-left: 10%;  
    padding-right: 10%;
    }
    .bio-lead {
     font-family: var(--serif);
     letter-spacing: -0.02em;
     font-weight: 400;
     font-size: 16px;
     line-height: 1.7;
     margin-bottom: 20px;        
     color: var(--ink);
     opacity: 1;
    }
    .bio-text {
      font-size: 14px;
      font-weight: 300;
      line-height: 1.7;
      color: var(--ink);
      opacity: 0.6;
    }
    .index-num { 
      font-size: 11px; 
       letter-spacing: 0.2em; 
      font-weight: 400;
      opacity: 0.3;
      display: block; 
    }
    .index-label { 
      font-size: 11px; 
      letter-spacing: 0.2em; 
      text-transform: uppercase; 
      font-weight: 400; 
      opacity: 0.3;
      margin-bottom: 20px;  
      display: block;
    }
    .index-section-col {
      opacity: 1;
      transition: opacity 0.8s ease;
      display: flex;
      flex-direction: column;
    }
    .index-item-static { 
      font-family: var(--serif); 
      font-size: 14px; 
      font-weight: 500; 
      letter-spacing: -0.02em;
      line-height: 1.2; 
      color: var(--ink);
    }
    .index-item-link { 
      font-family: var(--serif); 
      font-size: 14px; 
      font-weight: 500; 
      letter-spacing: -0.02em;
      line-height: 1.2; 
      transition: all 0.3s ease;
      color: var(--ink);
      display: inline-block;
      position: relative;
      border-bottom: 1px solid rgba(17, 17, 17, 0.15); 
      padding-bottom: 1px;
    }
    .index-item-link:hover { 
      color: var(--accent); 
      transform: translateX(6px); 
      border-bottom: 0.5px solid var(--accent);
    }
    .index-item-sub { 
      font-size: 14px; 
      font-weight: 300; 
      opacity: 0.5; 
      margin-top: 4px; 
      line-height: 1.3;
    }
   .bento-tile {
      background: var(--bg-white);
      border-top: 0px solid var(--border-light);
      padding: 40px;
      display: flex;
      flex-direction: column;
      transition: border-color 0.6s ease;
      height: 100%;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .bento-tile:hover {
      transform: translateY(-4px);
      box-shadow: 0 15px 50px rgba(0,0,0,0.03);
      }
    .bg-index-gradient {
      background: linear-gradient(to bottom, var(--bg-white) 0%, rgba(252, 252, 252, 0.5) 50%, var(--bg-off-white) 100%);
    }
    .lightbox-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: white; 
      z-index: 5000;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: zoom-out;
    }
    .lightbox-img {
      width: 100%;
      height: 100%;
      object-fit: contain; 
      padding: 0; 
    }
    .contact-hello { font-size: 16px ; font-weight: 400;}
    .contact-input {
      width: 100%; 
      font-family:var(--sans);
      color: var(--ink); 
      font-size: 16px;
      font-weight: 400; 
      opacity: 0.5;
      display: block;
      transition: border-bottom 0.4s ease;
      outline: none;
      padding: 12px 0;
      border-bottom: 0.5px solid rgba(0,0,0,0.1);
      background: transparent;
      border-top: none; border-left: none; border-right: none;
      box-sizing: border-box;
      max-width: 100%;
    }
    .contact-input::placeholder {
      color: currentColor;
      opacity: 0.4;
    }
    .contact-input:focus {
      border-bottom: 0.5px solid var(--ink);
    }
    .contact-submit-btn { border: none; background: transparent; padding: 12px 0; margin: 0; cursor: pointer; display: inline-flex; align-items: center; transition: color 0.4s ease; }
    .contact-arrow-icon { 
      margin-left: 0; 
      opacity: 0.4;   /* Visible mais discrète au repos */
      transform: translateX(0); 
      transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1); 
      display: inline-block;
      font-size: 32px; 
      font-weight: 100;
    }
    .contact-submit-btn:hover .contact-arrow-icon { opacity: 1; transform: translateX(15px); }
    .contact-status {font-family:var(--sans); font-size: 16px ; font-weight: 400; text-transform: lowercase; opacity: 0.5;
    margin-top: 4px;
    }
 
    @media (max-width: 768px) {
      :root {
        --feed-margin-v: 24px;
        --header-h: 80px;
      }

    .bento-tile { padding: 32px 24px; 
    }
    .index-slider-mobile {
        display: flex;                 
        overflow-x: auto;
       -webkit-overflow-scrolling: touch;
        scroll-snap-type: x mandatory;
        width: 100%; max-width: 100vw; 
        box-sizing: border-box;   
        padding-bottom: 2rem;
        padding-right: 24px;    
        padding-left: 24px; 
        scroll-padding-left: 24px;
        overflow-y: hidden;
        scrollbar-width: none;                      
      }
    .index-slider-mobile::-webkit-scrollbar { display: none; 
      }
    .bento-col-mobile {
        flex-shrink: 0; 
        box-sizing: border-box;   
        scroll-snap-align: start;  
        margin-right: 0;  
        padding-right: 24px;
        flex: 0 0 80%; 
    }
    .bento-col-mobile:nth-child(1) { flex: 0 0 80%; } 
    .bento-col-mobile:nth-child(2) { flex: 0 0 70%; } 
    .bento-col-mobile:nth-child(3) { flex: 0 0 70%; } 
    .bento-col-mobile:nth-child(4) { flex: 0 0 70%; margin-right: 0; } 

    .bento-col-mobile p {
        white-space: normal; /* retour à la ligne */
        overflow-wrap: break-word; /* Coupe les mots trop longs si besoin */
     }
    .bg-index-gradient {
     background: linear-gradient(to bottom, var(--bg-white) 0%, var(--bg-off-white) 100%);
     overflow: hidden;
     }   
    #contact-anchor { width: 100%; overflow-x: hidden; 
      }

/* SEO Helper - Masqué visuellement mais accessible aux robots */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
    }
} 
  `}</style>
);

  const MixedText = ({ text }) => text || null;

  export default function App() {
    const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
        const browserLang = navigator.language.split('-')[0].toUpperCase();
        return browserLang === 'FR' ? 'FR' : 'EN';    }
    return 'EN';});
    const [headerVisible, setHeaderVisible] = useState(false); 
    const [lastScrollY, setLastScrollY] = useState(0);
    const [zoomImage, setZoomImage] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    // SÉCURITÉ : Si les données n'existent pas, on affiche un message d'erreur plutôt qu'une page blanche
    if (!CONTENT || !CONTENT[lang]) return <div>Loading data...</div>;

    // Formulaire etats et envoi
    const [messageValue, setMessageValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState(null);
    const formRef = useRef(null);

    const handleCatalogueClick = () => {
      setMessageValue(CONTENT[lang].contact.autoRequest);
      if (formRef.current) {
        const offset = window.innerWidth < 768 ? 80 : 120;
        const targetPosition = formRef.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: targetPosition - offset, behavior: 'smooth' });
      }
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setFormStatus(null);
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("https://formspree.io/f/mvzrbjyd", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setFormStatus('success');
          e.target.reset();
          setMessageValue("");  } 
        else {
          setFormStatus('error');
        }
      } catch (error) {
        setFormStatus('error');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setFormStatus(null), 5000);
      }
  };

  // SEO & Head Management (Open Graph Integration)
    useEffect(() => {
      document.title = CONTENT[lang].meta.title;
      document.documentElement.lang = lang.toLowerCase();
      
      // Description Meta
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = CONTENT[lang].meta.description;

      // Open Graph Management
      const setMetaProperty = (property, content) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', property);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      // On utilise l'image du Hero pour le partage
      const ogImage = `https://dubontemps.org${CONTENT[lang].hero.url}`;
      const siteUrl = "https://dubontemps.org";

      setMetaProperty('og:title', CONTENT[lang].meta.title);
      setMetaProperty('og:description', CONTENT[lang].meta.description);
      setMetaProperty('og:image', ogImage);
      setMetaProperty('og:url', siteUrl);
      setMetaProperty('og:type', 'website');
      setMetaProperty('og:site_name', 'dubontemps');

    }, [lang]);

  // JSON-LD Structured Data
    const structuredData = useMemo(() => {
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "dubontemps",
        "url": "https://dubontemps.org", // URL fixe pour le SEO
        "jobTitle": "Photographer",
        "description": CONTENT[lang].meta.description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressCountry": "FR"
        },
        "sameAs": [
          "https://www.instagram.com/_dubontemps_/"
        ]
      };
    }, [lang]);

  useEffect(() => {
      const unsubscribe = scrollY.on("change", (latest) => {
      // 1. Sécurité absolue : Toujours caché au point 0 (ouverture)
      if (latest <= 10) {
        setHeaderVisible(false);      } 
      // 2. Si on remonte (latest < lastScrollY), on affiche PEU IMPORTE la position
      else if (latest < lastScrollY) {
        setHeaderVisible(true);} 
      // 3. Si on descend (latest > lastScrollY), on cache
      else {
        setHeaderVisible(false);      }
      setLastScrollY(latest);    });
      return () => unsubscribe();    }, [scrollY, lastScrollY]);

    const scrollTo = (id) => {
      setIsMenuOpen(false); // Sécurité : on ferme toujours le menu avant de scroller
      const target = document.getElementById(id);
      if (!target) return; // Sécurité : évite l'erreur si l'ID n'existe pas

      // Valeurs sûres pour ne pas couvrir le titre de la section
      const offset = window.innerWidth < 768 ? 80 : 120;
      
      // Calcul de position absolue (plus fiable que le calcul relatif)
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

    const stream = CONTENT[lang].stream;
    const indexData = CONTENT[lang].index;
    const footerData = CONTENT[lang].footer;
    const navData = CONTENT[lang].nav;
    const sectionTitles = CONTENT[lang].sections;
    const contactData = CONTENT[lang].contact;
    const bioData = CONTENT[lang].bio;

    const smoothSpring = { type: 'spring', stiffness: 50, damping: 20, mass: 1 };

    return (
      <div className="relative w-full bg-white">
        <TypographyStyles />
        
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

        <AnimatePresence>
          {zoomImage && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setZoomImage(null)}
              className="lightbox-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Aperçu image agrandie"
            >
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                src={zoomImage} 
                className="lightbox-img" 
                alt="Image en plein écran"
              />
            </motion.div>
          )}
        </AnimatePresence>

  {/* 1. BOUTON + (Fixe en haut à droite) */}
    <div className="fixed top-0 right-0 z-[5100] w-full md:w-screen px-6 md:px-[10%] h-[var(--header-h)] flex items-center justify-end pointer-events-none">   
       <motion.button 
      onClick={() => setIsMenuOpen(!isMenuOpen)} 
      animate={{ 
        rotate: isMenuOpen ? 45 : 0,
        color: isMenuOpen ? "var(--ink)" : (headerVisible ? "var(--ink)" : "transparent")
      }}
      transition={smoothSpring}
      className="menu-btn-plus pointer-events-auto flex items-center justify-center translate-x-[25%]"
      style={{ pointerEvents: headerVisible || isMenuOpen ? 'auto' : 'none' }}
    >
      +
      </motion.button>
  </div>

{/* 2. LOGO CENTRAL (Apparaît au scroll ou quand menu ouvert) */}
<AnimatePresence>
  {(headerVisible || isMenuOpen) && (
    <motion.header 
      initial={{ y: -40, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: -40, opacity: 0 }}
      transition={smoothSpring}
      className="fixed top-0 left-0 w-full z-[5090] h-[var(--header-h)] flex items-center justify-center pointer-events-none"
    >   
      <button 
        onClick={() => { if(!isMenuOpen) window.scrollTo({top: 0, behavior: 'smooth'}); }} 
        className="logo-style pointer-events-auto" >
        {CONTENT[lang].brand}
      </button>
    </motion.header>
  )}
</AnimatePresence>

{/* 3. LE NOUVEAU MENU OVERLAY (Navigation Typographique) */}
<AnimatePresence>
  {isMenuOpen && (
    <div className="fixed inset-0 z-[4040]">
       {/* Fond avec léger flou */}
       <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
       
       {/* Liste des liens alignés à droite */}
<div className="absolute top-[calc(var(--header-h)*1.2)] right-0 w-full px-6 md:px-[10%] flex flex-col items-end gap-10 md:gap-14 pointer-events-auto">           
   {[{ id: 'works-anchor', text: navData.works },
            { id: 'index-anchor', text: navData.index },
            { id: 'contact-anchor', text: navData.contact },
            { id: 'lang-switch', text: navData.lang, isLang: true }
          ].map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                if (item.isLang) {
                  setLang(l => l === 'FR' ? 'EN' : 'FR');
                } else {
                  scrollTo(item.id);
                }
                setIsMenuOpen(false);
              }}
              className={`nav-title ${item.isLang ? 'mt-8 opacity-30 tracking-normal normal-case text-sm' : ''}`}
            >
              {item.text}
            </motion.button>
          ))}
       </div>
    </div>
  )}
</AnimatePresence>

 <main className="relative z-[5] w-full">

            <section className="sticky top-0 h-screen w-full max-w-full z-0 bg-white pointer-events-none">              
           <motion.img 
              initial={{ opacity: 0, scale: 1.05 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.5 }} 
              src={CONTENT[lang].hero.url} 
              alt={CONTENT[lang].hero.alt}
              className="w-full h-full object-cover object-bottom" 
            />
          </section>
 
  <div className="relative z-10 bg-white">
    <div className="bg-index-gradient">

  {/* LA GALERIE UNIQUE */}
          <section className="bg-transparent pt-[30vh] space-y-[30vh] md:space-y-[30vh] relative" aria-labelledby="section-gallery">
            <div id="works-anchor" className="absolute top-[-100px] left-0" aria-hidden="true" />
            <h2 id="section-gallery" className="sr-only">{sectionTitles.gallery}</h2>
            
            {stream.map((item, idx) => (
              <React.Fragment key={item.id}>

    {/* Nouveau Manifeste en grand avant l'image 4 */}
            {idx === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="w-full py-0 px-6 text-center"
              >
                <p className="manifesto-large">
                  {CONTENT[lang].manifesto.join('\n')}
                </p>
              </motion.div>
            )}

  {/* L'ARTICLE IMAGE */}
              <motion.article 
                key={item.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true, margin: "-10%" }}
                className={`flex flex-col px-6 md:px-0 ${item.side === 'right' ? 'md:items-end md:pr-[10%]' : 'md:items-start md:pl-[10%]'}`}
              >
                <figure className="w-full md:w-[55vw] m-0 p-0">
                  <div className="flex justify-between items-end mb-6">
                    <div className="text-meta">
                      <span className="sr-only">Project</span> {`${String(idx + 1).padStart(2, '0')} / ${String(stream.length).padStart(2, '0')}`}
                    </div>
                    <div className="text-meta text-right">
                      {item.tech}
                    </div>
                  </div>

                  <div 
                    className="overflow-hidden bg-zinc-50 cursor-zoom-in" 
                    onClick={() => setZoomImage(item.url)}
                    role="button"
                    aria-label={`Enlarge image: ${item.caption}`}
                    tabIndex="0"
                    onKeyDown={(e) => e.key === 'Enter' && setZoomImage(item.url)}
                  >
                    <motion.img 
                      whileHover={{ scale: 1.01 }} 
                      src={item.url} 
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-auto transition-transform duration-[1500ms]" 
                    />
                  </div>

                  <figcaption className="mt-6 text-right flex flex-col items-end gap-1">                
                  <h2 className="text-meta m-0">{item.caption}</h2>
                  {item.coords && ( <span className="text-meta"> {item.coords} </span>  )}
                  <span className="text-meta m-0">{item.year}</span>
                </figcaption>
                </figure>
              </motion.article>
              </React.Fragment>
            ))}
          </section>

          {/* Index & Contact Combined */}
            
            {/* Bento Index */}
            <section id="index-anchor" className="px-0 md:px-[10%] mb-[20vh] pt-[30vh]">
              <div className="hidden md:grid grid-cols-4 gap-10 grid-rows-[auto_auto_auto]">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="col-span-3">
                  <div className="bento-tile">
                    <h3 className="bio-lead">{bioData.lead}</h3>
                    <p className="bio-text">{bioData.text}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="col-start-4 row-span-2">
                  <div className="bento-tile">
                    <span className="index-num">01</span><h4 className="index-label">{indexData.collabs.label}</h4>
                    <ul className="list-none p-0 space-y-8">
                      {indexData.collabs.items.map((c, i) => (
                        <li key={i}>
                          {c.url ? (
                            <a href={c.url} target="_blank" rel="noreferrer" className="index-item-link m-0">{c.client}</a> ) : (
                            <p className="index-item-static m-0">{c.client}</p> )}
                          <p className="index-item-sub m-0">{c.role} — {c.date}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="col-span-2">
                  <div className="bento-tile">
                    <span className="index-num">02</span><h4 className="index-label">{indexData.awards.label}</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                      <div className="flex flex-col gap-12">
                        {indexData.awards.items.slice(0, 2).map((a, i) => (
                          <div key={i}>
                            {a.url ? (
                              <a href={a.url} target="_blank" rel="noreferrer" className="index-item-link m-0">{a.label}</a> ) : (
                              <p className="index-item-static m-0">{a.label}</p>  )}
                            <p className="index-item-sub m-0">{a.subtitle}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-12">
                        <div><p className="index-item-static m-0">{indexData.awards.items[2].label}</p><p className="index-item-sub m-0">{indexData.awards.items[2].subtitle}</p></div>
                        <div className="opacity-10 border-t border-dashed border-black mt-2 pt-2"><p className="text-xs uppercase tracking-widest font-semibold">Award imminent</p></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="col-span-1">
                  <div className="bento-tile">
                    <span className="index-num">03</span><h4 className="index-label">{indexData.exhibitions.label}</h4>
                    <ul className="list-none p-0 space-y-8">
                      {indexData.exhibitions.items.map((e, i) => (
                        <li key={i}>
                          {e.url ? (
                            <a href={e.url} target="_blank" rel="noreferrer" className="index-item-link m-0">{e.label}</a>   ) : (
                            <p className="index-item-static m-0">{e.label}</p>  )}
                          <p className="index-item-sub m-0">{e.subtitle}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="col-span-4">
                  <div className="bento-tile">
                    <span className="index-num">04</span><h4 className="index-label">{indexData.publications.label}</h4>
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 list-none p-0">
                      {indexData.publications.items.map((p, i) => (
                        <li key={i}>
                          {p.url ? <a href={p.url} target="_blank" rel="noreferrer" className="index-item-link">{p.name}</a> : <span className="index-item-static">{p.name}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="px-6 mb-4">
                   <div className="bento-tile">
                      <h3 className="bio-lead">{bioData.lead}</h3>
                      <p className="bio-text">{bioData.text}</p>
                   </div>
                </div>
                <div className="index-slider-mobile">
                   {['collabs', 'awards', 'exhibitions', 'publications'].map((key, idx) => (
                     <div className="bento-col-mobile" key={key}>
                        <div className="bento-tile">
                          <span className="index-num">0{idx + 1}</span>
                          <h4 className="index-label">{indexData[key].label}</h4>
                          <ul className={`list-none p-0 ${key === 'publications' ? 'space-y-4' : 'space-y-8'}`}>
                            {indexData[key].items.map((item, i) => (
                              <li key={i}> {item.url ? ( <a href={item.url} target="_blank" rel="noreferrer" 
                              className="index-item-link m-0"> {item.client || item.label || item.name} </a> ) : ( <p 
                              className="index-item-static m-0">{item.client || item.label || item.name} </p> )} <p 
                              className="index-item-sub m-0 text-xs">{item.role || item.subtitle}</p> 
                              </li>
                            ))}
                          </ul>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </section>

      {/* CONTACT & FOOTER */}
          <section id="contact-anchor" className="w-full px-6 md:px-[10%]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-end">

      {/* Colonne Gauche : Hello & Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <h3 ref={formRef} className="contact-hello mb-8">{contactData.title}</h3>

        <form onSubmit={handleFormSubmit} className="max-w-md">
          {/* Honeypot Anti-Spam */}
          <input type="text" name="_gotcha" style={{ display: "none" }} />

          <input 
            type="email" name="email" required 
            placeholder={contactData.placeholderEmail} 
            className="contact-input" 
          />
          <textarea 
            name="message" required 
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            placeholder={contactData.placeholderMsg} 
            className="contact-input min-h-[50px] resize-none" 
          />

          <div className="flex items-center gap-4">
            <button type="submit" disabled={isSubmitting} 
            className="contact-submit-btn group flex items-center gap-3">
              <AnimatePresence mode="wait">
                {(isSubmitting || formStatus) && (
                  <motion.span
                    key={formStatus || 'sending'}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    className="contact-status w-auto p-0"
                  >
                    {isSubmitting ? "..." : (formStatus === 'success' ? "merci" : "erreur")}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="contact-arrow-icon">⟶</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* Colonne Droite : Liens & Localisation */}
   <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} 
     className="flex flex-col items-end text-right gap-6">
     <div className="flex flex-col gap-4 mb-8">
     <a href="https://www.instagram.com/_dubontemps_/" target="_blank" rel="noopener noreferrer" 
      className="nav-title">{contactData.instagram}</a>
      <button onClick={handleCatalogueClick} className="nav-title">{contactData.portfolio}</button>
        </div>
    </motion.div>
      </div>

    {/* Signature Footer */}
  <footer className="w-full pb-8 flex justify-between items-center">
  <div className="text-left">
    <p className="text-meta opacity-20 text-[7px] uppercase tracking-widest">
      {footerData.location}
    </p>
  </div>
  <div className="text-right">
    <p className="text-meta opacity-20 text-[7px] uppercase tracking-widest">
      © {new Date().getFullYear()} {CONTENT[lang].brand}
    </p>
  </div>
</footer>
        
  </section>
    
    </div>
    </div>
  </main>
  </div>
  );
  }