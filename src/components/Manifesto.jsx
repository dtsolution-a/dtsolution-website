import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Manifesto = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Separate phrases for two lines
  const line1 = "In a digital ocean of noise,";
  const line2 = "we are the signal.";
  const subQuote = "We don't just build brands; we forge legacies that outlive trends.";

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex flex-col items-center justify-center bg-[#050505] overflow-hidden py-24">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] bg-coral opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="container-center px-6 max-w-5xl text-center relative z-10">
        
        <motion.div 
          initial={{ height: 0 }}
          animate={isInView ? { height: 60 } : { height: 0 }}
          transition={{ duration: 1 }}
          className="w-[1px] bg-gradient-to-b from-transparent via-coral to-transparent mx-auto mb-10"
        />

        {/* --- MAIN STATEMENT (SPLIT INTO 2 LINES) --- */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-tight text-white mb-6 tracking-tight flex flex-col items-center gap-2">
          
          {/* Line 1 */}
          <div className="overflow-hidden">
            {line1.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mx-2">
                <motion.span
                  initial={{ y: 100, rotate: 5 }}
                  animate={isInView ? { y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="inline-block origin-top-left"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Line 2 (Signal) */}
          <div className="overflow-hidden">
            {line2.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mx-2">
                <motion.span
                  initial={{ y: 100, rotate: 5 }}
                  animate={isInView ? { y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + (i * 0.05), ease: [0.2, 0.65, 0.3, 0.9] }} // Added extra delay for 2nd line
                  className="inline-block origin-top-left text-coral" // Optional: Highlighted signal in Coral color
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

        </h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-gray-400 font-serif italic max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          "{subQuote}"
        </motion.p>

        <div className="relative inline-block mt-2 w-full">
           <motion.div
             initial={{ pathLength: 0, opacity: 0 }}
             animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
             transition={{ duration: 2.5, ease: "easeInOut", delay: 1.5 }}
             className="text-white relative z-10 flex justify-center items-center"
           >
             <h3 
               className="font-signature text-5xl md:text-7xl lg:text-8xl text-white leading-relaxed py-2 px-4"
               style={{ 
                 fontFamily: "'Mrs Saint Delafield', cursive",
                 textShadow: "0 0 25px rgba(255, 255, 255, 0.15)",
                 whiteSpace: "nowrap"
               }}
             >
               Dhiraj & Tejas
             </h3>
           </motion.div>
           
           <motion.p 
             initial={{ opacity: 0, letterSpacing: "0em" }}
             animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
             transition={{ duration: 1.5, delay: 2.5 }}
             className="text-[10px] md:text-xs uppercase text-coral font-bold mt-0 relative z-20 bg-[#050505]/50 backdrop-blur-sm px-4 inline-block rounded-full"
           >
             Founders, DT Solution
           </motion.p>
        </div>

      </div>
    </section>
  );
};

export default Manifesto;