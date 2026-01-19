import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { X, Mail, Instagram, ExternalLink } from 'lucide-react';

/**
 * --- CONFIGURATION DU THÈME & CONTENUS ---
 */
const CONTENT = {
  FR: {
    brand: "dubontemps",
    nav: { works: 'images', index: 'index', contact: 'contact', menu: 'menu' },
    hero: { 
      url: 'https://i.ibb.co/7d0QhhHV/couv.jpg',
      alt: 'Couverture Dubontemps - Paysage'
    },
    manifesto: [
      "Un paysage est une scène active.",
      "Un champ d’interactions imprévisibles.",
      "Un incident, une absence, suffisent.", 
      "",
      "La distance et la hauteur révèlent", 
      "les signaux qui déplacent le regard.",
      "",
      "L’image ne capture pas :", 
      "elle naît de la [[relation]] et de la [[mémoire]].",
    ],
    stream: [
      { 
        id: 'img-1', 
        url: 'https://i.ibb.co/7Njxf518/serie1-1.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier baryté",
        note: "Quand des intelligences prédictives cherchent à réduire l’inconnu, l’imaginaire cultive [[l’imprévu]]." 
      },
      { 
        id: 'img-2', 
        url: 'https://i.ibb.co/jZ57sPDN/serie1-3.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier washi japonais",
        note: "Regarder le réel : vertige, fascination ou [[urgence]] face à ce qui pourrait disparaître.", 
        side: 'right'
      },
      { 
        id: 'img-3', 
        url: 'https://i.ibb.co/4gVbxdhH/serie1-2.jpg', 
        caption: "Équation sauvage", 
        year: "2026",
        tech: "Tirage pigmentaire, papier washi japonais",
        note: "La nature n’est pas un décor. C’est un [[langage discret]]." 
      },
      { 
        id: 'img-4', 
        url: 'https://i.ibb.co/QjqdyMNY/serie2-1.jpg', 
        caption: "L’art du silence", 
        year: "2025",
        tech: "Tirage pigmentaire, papier fine art mat",
        note: "Dans l’épaisseur du silence, avancer entre [[veille et songe]].",
        side: 'right'
      },
      { 
        id: 'img-5', 
        url: 'https://i.ibb.co/wZ7s9cYL/serie2-2.jpg', 
        caption: "L’art du silence", 
        year: "2025",
        tech: "Tirage pigmentaire, papier fine art mat",
        note: "Là où l’ombre façonne la lumière, [[rêver]] pour résister." 
      }
    ],
    index: {
      intro: "Ma pratique se situe entre l'observation documentaire et le geste photographique. Parallèlement à mes explorations en France et à l'international, je collabore avec des artisans, des artistes et des institutions culturelles.",
      selectionLabel: "Sélection de références",
      collabs: {
        label: "Collaborations",
        num: "01",
        items: [
          { client: 'Musée national de Cluny', role: "Re-végétalisation de 4000m2 dans Paris. Campagne patrimoniale, reportages, inauguration ministérielle.", date: '2025' },
          { client: 'Louis Wallecan', role: "Portrait documentaire pour Duel Magazine. Art shooting et DA d'exposition pour French Theory.", date: '2025' },
          { client: 'Communauté Écotable', role: "Portraits sur l'alimentation durable (Ground Control, François Hollande pour La France s'engage, Isana, Botanique, etc.).", date: '21—24' }
        ]
      },
      awards: {
        label: "Distinctions",
        num: "02",
        items: [
          { label: "Smithsonian", subtitle: "Top 10, 2026" },
          { label: "Lensculture Art", subtitle: "Critics' Choice, 2025" },
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
          { name: "Smithsonian" },
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
      location: "studio rue lamarck, paris",
      links: [
        { label: "email", url: "mailto:atimsit@gmail.com" },
        { label: "instagram", url: "https://www.instagram.com/_dubontemps_/" },
        { label: "portfolio", url: "https://drive.google.com" }
      ]
    }
  },
  EN: {
    brand: "dubontemps",
    nav: { works: 'images', index: 'index', contact: 'contact', menu: 'menu' },
    hero: { 
      url: 'https://i.ibb.co/7d0QhhHV/couv.jpg',
      alt: 'Dubontemps Cover - Landscape'
    },
    manifesto: [
      "A landscape is an active stage.",
      "A field of unpredictable interactions.",
      "An incident, an absence, is enough.",
      "",
      "From distance, from height",
      "signals surface and shift the gaze.",
      "",
      "The image does not capture:",
      "it emerges quietly from [[relation]], from [[memory]].",
    ],
    stream: [
      { 
        id: 'img-1-en', 
        url: 'https://i.ibb.co/7Njxf518/serie1-1.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, baryta paper",
        note: "When predictive intelligences seek to reduce the unknown, imagination cultivates the [[unforeseen]]." 
      },
      { 
        id: 'img-2-en', 
        url: 'https://i.ibb.co/jZ57sPDN/serie1-3.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, handmade Japanese washi paper",
        note: "Observing reality: vertigo, fascination or [[urgency]] facing what may vanish.", 
        side: 'right'
      },
      { 
        id: 'img-3-en', 
        url: 'https://i.ibb.co/4gVbxdhH/serie1-2.jpg', 
        caption: 'Wild Equation', 
        year: "2026",
        tech: "Pigment inkjet print, handmade Japanese washi paper",
        note: "Nature is not a backdrop. It is a [[discreet language]]." 
      },
      { 
        id: 'img-4-en', 
        url: 'https://i.ibb.co/QjqdyMNY/serie2-1.jpg', 
        caption: 'The Art of Silence', 
        year: "2025",
        tech: "Pigment inkjet print, matte fine art paper",
        note: "In the depth of silence, advancing between [[waking and dreaming]].",
        side: 'right'
      },
      { 
        id: 'img-5-en', 
        url: 'https://i.ibb.co/wZ7s9cYL/serie2-2.jpg', 
        caption: 'The Art of Silence', 
        year: "2025",
        tech: "Pigment inkjet print, matte fine art paper",
        note: "Where shadow shapes light, to [[dream]] is to resist." 
      }
    ],
    index: {
      intro: "My photographic practice lies between documentary observation and photographic gesture. Alongside my explorations in France and abroad, I collaborate with craftsmen, artists and cultural institutions.",
      selectionLabel: "Selected references",
      collabs: { 
        label: "Collaborations", 
        num: "01", 
        items: [
            { client: 'Musée national de Cluny', role: "Re-wilding of 4000m2 in Paris. Heritage campaign, documentary, ministerial inauguration.", date: '2025' },
            { client: 'Louis Wallecan', role: "Documentary portrait for Duel Magazine. Art shooting, exhibition AD for French Theory", date: '2025' },
            { client: 'Communauté Écotable', role: "Portraits on sustainable food (Ground Control, François Hollande pour La France s'engage, Isana, Botanique, etc.).", date: '21—24' }
        ] 
      },
      awards: { 
        label: "Awards", 
        num: "02", 
        items: [
            { label: "Smithsonian", subtitle: "Top 10, 2026" },
            { label: "Lensculture Art", subtitle: "Critics' Choice, 2025" },
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
          { name: "Smithsonian" },
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
      location: "studio rue lamarck, paris",
      links: [
        { label: "email", url: "mailto:atimsit@gmail.com" },
        { label: "instagram", url: "https://www.instagram.com/_dubontemps_/" },
        { label: "portfolio", url: "https://drive.google.com" }
      ]
    }
  }
};

/**
 * --- STYLES GLOBAUX & TYPOGRAPHIE ---
 */
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
      color-scheme: light !important;
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
      font-size: 22px; 
      font-weight: 600; 
      letter-spacing: -0.02em;
      background: none;
      border: none;
      color: var(--ink);
      padding: 0; 
      line-height: 1;
      text-transform: lowercase; 
      transition: color 0.4s ease;
    }

    .brand-style { 
      font-family: var(--sans);
      font-size: 18px; 
      font-weight: 400; 
      letter-spacing: -0.04em;
      background: none;
      border: none;
      color: var(--ink);
      padding: 0;
      line-height: 1; 
      text-transform: lowercase;
      transition: color 0.4s ease, transform 0.3s ease;
    }

    .mobile-nav-btn {
      font-family: var(--sans);
      font-size: 18px;
      font-weight: 400;
      text-transform: lowercase;
      letter-spacing: -0.02em;
      line-height: 1;
      transition: color 0.4s ease;
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
      font-size: 18px; 
      line-height: 1.7; 
      font-weight: 300; 
      color: var(--ink-soft); 
      max-width: 44ch; 
    }

    .index-intro-text {
      font-size: 18px; 
      line-height: 1.6;
      font-weight: 300; 
      color: var(--ink-soft); 
      max-width: 44ch; 
    }

    .selection-label-style {
      font-size: 12px; 
      letter-spacing: 0.25em; 
      text-transform: uppercase; 
      font-weight: 600; 
      opacity: 0.25;
      display: block;
      margin-top: 32px;
      margin-bottom: 40px;
    }

    .index-num { 
      font-family: var(--serif);
      font-size: 12px; 
      font-weight: 500;
      font-style: italic;
      color: var(--carmine);
      margin-bottom: 6px; 
      display: block; 
    }
    
    .index-label { 
      font-size: 12px; 
      letter-spacing: 0.25em; 
      text-transform: uppercase; 
      font-weight: 600; 
      opacity: 0.25;
      margin-bottom: 16px; 
    }
    
    .index-item-static { 
      font-size: 14px; 
      font-weight: 500; 
      line-height: 1.2; 
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--ink);
    }

    .index-item-link { 
      font-size: 14px; 
      font-weight: 500; 
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
      font-size: 14px; 
      font-weight: 300; 
      opacity: 0.5; 
      margin-top: 2px; 
      line-height: 1.3;
    }

    .accident-signal {
      font-family: var(--serif);
      font-style: italic;
      font-size: 20px;
      font-weight: 300; 
      color: var(--ink);
      position: relative;
      line-height: 0; 
      vertical-align: baseline;
      display: inline-block;
    }

    /* OVERLAYS & LIGHTBOX */
    .lightbox-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: white; 
      z-index: 5000;
      display: flex; align-items: center; justify-content: center;
      cursor: zoom-out;
    }

    .lightbox-img {
      max-width: 90%; max-height: 90%;
      object-fit: contain; 
    }

    .footer-mention {
      font-size: 18px; 
      font-weight: 400; 
      letter-spacing: -0.04em;
      color: var(--ink);
      line-height: 1.2;
      text-transform: lowercase;
      opacity: 0.4;
    }

    @media (max-width: 768px) {
      :root {
        --header-h: 64px;
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

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHeaderVisible(latest >= 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
        window.scrollTo({
            top: el.getBoundingClientRect().top + window.pageYOffset - 84,
            behavior: 'smooth'
        });
    }
  };

  const stream = CONTENT[lang].stream;
  const indexData = CONTENT[lang].index;
  const footerData = CONTENT[lang].footer;
  const navData = CONTENT[lang].nav;

  // VERSION ROUGE TEST - TRANSPARENCE ET FLOU
  const headerTestStyle = {
    backgroundColor: 'rgba(230, 0, 38, 0.85)', // Rouge carmin transparent
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    zIndex: 9999
  };

  return (
    <div className="relative w-full bg-white min-h-screen">
      <TypographyStyles />

      {/* Lightbox */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="lightbox-overlay"
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src={zoomImage} className="lightbox-img" alt="Vue agrandie"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-full z-[3000] flex flex-col p-6 overflow-y-auto"
            style={{ backgroundColor: '#FFFFFF' }} 
          >
            <div className="flex justify-between items-center h-[var(--header-h)] mb-12">
              <button onClick={() => {setMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'})}} className="logo-style">
                {CONTENT[lang].brand}
              </button>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Fermer le menu" className="text-black">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-10">
              <button onClick={() => scrollTo('works')} className="brand-style text-left text-2xl">{navData.works}</button>
              <button onClick={() => scrollTo('index-anchor')} className="brand-style text-left text-2xl">{navData.index}</button>
              <button onClick={() => scrollTo('contact')} className="brand-style text-left text-2xl">{navData.contact}</button>
              <div className="flex gap-4 mt-8 pt-8 border-t border-zinc-100">
                <button onClick={() => setLang('FR')} className={`brand-style ${lang === 'FR' ? 'opacity-100' : 'opacity-30'}`}>fr</button>
                <span className="opacity-10 brand-style">/</span>
                <button onClick={() => setLang('EN')} className={`brand-style ${lang === 'EN' ? 'opacity-100' : 'opacity-30'}`}>en</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barre de progression Bureau */}
      <div className="scroll-progress-container-desktop hidden md:block">
        <motion.div className="scroll-progress-bar-desktop" style={{ height: '100%', scaleY: scale }} />
      </div>

      {/* Barre de progression Mobile */}
      <AnimatePresence>
        {headerVisible && (
          <div className="scroll-progress-container-mobile md:hidden">
            <motion.div className="scroll-progress-bar-mobile" style={{ width: '100%', scaleX: scale }} />
          </div>
        )}
      </AnimatePresence>

      {/* Header collant - VERSION ROUGE POUR TEST DE TRANSPARENCE */}
      <AnimatePresence>
        {headerVisible && (
          <motion.header 
            initial={{ y: -84, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -84, opacity: 0 }}
            style={headerTestStyle}
            className="fixed top-0 left-0 w-full px-6 md:px-14 h-[var(--header-h)] flex justify-between items-center"
          >
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="logo-style !text-white">
              {CONTENT[lang].brand}
            </button>
            <nav className="hidden md:flex gap-14 items-center">
              <button onClick={() => scrollTo('works')} className="brand-style !text-white">{navData.works}</button>
              <button onClick={() => scrollTo('index-anchor')} className="brand-style !text-white">{navData.index}</button>
              <button onClick={() => scrollTo('contact')} className="brand-style !text-white">{navData.contact}</button>
              <button onClick={() => setLang(l => l === 'FR' ? 'EN' : 'FR')} className="brand-style !text-white">
                {lang === 'FR' ? 'en' : 'fr'}
              </button>
            </nav>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden mobile-nav-btn !text-white">
              {navData.menu}
            </button>
          </motion.header>
        )}
      </AnimatePresence>

      <main className="relative z-[5]">
        {/* Hero */}
        <section className="w-full flex flex-col bg-white">
          <div className="w-full h-[85vh] overflow-hidden">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.5 }} 
              src={CONTENT[lang].hero.url} alt={CONTENT[lang].hero.alt}
              className="w-full h-full object-cover object-bottom" 
            />
          </div>
          <div className="pt-[40vh] pb-[15vh] px-6 md:px-[15%]">
            <div className="md:max-w-3xl ml-auto text-left md:text-right">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }} viewport={{ once: true }} className="text-manifesto space-y-1"
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

        {/* Works */}
        <section id="works" className="bg-white pt-[20vh] space-y-[40vh] md:space-y-[60vh]">
          {stream.map((item, idx) => (
            <motion.div 
              key={item.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true, margin: "-10%" }}
              className={`flex flex-col px-6 md:px-0 ${item.side === 'right' ? 'md:items-end md:pr-[10%]' : 'md:items-start md:pl-[10%]'}`}
            >
              <div className="w-full md:w-[64vw]">
                <div className="flex justify-between items-end mb-6">
                  <div className="text-meta-label">
                    {`${String(idx + 1).padStart(2, '0')} / ${String(stream.length).padStart(2, '0')}`}
                  </div>
                  <div className="text-meta-label text-right opacity-40 uppercase tracking-widest text-[10px] md:text-[12px]">
                    {item.tech}
                  </div>
                </div>
                <div className="overflow-hidden bg-zinc-50 cursor-zoom-in group" onClick={() => setZoomImage(item.url)}>
                  <motion.img whileHover={{ scale: 1.01 }} src={item.url} alt={item.caption} loading="lazy" className="w-full h-auto transition-transform duration-[1500ms]" />
                </div>
                <div className="mt-8 flex flex-col">
                  <div className="flex flex-col items-end text-right">
                    <h2 className="text-meta-title">{item.caption}</h2>
                    <span className="text-meta-date">{item.year}</span>
                  </div>
                  <div className="mt-8 md:mt-12 max-w-lg">
                    <p className="text-note"><MixedText text={item.note} /></p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Index */}
        <section id="index-anchor" className="relative mt-[25vh] py-24 px-6 md:px-[8%] bg-[#FAFAFA] border-t border-zinc-100 z-[100]">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
             <p className="index-intro-text">{indexData.intro}</p>
             <span className="selection-label-style">{indexData.selectionLabel}</span>
          </motion.div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-16 md:gap-x-24 md:gap-y-20">
            <div className="flex flex-col col-span-2 md:col-span-1">
              <span className="index-num">{indexData.collabs.num}</span>
              <h3 className="index-label">{indexData.collabs.label}</h3>
              <div className="space-y-6 md:space-y-10">
                {indexData.collabs.items.map((c, i) => (
                  <div key={i} className="max-w-[420px]">
                    <p className="index-item-static">{c.client}</p>
                    <p className="index-item-sub">{c.role} <span className="opacity-50 ml-1">{c.date}</span></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="index-num">{indexData.awards.num}</span>
              <h3 className="index-label">{indexData.awards.label}</h3>
              <div className="space-y-6 md:space-y-10">
                {indexData.awards.items.map((a, i) => (
                  <div key={i}>
                    {a.url ? (
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="index-item-link inline-flex items-center gap-2">
                        {a.label} <ExternalLink size={12} className="opacity-40" />
                      </a>
                    ) : <p className="index-item-static">{a.label}</p>}
                    <p className="index-item-sub">{a.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="index-num">{indexData.exhibitions.num}</span>
              <h3 className="index-label">{indexData.exhibitions.label}</h3>
              <div className="space-y-6 md:space-y-10">
                {indexData.exhibitions.items.map((e, i) => (
                  <div key={i}>
                    <p className="index-item-static">{e.label}</p>
                    <p className="index-item-sub">{e.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <span className="index-num">{indexData.publications.num}</span>
              <h3 className="index-label">{indexData.publications.label}</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4">
                {indexData.publications.items.map((p, i) => (
                  p.url ? (
                    <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="index-item-link">
                      {p.name}
                    </a>
                  ) : <span key={i} className="index-item-static">{p.name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="relative px-6 md:px-14 py-20 md:py-0 md:h-[var(--header-h)] bg-white flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 border-t border-zinc-100 z-[100]">
          <nav className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {footerData.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="brand-style">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-mention">
            © {CONTENT[lang].brand} . {footerData.location}
          </div>
        </footer>
      </main>
    </div>
  );
}