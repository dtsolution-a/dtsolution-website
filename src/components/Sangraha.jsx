import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor';

// --- 1. ASSET LOADER ---
const loadImages = (glob) => {
  try { return Object.keys(glob).map((key) => glob[key].default || glob[key]); } 
  catch (error) { return []; }
};

const bookCoverImages = import.meta.glob('../assets/images/Book covers/*.{png,jpg,jpeg,webp}', { eager: true });
const posterImages = import.meta.glob('../assets/images/Posters/*.{png,jpg,jpeg,webp}', { eager: true });
const logoImages = import.meta.glob('../assets/images/Logo Collection/*.{png,jpg,jpeg,webp}', { eager: true });

const allAssets = {
  books: loadImages(bookCoverImages),
  posters: loadImages(posterImages),
  logos: loadImages(logoImages),
};

const getRandomItems = (array, count) => [...array].sort(() => 0.5 - Math.random()).slice(0, count);

// --- 2. PERSPECTIVE HOVER IMAGE (Updated with Smooth Fade) ---
const PerspectiveHoverImage = ({ src, alt, onClick, className = "", label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div 
      ref={ref} 
      onClick={onClick}
      className={`relative z-10 cursor-pointer group ${className}`}
    >
      <style>{`
        .hover-img-container {
            position: relative;
            width: 100%;
            height: 100%;
            perspective: 1000px;
            transform-style: preserve-3d;
        }
        
        .hover-img-container .img-wrapper {
            width: 100%;
            height: 100%;
            transition: transform 0.1s ease-out;
            transform-style: preserve-3d;
        }
        
        .hover-img-container:hover .img-wrapper {
            transform: scale(1.02);
        }

        .hover-img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
            
            /* KEY CHANGE HERE: Added 'filter 0.8s ease' for smooth fade */
            transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.8s ease;
            
            /* Default State: Grayscale */
            filter: grayscale(100%);
        }

        /* Hover State: Color */
        .group:hover .hover-img-container img {
            filter: grayscale(0%);
        }

        /* 3x3 Grid for Tilt */
        .hover-img-container .cell { position: absolute; z-index: 20; width: 33.33%; height: 33.33%; }
        
        .c-1 { top: 0; left: 0; } .c-2 { top: 0; left: 33.33%; } .c-3 { top: 0; left: 66.66%; }
        .c-4 { top: 33.33%; left: 0; } .c-5 { top: 33.33%; left: 33.33%; } .c-6 { top: 33.33%; left: 66.66%; }
        .c-7 { top: 66.66%; left: 0; } .c-8 { top: 66.66%; left: 33.33%; } .c-9 { top: 66.66%; left: 66.66%; }

        .c-1:hover ~ .img-wrapper { transform: rotate3d(1, -1, 0, 8deg); }
        .c-2:hover ~ .img-wrapper { transform: rotate3d(1, 0, 0, 8deg); }
        .c-3:hover ~ .img-wrapper { transform: rotate3d(1, 1, 0, 8deg); }
        .c-4:hover ~ .img-wrapper { transform: rotate3d(0, -1, 0, 8deg); }
        .c-5:hover ~ .img-wrapper { transform: scale(0.98); }
        .c-6:hover ~ .img-wrapper { transform: rotate3d(0, 1, 0, 8deg); }
        .c-7:hover ~ .img-wrapper { transform: rotate3d(-1, -1, 0, 8deg); }
        .c-8:hover ~ .img-wrapper { transform: rotate3d(-1, 0, 0, 8deg); }
        .c-9:hover ~ .img-wrapper { transform: rotate3d(-1, 1, 0, 8deg); }
      `}</style>

      {/* Floating Animation */}
      <motion.div
         animate={{ y: [-5, 5, -5] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
         className="w-full h-full"
      >
          {/* Wipe Mask */}
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-lg">
             <motion.div
                className="absolute inset-0 bg-[#1a1a1a]"
                initial={{ x: "0%" }}
                animate={isInView ? { x: "100%" } : { x: "0%" }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
             />
          </div>

          <div className="hover-img-container">
            {[...Array(9)].map((_, i) => <div key={i} className={`cell c-${i + 1}`} />)}
            
            <div className="img-wrapper relative">
                {/* Removed tailwind classes for grayscale to let CSS handle transition cleanly */}
                <img src={src} alt={alt} className="pointer-events-none block" />
                
                {label && (
                  <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <p className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                       {label}
                     </p>
                  </div>
                )}
            </div>
          </div>
      </motion.div>
    </div>
  );
};

// --- 3. IMAGE MODAL ---
const ImageModal = ({ image, onClose }) => {
  if (!image) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[10000] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-pointer"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-coral transition-colors z-[10001]"><FaTimes size={30} /></button>
      <motion.img 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        src={image} alt="Full View" 
        className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-white/10 relative z-[10002]"
        onClick={(e) => e.stopPropagation()} 
      />
    </motion.div>
  );
};

// --- 4. SECTIONS ---

// A. Hero Section
const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center relative overflow-hidden bg-noise z-10">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-coral opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
       
       <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center justify-center gap-3 mb-6">
             <span className="h-[1px] w-8 bg-coral"></span>
             <span className="text-coral font-mono text-xs tracking-[0.3em] uppercase">Archive . 2025</span>
             <span className="h-[1px] w-8 bg-coral"></span>
          </motion.div>
          <h1 className="text-[12vw] md:text-[10vw] font-display font-bold leading-[0.85] tracking-tighter text-white mix-blend-exclusion">SANGRAHA</h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="mt-8 text-gray-400 text-lg md:text-xl font-light max-w-xl mx-auto tracking-wide">
            A curated vault of visual identity, print media, and graphic exploration.
          </motion.p>
       </motion.div>
    </section>
  );
};

