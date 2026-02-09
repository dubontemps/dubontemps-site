import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
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
      description: "Dubontemps développe une écriture photographique entre nature, présence et mémoire. Explorez ses séries et tirages d'art, distinctions (ND Awards MH, Lensculture Editors' Pick) et collaborations (Musée de Cluny)."
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
  "Le paysage n’est pas un décor mais un champ d’interactions. La distance des cadrages évoque la neutralité d’un satellite, pour en souligner l'angle mort, la subjectivité de la perception humaine. À mesure que la technologie transforme nos manières de voir, ce travail interroge la persistance du regard : comment un signal discret, ou une absence, éveille l’imagination et la sensation, fait naître une relation.",
  "L’image que l’on retient ne capture rien. Elle révèle la rencontre entre un lieu et une mémoire individuelle.",
               ],
    bio: {
      label: "",
      lead: "dubontemps explore notre relation au paysage et à l’imaginaire",
      text: "Photographe française, elle a été formée aux arts visuels à New York et aux relations internationales à Paris. Elle collabore avec artisans, artistes et institutions culturelles, après une carrière en conseil.\n\nSon travail observe le vivant, sur plusieurs continents, entre réel et mystère, rigueur et instinct. Chaque tirage est réalisé par procédé pigmentaire d’archivage sur papier Fine Art, washi japonais fait main ou baryté."
    },
    stream: [
      { 
        id: 'wandering-souls-dubontemps', 
        url: '/images/dubontemps-equationsauvage-2026-palma-shadows-baryta-lg.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier baryté",
        alt: "Ombres de palmier et marcheurs, Palma de Majorque, série Équation Sauvage 2026, tirage pigmentaire papier baryté, Dubontemps",
        note: "" 
      },
      { 
        id: 'vertigo-dubontemps', 
        url: '/images/dubontemps-wild-equation-2026-pacific-aerial-view-sandbank-washi-lg.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier washi japonais",
        alt: "Vue aérienne d'un banc de sable dans l’océan Pacifique, Vancouver Island, série Équation Sauvage 2026, tirage pigmentaire papier washi japonais, Dubontemps",
        note: "", 
        side: 'right'
      },
      { 
        id: 'echoes-of-the-woods-dubontemps', 
        url: '/images/dubontemps-wild-equation-2026-clayoquot-sound-aerial-view-forest-washi-lg.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier washi japonais",
        alt: "Forêt primitive dans la brume, Clayoquot Sound, Vancouver Island, série Équation Sauvage 2026, tirage pigmentaire papier washi japonais, Dubontemps",
        note: "" 
      },
      { 
        id: 'between-realms-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-idf-mysterious-windows-matte-lg.jpg', 
        caption: "L’art du silence", 
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
          { client: 'Musée national de Cluny', role: "Végétalisation de 4000m2 dans Paris. Campagne patrimoniale, reportages, inauguration ministérielle.", date: '2025' },
          { client: 'Louis Wallecan', role: "Portrait pour Duel Magazine.", date: '2025' },
          { client: 'French Theory', role: "Portraits presse artistes, art shooting et DA d'exposition.", date: '23-25' },
          { client: 'Communauté Écotable', role: "Portraits sur l'alimentation durable (Ground Control, François Hollande pour La France s'engage, Isana, Refugee Food, etc.).", date: '21—24' }
        ]
      },
      awards: {
        label: "Distinctions",
        num: "02",
        items: [
          { label: "Lensculture Art", subtitle: "Editors' Pick, 2025" },
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
      error: "erreur. réessayez",
      instagram: "instagram",
      portfolio: "catalogue sur demande"
    },
    footer: {
      location: "paris x:48°52'0.01''y:2°19'59.99''"
    }

  },  
  EN: {
    brand: "dubontemps",
    meta: {
      title: "Dubontemps | Landscape & Documentary Photographer | Paris",
      description: "Dubontemps develops a photographic language between nature, presence, and memory. Explore her series and fine art prints, her awards ((ND Awards MH, Lensculture Editors' Pick) and collaborations (Musée de Cluny)."
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
  "The landscape is not a backdrop but a field of interactions. The distance in the framing evokes the neutrality of a satellite, to underscore the subjectivity of human perception. As technology reshapes the way we see, this work questions the persistence of looking: how a subtle signal, or an absence, stirs imagination and sensation, gives rise to a relationship.",
  "The image we retain captures nothing. It reveals the encounter between a place and an individual memory.",
               ],
    bio: {
      label: "",
      lead: "dubontemps explores our relationship to landscape and imagination",
      text: "French photographer, she was trained in visual arts in New York and in international relations in Paris. She collaborate with artisans, artists and cultural institutions, following a consulting career.\n\nHer work observes the living world across several continents, between reality and mystery, rigor and instinct. Each print is produced with archival pigment processes on Fine Art paper, handmade Japanese washi or baryta."
     },
    stream: [
      { 
        id: 'wandering-souls-dubontemps', 
        url: '/images/dubontemps-equationsauvage-2026-palma-shadows-baryta-lg.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, baryta paper",
        alt: "Palm shadows and walkers, Palma de Mallorca, Équation Sauvage series 2026, pigment print on baryta paper, Dubontemps",
        note: "" 
      },
      { 
        id: 'vertigo-dubontemps', 
        url: '/images/dubontemps-wild-equation-2026-pacific-aerial-view-sandbank-washi-lg.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, handmade Japanese washi paper",
        alt: "Aerial view of a sandbank in the Pacific Ocean, Vancouver Island, Équation Sauvage series 2026, pigment print on Japanese washi paper, Dubontemps",
        note: "", 
        side: 'right'
      },
      { 
        id: 'echoes-of-the-woods-dubontemps', 
        url: '/images/dubontemps-wild-equation-2026-clayoquot-sound-aerial-view-forest-washi-lg.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, handmade Japanese washi paper",
        alt: "Primitive forest in the mist, Clayoquot Sound, Vancouver Island, Équation Sauvage series 2026, pigment print on Japanese washi paper, Dubontemps",
        note: "" 
      },
      { 
        id: 'between-realms-dubontemps', 
        url: '/images/dubontemps-art-of-silence-2025-idf-mysterious-windows-matte-lg.jpg', 
        caption: 'Art of Silence', 
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
            { client: 'Musée national de Cluny', role: "Re-wilding of 4000m2 in Paris. Heritage campaign, documentary, ministerial inauguration.", date: '2025' },
            { client: 'Louis Wallecan', role: "Documentary portrait for Duel Magazine.", date: '2025' },
            { client: 'French Theory', role: "Artists' press portraits, art shooting, exhibition AD.", date: '23-25' },
            { client: 'Communauté Écotable', role: "Portraits on sustainable food (Ground Control, François Hollande pour La France s'engage, Isana, Refugee Food, etc.).", date: '21—24' }
        ] 
      },
      awards: { 
        label: "Awards", 
        num: "02", 
        items: [
            { label: "Lensculture Art", subtitle: "Editors' Pick, 2025" },
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
      success: "thank you",
      error: "error. try again",
      instagram: "instagram",
      portfolio: "catalogue on demand"
    },
    footer: {
      location: "paris x:48°52'0.01''y:2°19'59.99''",
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
      --header-h: 84px;
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
      font-size: 18px; 
      font-weight: 500; 
      letter-spacing: -0.02em; 
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
    .logo-style:hover { color: var(--accent); }

    .brand-style { 
      font-family: var(--sans);
      font-size: 14px; 
      font-weight: 300; 
      letter-spacing: 0.02em;
      background: none;
      border: none;
      color: var(--ink);
      padding: 0;
      line-height: 1; 
      text-transform: uppercase;
      transition: color 0.4s ease, transform 0.3s ease;
      margin-top: 0; 
      }

    .brand-style:hover { color: var(--accent); }

    .nav-blur {
    backdrop-filter: none !important;      
    -webkit-backdrop-filter: none !important; 
    background-color: #FFFFFF;
    }
    .text-note, .text-manifesto { 
      font-size: 16px; 
      letter-spacing: 0.02em;
      line-height: 1.7; 
      font-weight: 300; 
      color: var(--ink-soft); 
      max-width: 44ch; 
      white-space: pre-line;
    }
    .text-meta-label { 
      font-size: 11px; 
      letter-spacing: 0.2em; 
      text-transform: uppercase; 
      opacity: 0.3; 
      font-weight: 500; 
    }
    .text-meta-title {
      font-size: 11px; 
      letter-spacing: 0.2em; 
      text-transform: uppercase; 
      opacity: 0.3; 
      font-weight: 500; 
    }
    .text-meta-date {
      font-size: 11px; 
      letter-spacing: 0.2em; 
      text-transform: uppercase; 
      opacity: 0.3; 
      font-weight: 500; 
      margin-top: 4px !important;
    }
    .manifesto-large {
    font-family: var(--serif);
    font-size: 17px; 
    line-height: 1.7;
    font-weight: 500;
    color: var(--ink);
    text-align: center; 
    max-width: 90%; 
    margin: 0 auto;
    letter-spacing: -0.02em;
    white-space: pre-line;
    }
    .bio-lead {
      font-family: var(--serif);
      font-weight: 500; 
      letter-spacing: -0.02em;
      font-size: 20px;
      line-height: 1.8;
      color: var(--ink);
      margin-bottom: 2rem;
    }
    .bio-text {
      font-size: 13px;
      line-height: 2;
      font-weight: 300;
      color: var(--ink);
      opacity: 0.7;
    }
    .index-num { 
      font-family: var(--serif);
      font-size: 12px; 
      font-weight: 500;
      font-style: italic;
      color: var(--accent);
      margin-bottom: 10px; 
      display: block; 
    }
    .index-label { 
      font-size: 12px; 
      letter-spacing: 0.25em; 
      text-transform: uppercase; 
      font-weight: 600; 
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
      font-size: 16px; 
      font-weight: 500; 
      letter-spacing: -0.02em;
      line-height: 1.2; 
      color: var(--ink);
    }
    .index-item-link { 
      font-family: var(--serif); 
      font-size: 16px; 
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
      font-size: 12px; 
      font-weight: 300; 
      opacity: 0.5; 
      margin-top: 4px; 
      line-height: 1.3;
    }
   .bento-tile {
      background: var(--bg-white);
      border-top: 1px solid var(--border-light);
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
      background: linear-gradient(to bottom, var(--bg-white) 0%, var(--bg-off-white) 100%);
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
      font-size: 12px; 
      font-weight: 400; 
      letter-spacing: -0.05em;
      color: var(--ink);
      line-height: 1.2;
      text-transform: lowercase;
      opacity: 0.3;
    }
    .contact-title {
      font-family: var(--serif);
      font-size: 18px;
      line-height: 0.8;
      font-weight: 300;
      color: var(--ink);
      opacity: 0.8;
      margin-bottom: 4rem;
      text-transform: lowercase;
      letter-spacing: -0.06em;
    }
      .contact-input {
      width: 100%; 
      max-width: 100%;
      font-size: 16px !important; /* Minimum pour éviter le décalage/zoom iOS */
      box-sizing: border-box;
      background: transparent;
      border: none;
      border-bottom: 0.5px solid rgba(0,0,0,0.1);
      padding: 12px 0;
      outline: none;
      transition: border-bottom 0.4s ease;
      display: block;
      color: var(--ink); /* Force l'écriture en noir */
    }
    .contact-input::placeholder {
      color: currentColor;
      opacity: 0.4;
    }
    .contact-input:focus {
      border-bottom: 0.5px solid var(--ink);
    }
    .contact-textarea {
      min-height: 80px;
      resize: none;
    }
    .contact-submit {
      border: none;
      background: transparent;
      padding: 0;
      margin: 0;
      line-height: 1;
      transition: color 0.4s ease;
      display: inline-flex;
      align-items: baseline;
    }
    .contact-submit:hover {
      color: var(--accent);
    }
    .contact-submit:disabled {
      opacity: 0.3;
      cursor: wait;
    }
    @media (min-width: 768px) {
      .manifesto-large { font-size: 18px; line-height: 1.8; max-width: 60%; letter-spacing: -0.02em; text-align: center; font-weight: 500; color: var(--ink);  }
      #contact-anchor form { max-width: 100%; }
       }
    @media (max-width: 768px) {
      :root {
        --feed-margin-v: 24px;
        --header-h: 64px;
      }
      .logo-style {
       transform: translateY(-4px);
      }
      .mobile-nav-btn {
        -webkit-appearance: none;
        background: transparent;
        border: none;
        padding: 0;
        color: var(--ink);
        display: flex;
        flex-direction: column;
        align-items: flex-end; 
        gap: 6px;             
        /* Suppression du translateY car le parent flex-1 center s'en occupe */
        transition: opacity 0.3s ease;
        cursor: pointer;
      }
      .btn-line {
        height: 1px; /* Plus élégant et raccord avec les icônes Lucide */
        background-color: currentColor;
        transition: all 0.3s ease;
      }
    .menu-close-button {
      background: transparent;
      border: none;
      padding: 12px;           
      margin-right: -12px;     
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      transition: opacity 0.3s ease;
    }
    .menu-close-button svg {
      pointer-events: none; 
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
        padding-right: 16px;
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
    #contact-anchor form {
      width: 100%;
      max-width: 44ch; /* même largeur que l'index sur desktop */
      box-sizing: border-box; /* inclut padding dans la largeur */
      padding-left: 0; /* alignement à gauche */
      padding-right: 0;
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
    const [lang, setLang] = useState('EN');
    const [headerVisible, setHeaderVisible] = useState(false); 
    const [lastScrollY, setLastScrollY] = useState(0);
    const [zoomImage, setZoomImage] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const { scrollY } = useScroll();

    // SÉCURITÉ : Si les données n'existent pas, on affiche un message d'erreur plutôt qu'une page blanche
    if (!CONTENT || !CONTENT[lang]) return <div>Loading data...</div>;

    // Formulaire etats et envoi
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState(null); // 'success' | 'error'

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
        } else {
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
        const heroHeight = window.innerHeight * 0.8; // Apparaît après 80% de la hauteur Hero

        if (latest < heroHeight) {
          setHeaderVisible(false); // Cache sur l'image Hero
        } else if (latest > lastScrollY) {
          setHeaderVisible(false); // Cache au scroll down
        } else {
          setHeaderVisible(true);  // Apparaît au scroll up
        }
        setLastScrollY(latest);
      });
      return () => unsubscribe();
    }, [scrollY, lastScrollY]);

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
    const contactData = CONTENT[lang].contact;
    const bioData = CONTENT[lang].bio;

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
                <button onClick={() => {setMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'})}} 
                className="logo-style">
                  {CONTENT[lang].brand}
                </button>
                <button onClick={() => setMobileMenuOpen(false)} 
                  className="menu-close-button opacity-40 hover:opacity-100 transition-opacity"
                  aria-label="Fermer le menu">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <ul className="flex flex-col gap-10 list-none p-0 m-0">
                <li><button onClick={() => scrollTo('works-anchor')} className="brand-style text-left text-2xl opacity-40 hover:opacity-100 transition-opacity">{navData.works}</button></li>
                <li><button onClick={() => scrollTo('index-anchor')} className="brand-style text-left text-2xl opacity-40 hover:opacity-100 transition-opacity">{navData.index}</button></li>
                <li><button onClick={() => scrollTo('contact-anchor')} className="brand-style text-left text-2xl opacity-40 hover:opacity-100 transition-opacity">{navData.contact}</button></li>
                <li className="flex gap-4 mt-8 pt-8 border-t border-zinc-100">
                  <button onClick={() => setLang('FR')} className={`brand-style transition-opacity duration-300 ${lang === 'FR' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`} 
                  aria-label="Passer en français">fr</button>
                  <span className="opacity-10 brand-style" aria-hidden="true">/</span>
                  <button onClick={() => setLang('EN')} className={`brand-style transition-opacity duration-300 ${lang === 'EN' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`} 
                  aria-label="Switch to english">en</button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

  <AnimatePresence>
          {headerVisible && (
            <motion.header 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-[40px] h-[var(--header-h)] flex items-center justify-between nav-blur py-6 md:py-8"
            >
              {/* LOGO À GAUCHE */}
              <div className="flex-shrink-0">
                <h1 className="m-0 p-0" style={{ display: 'contents' }}>
                  <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="logo-style">
                    {CONTENT[lang].brand}
                  </button>
                </h1>
              </div>

              {/* NAVIGATION À DROITE */}
              <div className="flex items-baseline gap-10">
                <nav className="hidden md:flex gap-10 items-baseline">
                  <button onClick={() => scrollTo('works-anchor')} className="brand-style ">{navData.works}</button>
                  <button onClick={() => scrollTo('index-anchor')} className="brand-style ">{navData.index}</button>
                  <button onClick={() => scrollTo('contact-anchor')} className="brand-style">{navData.contact}</button>
                  <button onClick={() => setLang(l => l === 'FR' ? 'EN' : 'FR')} className="brand-style">
                    {lang === 'FR' ? 'en' : 'fr'}
                  </button>
                </nav>
                
                <div className="md:hidden flex items-center gap-6">
                  <button onClick={() => setLang(l => l === 'FR' ? 'EN' : 'FR')} className="brand-style">
                    {lang === 'FR' ? 'en' : 'fr'}
                  </button>
                  <button onClick={() => setMobileMenuOpen(true)} className="mobile-nav-btn">
                    <div className="btn-line w-[22px]" /> 
                    <div className="btn-line w-[14px]" />
                  </button>
                </div>
              </div>
            </motion.header>
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
  {/* LA GALERIE UNIQUE */}
          <section className="bg-white pt-[30vh] space-y-[30vh] md:space-y-[30vh] relative" aria-labelledby="section-gallery">
            <div id="works-anchor" className="absolute top-[-100px] left-0" aria-hidden="true" />
            <h2 id="section-gallery" className="sr-only">{sectionTitles.gallery}</h2>
            
            {stream.map((item, idx) => (
              <React.Fragment key={item.id}>

    {/* Nouveau Manifeste en grand avant l'image 4 */}
            {idx === 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="w-full py-0 px-6 text-center"
              >
                <p className="manifesto-large">
                  {CONTENT[lang].manifesto.join(' ')}
                </p>
              </motion.div>
            )}

  {/* L'ARTICLE IMAGE (Commun à toutes les photos) */}
              <motion.article 
                key={item.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true, margin: "-10%" }}
                className={`flex flex-col px-6 md:px-0 ${item.side === 'right' ? 'md:items-end md:pr-[10%]' : 'md:items-start md:pl-[10%]'}`}
              >
                <figure className="w-full md:w-[55vw] m-0 p-0">
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
                  </figcaption>
                </figure>
              </motion.article>
              </React.Fragment>
            ))}
          </section>

          {/* Index & Contact Combined */}
          <div className="bg-index-gradient pt-[40vh]">
            
            {/* Bento Index */}
            <section id="index-anchor" className="px-0 md:px-[10%] mb-[20vh]">
              <div className="hidden md:grid grid-cols-4 gap-6 grid-rows-[auto_auto_auto]">
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
                        <li key={i}><p className="index-item-static m-0">{c.client}</p><p className="index-item-sub m-0">{c.role} — {c.date}</p></li>
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
                          <div key={i}><p className="index-item-static m-0">{a.label}</p><p className="index-item-sub m-0">{a.subtitle}</p></div>
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
                        <li key={i}><p className="index-item-static m-0">{e.label}</p><p className="index-item-sub m-0">{e.subtitle}</p></li>
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
          <section id="contact-anchor" className="relative w-full mt-[20vh] pt-8 pb-10">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              
              <div className="px-6 md:px-[10%] grid grid-cols-1 md:grid-cols-4 md:gap-x-12">
                <div className="col-span-1 md:col-span-3">

                  
                    <h3 className="contact-title">{contactData.title}</h3>
              

                  <form onSubmit={handleFormSubmit} className="flex flex-col w-full m-0 p-0">
                    <input type="text" name="_gotcha" style={{ display: "none" }} />
                    <textarea 
                      name="message" required placeholder={contactData.placeholderMsg} 
                      className="contact-input contact-textarea mb-2"
                    />
                    <input 
                      type="email" name="email" required placeholder={contactData.placeholderEmail} 
                      className="contact-input m-0" 
                    />
                    
                    <div className="mt-4 flex justify-end"> 
                      {!formStatus ? (
                        <button type="submit" className="contact-submit brand-style h-[18px] flex items-center" disabled={isSubmitting}>
                          {isSubmitting ? contactData.sending : contactData.submit}
                        </button>
                      ) : (
                        <span className="brand-style opacity-40 italic h-[18px] flex items-center">
                          {formStatus === 'success' ? contactData.success : contactData.error}
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              </div>

            <div className="mt-20 pt-6 px-6 md:px-[40px] flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div className="flex gap-8 items-center">
                <a href="https://www.instagram.com/_dubontemps_/" target="_blank" className="brand-style leading-none">
                    {contactData.instagram}
                  </a> 
                  <span className="brand-style cursor-wait leading-none">
                    {contactData.portfolio}
                  </span>
                </div>
                  <p className="footer-mention m-0">
                  © {new Date().getFullYear()} {CONTENT[lang].brand} . {footerData.location}
                  </p>
              </div>
      </motion.div>
    </section>
    </div>
    </div>
  </main>
  </div>
  );
  }

