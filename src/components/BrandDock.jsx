import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- ASSET LOADER ---
const clientLogos = import.meta.glob('../assets/images/Logo/*.{png,jpg,jpeg,webp}', { eager: true });
const loadImages = (glob) => {
  try { return Object.keys(glob).map((key) => glob[key].default || glob[key]); } 
  catch (error) { return []; }
};
const logos = loadImages(clientLogos);

// --- DOCK ITEM (Same as before) ---
const DockItem = ({ src, mouseX, index }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-200, 0, 200], [100, 160, 100]); 
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      viewport={{ once: true }}
      className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden backdrop-blur-md shadow-2xl z-20"
    >
      <motion.div
         animate={{ y: [-2, 2, -2] }}
         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
         className="w-full h-full flex items-center justify-center"
      >
          <div className="absolute inset-0 bg-coral/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl" />
          <img 
            src={src} 
            alt="Brand" 
            className="w-[65%] h-[65%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100" 
          />
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const BrandDock = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <section className="py-24 border-b border-white/5 bg-[#050505] relative z-20 flex flex-col items-center overflow-hidden">
      
      {/* --- NEW MOVING BACKGROUND ANIMATION (SUBTLE) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Orb 1 - Slow Drift Left (White Glow) */}
        <motion.div
            className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-white/5 blur-[180px] rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 30, // Very slow speed
              repeat: Infinity,
              ease: "easeInOut"
            }}
        />
        {/* Orb 2 - Slow Drift Right (Faint Coral Glow for depth) */}
        <motion.div
            className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-coral/5 blur-[180px] rounded-full"
            animate={{
              x: [0, -150, 0],
              y: [0, -100, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{
              duration: 35, // Different speed for organic feel
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
        />
      </div>

      {/* 1. TEXT SECTION */}
      <div className="mb-12 text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Trusted by <span className="text-gray-600">Visionaries</span>
          </h3>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed">
            We partner with brands that refuse to blend in. From tech startups to established giants.
          </p>
        </motion.div>
      </div>

      {/* 2. DOCK CONTAINER */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-48 items-end gap-6 px-4 pb-4 relative z-10"
      >
        {logos.slice(0, 6).map((src, i) => ( 
          <DockItem key={i} src={src} mouseX={mouseX} index={i} />
        ))}
      </motion.div>
      
    </section>
  );
};

export default BrandDock;