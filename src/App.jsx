import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './App.css';

/**
 * --- CONFIGURATION DU THÈME & CONTENUS ---
 */
const CONTENT = {
  FR: {
    brand: "dubontemps",
    meta: {
      title: "Dubontemps | Photographe paysage & documentaire | Paris",
      description: "Dubontemps développe une écriture photographique entre paysage, présence et mémoire. Explorez ses séries et tirages d'art, distinctions (ND Awards MH, Lensculture Editors' Pick) et collaborations (Musée de Cluny)."
    },
    nav: { works: 'images', index: 'index', contact: 'contact', menu: 'menu' },
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
      "Un paysage est une scène active.",
      "Un champ d’interactions imprévisibles.", 
      "",
      "La distance et la hauteur révèlent", 
      "le signal ou l'absence qui déplace le regard.",
      "",
      "Mais l’image ne capture pas :", 
      "elle naît de la [[relation]] et de la [[mémoire]].",
    ],
    stream: [
      { 
        id: 'wandering-souls-dubontemps', 
        url: '/images/dubontemps-equationsauvage-2026-palma-shadows-baryta-lg.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier baryté",
        alt: "Ombres de palmier et marcheurs, Palma de Majorque, série Équation Sauvage 2026, tirage pigmentaire papier baryté, Dubontemps",
        note: "Les technologies prédictives cherchent à effacer l’inconnu. L’imaginaire cultive [[l’imprévu]]." 
      },
      { 
        id: 'vertigo-dubontemps', 
        url: '/images/dubontemps-wild-equation-2026-pacific-aerial-view-sandbank-washi-lg.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier washi japonais",
        alt: "Vue aérienne d'un banc de sable dans l’océan Pacifique, Vancouver Island, série Équation Sauvage 2026, tirage pigmentaire papier washi japonais, Dubontemps",
        note: "Voir ce qui est prêt de [[disparaître]].", 
        side: 'right'
      },
      { 
        id: 'echoes-of-the-woods-dubontemps', 
        url: '/images/dubontemps-wild-equation-2026-clayoquot-sound-aerial-view-forest-washi-lg.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier washi japonais",
        alt: "Forêt primitive dans la brume, Clayoquot Sound, Vancouver Island, série Équation Sauvage 2026, tirage pigmentaire papier washi japonais, Dubontemps",
        note: "La nature n’est pas un décor, c'est un [[langage]]." 
      },
      { 
        id: 'between-realms-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-idf-mysterious-windows-matte-lg.jpg', 
        caption: "L’art du silence", 
        year: "2025",
        tech: "Tirage pigmentaire, papier fine art mat",
        alt: "Fenêtres sur la rivière dans une forêt brumeuse, Île-de-France, série L’Art du Silence 2025, tirage pigmentaire papier fine art mat, Dubontemps",
        note: "Un [[chemin]] s'esquisse entre le visible et l'invisible.",
        side: 'right'
      },
      { 
        id: 'roots-of-time-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-brittany-tree-shadow-matte-lg.jpg', 
        caption: "L’art du silence", 
        year: "2025",
        tech: "Tirage pigmentaire, papier fine art mat",
        alt: "Grand arbre et ombres vues de haut, pâquerettes, chaise en retrait, Finistère Nord Bretagne, série L’Art du Silence 2025, tirage pigmentaire papier fine art mat, Dubontemps",
        note: "[[Rêver]] c'est résister." 
      }
    ],
    index: {
      intro: "Nature . Présence . Mémoire . Sélection de Travaux 2018—2026",
      collabs: {
        label: "Collaborations",
        num: "01",
        items: [
          { client: 'Musée national de Cluny', role: "Végétalisation de 4000m2 dans Paris. Campagne patrimoniale, reportages, inauguration ministérielle.", date: '2025' },
          { client: 'Louis Wallecan', role: "Portrait documentaire pour Duel Magazine. Art shooting et DA d'exposition pour French Theory.", date: '2025' },
          { client: 'Communauté Écotable', role: "Portraits sur l'alimentation durable (Ground Control, François Hollande pour La France s'engage, Isana, Refugee Food, etc.).", date: '21—24' }
        ]
      },
      awards: {
        label: "Distinctions",
        num: "02",
        items: [
          { label: "Lensculture Art", subtitle: "Editors' Pick, 2025" },
          { label: "ND Awards", subtitle: "Honorable Mention, 2025", url: "https://ndawards.net/winners-gallery/nd-awards-2025/professional/landscape/hm/22577/" },
          { label: "World Food Awards", subtitle: "Shortlist Crop, 2022" }
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
          { name: "National Geographic", url: "https://www.facebook.com/NatGeoHistory/posts/rosy-faced-lovebirds-are-a-species-of-parrot-known-for-typically-monogamou/10156100536768336/" },
          { name: "Le Parisien", url: "https://www.leparisien.fr/paris-75/paris-les-restaurateurs-s-associent-pour-offrir-des-repas-aux-etudiants-09-03-2021-8427762.php" },
          { name: "Le Bonbon", url: "https://www.lebonbon.fr/paris/loisirs/ce-jardin-medieval-4000m2-ressucite-plein-paris/" },
          { name: "M Le Monde" },
          { name: "Corriere della Sera" }
        ]
      }
    },
    footer: {
      location: "rue lamarck, paris",
      links: [
        { label: "email", url: "mailto:alexandra@dubontemps.org" },
        { label: "instagram", url: "https://www.instagram.com/_dubontemps_/" },
        { label: "portfolio", url: "https://drive.google.com" }
      ]
    }
  },
  EN: {
    brand: "dubontemps",
    meta: {
      title: "Dubontemps | Landscape & Documentary Photographer | Paris",
      description: "Dubontemps develops a photographic language between landscape, presence, and memory. Explore her series and fine art prints, her awards ((ND Awards MH, Lensculture Editors' Pick) and collaborations (Musée de Cluny)."
    },
    nav: { works: 'images', index: 'index', contact: 'contact', menu: 'menu' },
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
      "A landscape is an active stage.",
      "A field of unpredictable interactions.",
      "",
      "Distance and height reveal",
      "the signal or the absence that shifts the gaze.",
      "",
      "But the image does not capture:",
      "it arises from [[relation]] and from [[memory]].",
    ],
    stream: [
      { 
        id: 'wandering-souls-dubontemps', 
        url: '/images/dubontemps-equationsauvage-2026-palma-shadows-baryta-lg.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, baryta paper",
        alt: "Palm shadows and walkers, Palma de Mallorca, Équation Sauvage series 2026, pigment print on baryta paper, Dubontemps",
        note: "Predictive technologies seek to erase the unknown. Imagination nurtures the [[unforeseen]]." 
      },
      { 
        id: 'vertigo-dubontemps', 
        url: '/images/dubontemps-wild-equation-2026-pacific-aerial-view-sandbank-washi-lg.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, handmade Japanese washi paper",
        alt: "Aerial view of a sandbank in the Pacific Ocean, Vancouver Island, Équation Sauvage series 2026, pigment print on Japanese washi paper, Dubontemps",
        note: "Witnessing what is about to [[disappear]].", 
        side: 'right'
      },
      { 
        id: 'echoes-of-the-woods-dubontemps', 
        url: '/images/dubontemps-wild-equation-2026-clayoquot-sound-aerial-view-forest-washi-lg.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, handmade Japanese washi paper",
        alt: "Primitive forest in the mist, Clayoquot Sound, Vancouver Island, Équation Sauvage series 2026, pigment print on Japanese washi paper, Dubontemps",
        note: "Nature is not a backdrop, it is a [[language]]." 
      },
      { 
        id: 'between-realms-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-idf-mysterious-windows-matte-lg.jpg', 
        caption: 'Art of Silence', 
        year: "2025",
        tech: "Pigment inkjet print, matte fine art paper",
        alt: "Windows over river in the misty forest, Île-de-France, L’Art of Silence series 2025, pigment print on fine art matte paper, Dubontemps",
        note: "A [[path]] is traced between visible and invisible.",
        side: 'right'
      },
      { 
        id: 'roots-of-time-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-brittany-tree-shadow-matte-lg.jpg', 
        caption: 'Art of Silence', 
        year: "2025",
        tech: "Pigment inkjet print, matte fine art paper",
        alt: "Large tree's shadows from above, daisies, chair in the distance, Finistère North Brittany, L’Art of Silence series 2025, pigment print on fine art matte paper, Dubontemps",
        note: "To [[dream]] is to resist." 
      }
    ],
    index: {
      intro: "Nature . Presence . Memory . Selected Work 2018—2026",
      collabs: { 
        label: "Collaborations", 
        num: "01", 
        items: [
            { client: 'Musée national de Cluny', role: "Re-wilding of 4000m2 in Paris. Heritage campaign, documentary, ministerial inauguration.", date: '2025' },
            { client: 'Louis Wallecan', role: "Documentary portrait for Duel Magazine. Art shooting, exhibition AD for French Theory", date: '2025' },
            { client: 'Communauté Écotable', role: "Portraits on sustainable food (Ground Control, François Hollande pour La France s'engage, Isana, Refugee Food, etc.).", date: '21—24' }
        ] 
      },
      awards: { 
        label: "Awards", 
        num: "02", 
        items: [
            { label: "Lensculture Art", subtitle: "Editors' Pick, 2025" },
            { label: "ND Awards", subtitle: "Honorable Mention, 2025", url: "https://ndawards.net/winners-gallery/nd-awards-2025/professional/landscape/hm/22577/" },
            { label: "World Food Awards", subtitle: "Shortlist Crop, 2022" }
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
          { name: "National Geographic", url: "https://www.facebook.com/NatGeoHistory/posts/rosy-faced-lovebirds-are-a-species-of-parrot-known-for-their-typically-monogamou/10156100536768336/" },
          { name: "Le Parisien", url: "https://www.leparisien.fr/paris-75/paris-les-restaurateurs-s-associent-pour-offrir-des-repas-aux-etudiants-09-03-2021-8427762.php" },
          { name: "Le Bonbon", url: "https://www.lebonbon.fr/paris/loisirs/ce-jardin-medieval-4000m2-ressucite-plein-paris/" },
          { name: "M Le Monde" },
          { name: "Corriere della Sera" }
        ] 
      }
    },
    footer: {
      location: "rue lamarck, paris",
      links: [
        { label: "email", url: "mailto:alexandra@dubontemps.org" },
        { label: "instagram", url: "https://www.instagram.com/_dubontemps_/" },
        { label: "portfolio", url: "https://drive.google.com" }
      ]
    }
  }
};

const TypographyStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&family=Shippori+Mincho:wght@300;400;500;600;700&display=swap');

    :root {
      --bg-white: #FFFFFF;
      --ink: #111111;
      --ink-soft: #555555; 
      --carmine: #E60026;
      --sans: 'Inter', sans-serif;
      --serif: 'Shippori Mincho', serif;
      --header-h: 84px;
      --feed-margin-v: 32px;
    }

    body { 
      background-color: var(--bg-white); 
      color: var(--ink); 
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      margin: 0;
      overflow-x: hidden;
    }

    a, button {
      text-decoration: none;
      color: inherit;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
    }

    .logo-style {
      font-family: var(--serif);
      font-size: 24px; 
      font-weight: 500; 
      letter-spacing: -0.05em;
      background: none;
      border: none;
      color: var(--ink);
      padding: 0; 
      line-height: 1; 
      display: inline-flex;
      align-items: center;
      transform: translateY(-1.5px);
      text-transform: lowercase; 
      transition: color 0.4s ease;
      margin-top: 0;
    }
    .logo-style:hover { color: var(--carmine); }

    .brand-style { 
      font-family: var(--sans);
      font-size: 18px; 
      font-weight: 400; 
      letter-spacing: -0.05em;
      background: none;
      border: none;
      color: var(--ink);
      padding: 0;
      line-height: 1; 
      text-transform: lowercase;
      transition: color 0.4s ease, transform 0.3s ease;
      margin-top: 0; 
    }
    .brand-style:hover { color: var(--carmine); }

    .mobile-nav-btn {
      font-family: var(--sans);
      font-size: 18px;
      font-weight: 400;
      text-transform: lowercase;
      letter-spacing: -0.02em;
      line-height: 1;
      transition: color 0.4s ease;
      margin-top: 0; 
      -webkit-appearance: none;
      background: transparent;
      border: none;
    }

    .nav-blur {
      backdrop-filter: blur(20px);
      background-color: rgba(255, 255, 255, 0.85);
    }

    .scroll-progress-container-desktop {
      position: fixed;
      left: 40px; 
      top: 50%;
      transform: translateY(-50%);
      height: 18vh; 
      width: 1px;
      background: rgba(0,0,0,0.05);
      z-index: 1000;
      pointer-events: none;
    }
    .scroll-progress-bar-desktop {
      width: 100%;
      background: var(--carmine);
      transform-origin: top;
    }

    .scroll-progress-container-mobile {
      position: fixed;
      top: var(--header-h);
      left: 0;
      width: 100%;
      height: 1px;
      background: rgba(0,0,0,0.05);
      z-index: 1001;
      pointer-events: none;
    }
    .scroll-progress-bar-mobile {
      height: 100%;
      background: var(--carmine);
      transform-origin: left;
    }

    .text-meta-label { 
      font-size: 12px; 
      letter-spacing: 0.18em; 
      text-transform: uppercase; 
      opacity: 0.25; 
      font-weight: 600; 
    }
    
    .text-meta-title {
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--ink);
      opacity: 0.5;
      display: block;
      line-height: 1.2;
    }
    
    .text-meta-date {
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 400;
      opacity: 0.25;
      display: block;
      margin-top: 4px;
    }

    .text-note, .text-manifesto { 
      font-size: 16px; 
      letter-spacing: 0.01em;
      line-height: 1.8; 
      font-weight: 300; 
      color: var(--ink-soft); 
      max-width: 44ch; 
    }

    .index-intro-text {
      font-size: 12px; 
      letter-spacing: 0.25em; 
      text-transform: uppercase; 
      font-weight: 600; 
      opacity: 0.25;
      margin-bottom: 20px; 
      display: block;
    }

    .index-num { 
      font-family: var(--serif);
      font-size: 12px; 
      font-weight: 500;
      font-style: italic;
      color: var(--carmine);
      margin-bottom: 12px; 
      display: block; 
    }
    
    .index-label { 
      font-size: 12px; 
      letter-spacing: 0.25em; 
      text-transform: uppercase; 
      font-weight: 600; 
      opacity: 0.25;
      margin-bottom: 20px; 
      display: block;
    }
    
    .index-item-static { 
      font-size: 16px; 
      font-weight: 400; 
      line-height: 1.2; 
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--ink);
    }

    .index-item-link { 
      font-size: 16px; 
      font-weight: 400; 
      line-height: 1.2; 
      text-transform: uppercase;
      letter-spacing: 0.03em;
      transition: all 0.3s ease;
      color: var(--ink);
      display: inline-block;
      position: relative;
    }
    .index-item-link:hover { 
      color: var(--carmine);
      transform: translateX(6px); 
    }

    .index-item-sub { 
      font-size: 12px; 
      font-weight: 300; 
      opacity: 0.5; 
      margin-top: 2px; 
      line-height: 1.3;
    }

    .accident-signal {
      font-family: var(--serif);
      font-style: italic;
      font-size: 18px;
      font-weight: 300; 
      color: var(--ink);
      position: relative;
      line-height: 0; 
      vertical-align: baseline;
      display: inline-block;
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

    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 3000;
      display: flex; flex-direction: column;
      padding: 24px;
    }

    .footer-mention {
      font-size: 14px; 
      font-weight: 400; 
      letter-spacing: -0.05em;
      color: var(--ink);
      line-height: 1.2;
      text-transform: lowercase;
      opacity: 0.3;
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

    @media (max-width: 768px) {
      :root {
        --feed-margin-v: 24px;
        --header-h: 64px;
      }
      /* Correction optique du logo sur mobile */
      .logo-style {
        transform: translateY(-2px) !important;
      }
      .logo-style { font-size: 24px; }
      .mobile-nav-btn { font-size: 18px; }
      header, footer {
        padding-left: 1.25rem !important;
        padding-right: 1.25rem !important;
      }
    }
  `}</style>
);

const MixedText = ({ text }) => {
  if (text === "") return null; 
  const parts = text.split(/(\[\[.*?\]\])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          return <span key={i} className="accident-signal">{part.slice(2, -2)}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

export default function App() {
  const [lang, setLang] = useState('EN');
  const [headerVisible, setHeaderVisible] = useState(false); 
  const [zoomImage, setZoomImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();
  const scale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // SEO & Head Management
  useEffect(() => {
    document.title = CONTENT[lang].meta.title;
    document.documentElement.lang = lang.toLowerCase();
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = CONTENT[lang].meta.description;
  }, [lang]);

  // JSON-LD Structured Data
  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Dubontemps",
      "url": typeof window !== 'undefined' ? window.location.href : '',
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
      setHeaderVisible(latest >= 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;

    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : (window.innerWidth < 768 ? 64 : 84);
    
    const bodyRect = document.body.getBoundingClientRect().top;
    const targetRect = target.getBoundingClientRect().top;
    const targetPosition = targetRect - bodyRect;
    
    const offsetPosition = targetPosition - headerHeight;

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

  return (
    <div className="relative w-full bg-white">
      <TypographyStyles />
      
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-menu-overlay"
            role="navigation"
            aria-label="Menu principal mobile"
          >
            <div className="flex justify-between items-center h-[var(--header-h)] mb-12">
              <button onClick={() => {setMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'})}} className="logo-style">
                {CONTENT[lang].brand}
              </button>
              <button onClick={() => setMobileMenuOpen(false)} 
                className="menu-close-button"
                aria-label="Fermer le menu">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-col gap-10 list-none p-0 m-0">
              <li><button onClick={() => scrollTo('works-anchor')} className="brand-style text-left text-2xl">{navData.works}</button></li>
              <li><button onClick={() => scrollTo('index-anchor')} className="brand-style text-left text-2xl">{navData.index}</button></li>
              <li><button onClick={() => scrollTo('contact-anchor')} className="brand-style text-left text-2xl">{navData.contact}</button></li>
              <li className="flex gap-4 mt-8 pt-8 border-t border-zinc-100">
                <button onClick={() => setLang('FR')} className={`brand-style ${lang === 'FR' ? 'opacity-100' : 'opacity-30'}`} aria-label="Passer en français">fr</button>
                <span className="opacity-10 brand-style" aria-hidden="true">/</span>
                <button onClick={() => setLang('EN')} className={`brand-style ${lang === 'EN' ? 'opacity-100' : 'opacity-30'}`} aria-label="Switch to english">en</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scroll-progress-container-desktop hidden md:block" aria-hidden="true">
        <motion.div className="scroll-progress-bar-desktop" style={{ height: '100%', scaleY: scale }} />
      </div>

      <AnimatePresence>
        {headerVisible && (
          <div className="scroll-progress-container-mobile md:hidden" aria-hidden="true">
            <motion.div className="scroll-progress-bar-mobile" style={{ width: '100%', scaleX: scale }} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {headerVisible && (
          <motion.header 
            initial={{ y: -84, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -84, opacity: 0 }}
            className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-14 h-[var(--header-h)] flex justify-between items-baseline nav-blur pt-4 pb-4 md:pt-8 md:pb-5"
          >
            <h1 className="m-0 p-0 leading-none">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="logo-style">
                {CONTENT[lang].brand}
              </button>
            </h1>
            
            <nav className="hidden md:flex gap-14 items-baseline md:mr-18" aria-label="Menu principal">
              <ul className="flex gap-14 list-none p-0 m-0 items-baseline">
                <li><button onClick={() => scrollTo('works-anchor')} className="brand-style">{navData.works}</button></li>
                <li><button onClick={() => scrollTo('index-anchor')} className="brand-style">{navData.index}</button></li>
                <li><button onClick={() => scrollTo('contact-anchor')} className="brand-style">{navData.contact}</button></li>
                <li>
                  <button 
                    onClick={() => setLang(l => l === 'FR' ? 'EN' : 'FR')} 
                    className="brand-style"
                    aria-label={lang === 'FR' ? 'Switch to English' : 'Passer en Français'}
                  >
                    {lang === 'FR' ? 'en' : 'fr'}
                  </button>
                </li>
              </ul>
            </nav>

            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden mobile-nav-btn" aria-label="Ouvrir le menu">
              {navData.menu}
            </button>
          </motion.header>
        )}
      </AnimatePresence>

      <main className="relative z-[5]">
        {/* Section Hero & Manifeste */}
        <section className="w-full flex flex-col bg-white" aria-labelledby="section-manifesto">
          <h2 id="section-manifesto" className="sr-only">{sectionTitles.manifesto}</h2>
          
          <div className="w-full h-[100vh] overflow-hidden">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.5 }} 
              src={CONTENT[lang].hero.url} 
              alt={CONTENT[lang].hero.alt}
              className="w-full h-full object-cover object-bottom" 
            />
          </div>

          {/* AJUSTEMENT : pb-[25vh] pour créer la respiration sous le manifeste */}
          <div className="pt-[40vh] pb-[25vh] px-6 md:px-[10%]">
            <div className="md:max-w-3xl mr-auto text-left md:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }} viewport={{ once: true }} className="text-manifesto space-y-4"
              >
                {CONTENT[lang].manifesto.map((line, i) => (
                  <div key={i} className="manifesto-line h-auto min-h-[1.7em]">
                    <MixedText text={line} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Galerie d'Images */}
        <section className="bg-white pt-0 space-y-[40vh] md:space-y-[40vh] relative" aria-labelledby="section-gallery">
          {/* AJUSTEMENT : L'ancre est absolue pour ne pas pousser le premier enfant (image 1) du space-y */}
          <div id="works-anchor" className="absolute top-[-100px] left-0" aria-hidden="true" />
          <h2 id="section-gallery" className="sr-only">{sectionTitles.gallery}</h2>
          
          {stream.map((item, idx) => (
            <motion.article 
              key={item.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true, margin: "-10%" }}
              className={`flex flex-col px-6 md:px-0 ${item.side === 'right' ? 'md:items-end md:pr-[10%]' : 'md:items-start md:pl-[10%]'}`}
            >
              <figure className="w-full md:w-[64vw] m-0 p-0">
                <div className="flex justify-between items-end mb-6">
                  <div className="text-meta-label">
                    <span className="sr-only">Project</span> {`${String(idx + 1).padStart(2, '0')} / ${String(stream.length).padStart(2, '0')}`}
                  </div>
                  <div className="text-meta-label text-right opacity-40 uppercase tracking-widest text-[10px] md:text-[12px]">
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

                <figcaption className="mt-8 flex flex-col">
                  <div className="flex flex-col items-end text-right">
                    <h2 className="text-meta-title m-0">{item.caption}</h2>
                    <span className="text-meta-date">{item.year}</span>
                  </div>
                  <div className="mt-8 md:mt-12 max-w-lg">
                    <p className="text-note"><MixedText text={item.note} /></p>
                  </div>
                </figcaption>
              </figure>
            </motion.article>
          ))}
        </section>

        {/* Section Index & Collabs */}
         <section id="index-anchor" className="relative mt-[40vh] py-20 px-6 md:px-[10%] bg-[#FDFDFD] z-[100]" aria-labelledby="section-index">
        <h2 id="section-index" className="sr-only">{sectionTitles.index}</h2>
  
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
            <p className="index-intro-text m-0">{indexData.intro}</p>
            <span className="selection-label-style !my-14" aria-hidden="true">{indexData.selectionLabel}</span>
        </motion.div>

    {/* Conteneur vertical unique */}
    <div className="flex flex-col gap-y-12">
    
    {/* 01 - Collaborations */}
    <div className="flex flex-col">
      <span className="index-num" aria-hidden="true">{indexData.collabs.num}</span>
      <h3 className="index-label">{indexData.collabs.label}</h3>
      <ul className="list-none p-0 m-0 space-y-4"> {/* Espacement réduit */}
        {indexData.collabs.items.map((c, i) => (
          <li key={i} className="max-w-[350px]">
            <p className="index-item-static m-0">{c.client}</p>
            <p className="index-item-sub m-0">{c.role} <span className="opacity-50 ml-1">{c.date}</span></p>
          </li>
        ))}
      </ul>
    </div>

    {/* 02 - Distinctions */}
    <div className="flex flex-col">
      <span className="index-num" aria-hidden="true">{indexData.awards.num}</span>
      <h3 className="index-label">{indexData.awards.label}</h3>
      <ul className="list-none p-0 m-0 space-y-3">
        {indexData.awards.items.map((a, i) => (
          <li key={i}>
            {a.url ? (
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="index-item-link">{a.label}</a>
            ) : <p className="index-item-static m-0">{a.label}</p>}
            <p className="index-item-sub m-0">{a.subtitle}</p>
          </li>
        ))}
      </ul>
    </div>

    {/* 03 - Expositions */}
    <div className="flex flex-col">
      <span className="index-num" aria-hidden="true">{indexData.exhibitions.num}</span>
      <h3 className="index-label">{indexData.exhibitions.label}</h3>
      <ul className="list-none p-0 m-0 space-y-3">
        {indexData.exhibitions.items.map((e, i) => (
          <li key={i}>
            <p className="index-item-static m-0">{e.label}</p>
            <p className="index-item-sub m-0">{e.subtitle}</p>
          </li>
        ))}
      </ul>
    </div>

    {/* 04 - Parutions */}
    <div className="flex flex-col">
      <span className="index-num" aria-hidden="true">{indexData.publications.num}</span>
      <h3 className="index-label">{indexData.publications.label}</h3>
      <ul className="list-none p-0 m-0 flex flex-col gap-y-3 max-w-lg"> 
        {indexData.publications.items.map((p, i) => (
          <li key={i}>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="index-item-link">
                {p.name}
              </a>
            ) : (
              <span className="index-item-static">
                {p.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
    
  </div>
</section>

        {/* Footer & Contact */}
        <footer id="contact-anchor" className="relative px-6 md:px-14 py-20 md:py-0 md:h-[var(--header-h)] bg-white flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 z-[100]" aria-labelledby="section-contact">
          <h2 id="section-contact" className="sr-only">{sectionTitles.contact}</h2>
          
          <nav aria-label="Contact links and social media">
            <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-8 md:gap-16 items-center md:ml-2">
              {footerData.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="brand-style">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <address className="footer-mention not-italic md:mr-18">
            © {new Date().getFullYear()} {CONTENT[lang].brand} . {footerData.location}
          </address>
        </footer>
      </main>
    </div>
  );
}
