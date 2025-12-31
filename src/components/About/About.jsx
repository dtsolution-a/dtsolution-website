import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFigma, FaReact } from 'react-icons/fa';
import { 
  SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiCoreldraw,
  SiFlutter, SiDart, SiGreensock, SiOpenai 
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// --- SPOTLIGHT CARD (Same Glow Effect) ---
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,90,54,0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // FIXED ANIMATION: Ab title screen par rukega
      const words = gsap.utils.toArray('.about-reveal-text');
      
      gsap.from(words, {
        scrollTrigger: {
          trigger: '.about-header',
          start: 'top 85%', // Thoda jaldi shuru hoga
          end: 'bottom 20%', // End point neeche kar diya
          toggleActions: "play none none reverse", // Scroll down par play hoga, aur tab tak rahega jab tak upar wapas na jayein
        },
        y: 50,
        opacity: 0,
        rotationX: -45,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Tech Category Component
  const TechCategory = ({ title, icons }) => (
    <div className="mb-6 last:mb-0">
      <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-4">
        {icons.map((item, idx) => (
          <div key={idx} className="group relative flex flex-col items-center">
             <div className="text-2xl text-gray-400 group-hover:text-white transition-colors duration-300">
               {item.icon}
             </div>
             {/* Tooltip */}
             <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] bg-white text-black px-2 py-1 rounded font-bold">
               {item.name}
             </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="about" ref={sectionRef} className="py-32 relative bg-dark overflow-hidden">
      
      {/* Background Line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-coral to-transparent opacity-50 hidden md:block" />

      <div className="container-center max-w-[1400px] mx-auto px-6">
        
        {/* 1. Header Section */}
        <div className="about-header mb-24 text-center md:text-left">
           <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
            <span className="about-reveal-text inline-block text-white">DESIGN</span>{' '}
            <span className="about-reveal-text inline-block text-gray-600">IS A</span>{' '}
            <span className="about-reveal-text inline-block text-white">PLAN</span>
           </h2>
           <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed md:pl-2">
            For arranging elements in such a way as best to accomplish a particular <span className="text-coral font-medium">PURPOSE</span>.
           </p>
        </div>

        {/* 2. Bento Grid Layout */}
        <div className="grid md:grid-cols-12 gap-6">
          
          {/* --- LEFT COLUMN (Philosophy & AI Future) --- */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            <SpotlightCard className="p-10 flex-1 flex flex-col">
               <div className="relative">
                 <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-display font-bold text-white pointer-events-none select-none">"</div>
                 <h3 className="text-3xl font-display font-bold text-white mb-6">The Mindset</h3>
                 <p className="text-gray-400 text-lg leading-relaxed mb-8">
                   We don't just build websites; we construct digital ecosystems. Every pixel is calculated, every interaction is intentional.
                 </p>
               </div>
               
               {/* Values Grid */}
               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-white font-bold mb-1">Precision</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Obsession with every pixel.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-white font-bold mb-1">Impact</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Design that drives growth.</p>
                  </div>
               </div>

               {/* --- NEW FUTURISTIC AI SECTION --- */}
               <div className="mt-auto relative p-6 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 to-purple-900/10 overflow-hidden group">
                  
                  {/* Animated Background Pulse */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full group-hover:bg-indigo-500/30 transition-all duration-1000 animate-pulse" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                       <SiOpenai className="text-2xl text-indigo-400" />
                       <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 uppercase tracking-wider">
                         AI Native
                       </h4>
                    </div>
                    
                    <p className="text-sm text-gray-300 font-light leading-relaxed mb-4">
                       We don't just use tools; we live in the algorithm. Integrating <span className="text-white font-medium">Gen-AI & LLMs</span> into our daily workflow to break creative boundaries.
                    </p>
                    
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       <p className="text-[10px] uppercase tracking-widest text-indigo-200/70 font-mono">
                         Developing Proprietary AI Solutions
                       </p>
                    </div>
                  </div>
               </div>

            </SpotlightCard>
          </div>

          {/* --- RIGHT COLUMN (Tech Stack) --- */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Capabilities */}
            <SpotlightCard className="p-8">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Powered By</h3>
              
              <div className="space-y-8">
                 {/* 1. Graphics Suite */}
                 <TechCategory 
                    title="Graphics Engine"
                    icons={[
                      { icon: <SiAdobephotoshop className="hover:text-[#31A8FF]" />, name: "Photoshop" },
                      { icon: <SiAdobeillustrator className="hover:text-[#FF9A00]" />, name: "Illustrator" },
                      { icon: <SiAdobeindesign className="hover:text-[#FF3366]" />, name: "InDesign" },
                      { icon: <SiCoreldraw className="hover:text-[#00CC33]" />, name: "CorelDraw" },
                    ]}
                 />

                 <div className="h-[1px] w-full bg-white/5"></div>

                 {/* 2. Web Core */}
                 <TechCategory 
                    title="Web Core"
                    icons={[
                      { icon: <FaFigma className="hover:text-[#F24E1E]" />, name: "Figma" },
                      { icon: <FaReact className="hover:text-[#61DAFB]" />, name: "React" },
                      { icon: <SiGreensock className="hover:text-[#88CE02]" />, name: "GSAP" },
                    ]}
                 />

                 <div className="h-[1px] w-full bg-white/5"></div>

                 {/* 3. App Development */}
                 <TechCategory 
                    title="App Architecture"
                    icons={[
                      { icon: <SiFlutter className="hover:text-[#02569B]" />, name: "Flutter" },
                      { icon: <SiDart className="hover:text-[#0175C2]" />, name: "Dart" },
                      { icon: <FaReact className="hover:text-[#61DAFB]" />, name: "React Native" },
                    ]}
                 />
              </div>
            </SpotlightCard>

            {/* Est Year (Compact) */}
            <SpotlightCard className="p-6 flex items-center justify-between">
               <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Established</p>
                  <p className="text-3xl font-display font-bold text-white">2025</p>
               </div>
               <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-gray-500">Vision</p>
                  <p className="text-3xl font-display font-bold text-coral">∞ </p>
               </div>
            </SpotlightCard>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;