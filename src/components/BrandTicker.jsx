import React from 'react';
import { motion } from 'framer-motion';

// --- ASSET LOADER ---
// Note: Yahan aap apne Client ke logos ka path dalein. 
// Agar alag folder hai to path change kar lein, abhi maine 'Logo Collection' rakha hai.
const clientLogos = import.meta.glob('../assets/images/Logo Collection/*.{png,jpg,jpeg,webp}', { eager: true });

const loadImages = (glob) => {
  try { return Object.keys(glob).map((key) => glob[key].default || glob[key]); } 
  catch (error) { return []; }
};

const logos = loadImages(clientLogos); 

const BrandTicker = () => {
  // Agar logos kam hain (eg. < 5), to unhe repeat karein taaki loop smoothly chale
  const scrollingLogos = [...logos, ...logos, ...logos, ...logos]; 

  return (
    <div className="py-12 border-b border-white/5 bg-[#050505] relative z-20 overflow-hidden">
      
      <div className="container-center px-6 mb-8 text-center">
        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.3em]">
          Trusted by Industry Leaders
        </p>
      </div>
      
      {/* Marquee Container with Fade Edges */}
      <div className="relative flex overflow-hidden w-full mask-gradient">
        
        <motion.div 
          className="flex gap-16 md:gap-24 min-w-full items-center"
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 40, // Speed adjust karein (Higher = Slower)
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {scrollingLogos.map((src, i) => (
             <div 
               key={i} 
               className="w-24 h-12 md:w-32 md:h-16 flex-shrink-0 flex items-center justify-center opacity-40 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer"
             >
               <img src={src} alt="Client Logo" className="w-full h-full object-contain" />
             </div>
          ))}
        </motion.div>

      </div>
      
      {/* CSS for Side Fade Effect */}
      <style>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
};

export default BrandTicker;