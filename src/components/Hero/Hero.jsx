import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import HeroParticles from './HeroParticles'; // <--- IMPORT THIS

const Hero = ({ isLoaded }) => {
  const containerRef = useRef(null);
  
  // Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from('.hero-char', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.2
      })
      .from('.hero-fade', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.5');

    }, containerRef);
    return () => ctx.revert();
  }, [isLoaded]);

  const title = "DIGITAL TRANSFORMATION";

  // Scroll Handler
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="sticky top-0 h-screen flex items-center justify-center bg-noise overflow-hidden pt-20 z-0"
    >
      
      {/* 1. BACKGROUND GLOW (Existing) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* 2. PARTICLE RING (New Animation) */}
      <HeroParticles />

      {/* 3. CONTENT (Z-10 ensures text is above particles) */}
      <motion.div 
        style={{ y, opacity }} 
        className="container-center px-4 text-center z-10 relative"
      >
        
        <div className="hero-fade mb-8 flex flex-col items-center gap-2">
           <span className="px-3 py-1 border border-white/10 rounded-full text-[10px] font-medium text-white/60 uppercase tracking-[0.2em] bg-white/5 backdrop-blur-sm">
             Est. 2025
           </span>
        </div>

        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-8 overflow-hidden">
          {title.split(" ").map((word, i) => (
            <div key={i} className="inline-block mx-2 sm:mx-4">
              {word.split("").map((char, j) => (
                <span key={j} className="hero-char inline-block text-gradient">
                  {char}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <p className="hero-fade max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-12">
          Transforming visions into reality through design.
        </p>

        <div className="hero-fade flex flex-col sm:flex-row gap-6 justify-center items-center">
          
          <motion.button
            onClick={() => handleScrollTo('contact')}
            whileHover={{ scale: 1.02, backgroundColor: "#FF5A36" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-white text-dark font-bold text-xs uppercase tracking-widest transition-colors duration-300 min-w-[160px] cursor-pointer"
          >
            Let's Connect
          </motion.button>
          
          <motion.button
            onClick={() => handleScrollTo('portfolio')}
            whileHover={{ scale: 1.02, borderColor: "#FFFFFF", color: "#FFFFFF" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 border border-white/20 text-gray-400 font-bold text-xs uppercase tracking-widest transition-all duration-300 min-w-[160px] cursor-pointer"
          >
            Our Work
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;