// B. Horizontal Scroll Section
const HorizontalScrollSection = ({ items, onImageClick }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#080808] z-10"> 
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-10 left-10 md:left-20 z-20">
           <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">Selected Works</h2>
           <p className="text-gray-500 text-sm flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
             Scroll Down to Explore
           </p>
        </div>

        <motion.div style={{ x }} className="flex gap-10 pl-[5vw]">
          {items.map((src, i) => (
            <div key={i} className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex-shrink-0">
               <PerspectiveHoverImage 
                  src={src} 
                  alt={`Artwork ${i}`} 
                  onClick={() => onImageClick(src)}
                  label={`Art 0${i+1}`}
                  className="w-full h-full"
               />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// C. Logo Marquee
const LogoMarquee = ({ logos, onImageClick }) => {
  return (
    <section className="py-32 bg-dark border-y border-white/5 relative overflow-hidden z-10">
      <div className="container-center px-6 md:px-20 mb-12 flex justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Identity Marks</h2>
        <span className="text-coral text-xs uppercase tracking-widest">Brand Systems</span>
      </div>
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee gap-8 min-w-full">
          {[...logos, ...logos].map((src, i) => (
            <div key={i} onClick={() => onImageClick(src)} className="w-40 h-40 md:w-60 md:h-60 bg-[#0A0A0A] border border-white/5 flex items-center justify-center p-8 shrink-0 hover:border-coral/50 transition-colors cursor-pointer">
              <img src={src} className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0" alt="Logo" />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

// D. Book Grid
const BookGrid = ({ covers, onImageClick }) => {
  return (
    <section className="py-32 px-6 md:px-20 bg-[#050505] relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Print & Editorial</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Tangible design experiences created for print media.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {covers.map((src, i) => (
            <div key={i} className="break-inside-avoid w-full mb-8">
               <PerspectiveHoverImage 
                  src={src} 
                  alt={`Cover ${i}`} 
                  onClick={() => onImageClick(src)}
                  label="Editorial"
               />
               <div className="mt-3 flex justify-between items-center px-2">
                  <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">Editorial 0{i+1}</span>
                  <FaArrowRight className="text-coral -rotate-45 text-xs" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE ---
const Sangraha = () => {
  const [curated, setCurated] = useState({ books: [], posters: [], logos: [] });
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sangraha | DT Solution Archive";
    setCurated({
      books: getRandomItems(allAssets.books, 12),
      posters: getRandomItems(allAssets.posters, 10),
      logos: getRandomItems(allAssets.logos, 15)
    });
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-coral selection:text-white relative bg-[#050505]">
      
      {/* BACK TO HOME */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-[100] flex items-center gap-3 text-white/50 hover:text-white transition-colors cursor-pointer group mix-blend-difference"
      >
        <span className="p-3 border border-white/20 rounded-full group-hover:border-white/80 group-hover:bg-white group-hover:text-black transition-all duration-300">
           <FaArrowLeft />
        </span>
        <span className="text-xs font-mono uppercase tracking-widest hidden md:block opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
          Back to Home
        </span>
      </motion.button>

      <CustomCursor />
      
      <HeroSection />

      <HorizontalScrollSection items={curated.posters} onImageClick={setSelectedImage} />

      <LogoMarquee logos={curated.logos} onImageClick={setSelectedImage} />

      <BookGrid covers={curated.books} onImageClick={setSelectedImage} />

      <section className="py-20 text-center border-t border-white/5 relative z-10">
        <p className="text-gray-500 text-sm font-mono mb-4">End of Collection</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 border border-white/20 rounded-full text-white text-xs uppercase tracking-widest hover:bg-coral hover:border-coral transition-all duration-300">
          Refresh Archive
        </button>
      </section>

      <AnimatePresence>
        {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Sangraha;