import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [time, setTime] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2000);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#050505] pt-20 overflow-hidden relative border-t border-white/5 flex flex-col justify-between min-h-[80vh]">
      
      <div className="container-center px-6 max-w-[1400px] mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* --- LEFT COLUMN --- */}
          <div className="space-y-8 max-w-sm">
             {/* Branding */}
             <div>
               <div 
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 className="cursor-pointer flex items-center mb-2"
               >
                 <span className="text-3xl font-bold font-display tracking-tight text-white">DT</span>
                 <span className="text-3xl font-bold font-display tracking-tight text-coral">S</span>
                 
                 <div className="overflow-hidden flex">
                   <motion.span
                     initial={{ width: 0, opacity: 0 }}
                     animate={{ 
                       width: isHovered ? "auto" : 0,
                       opacity: isHovered ? 1 : 0,
                       paddingLeft: isHovered ? "2px" : "0px"
                     }}
                     transition={{ duration: 0.5, ease: "easeOut" }}
                     className="text-3xl font-bold font-display tracking-tight text-white whitespace-nowrap"
                   >
                     olution
                   </motion.span>
                 </div>
                 <span className="text-3xl font-bold font-display tracking-tight text-coral">.</span>
               </div>
               
               <p className="text-gray-400 text-sm italic font-light tracking-wide border-l-2 border-coral pl-3">
                 Designing your transformation into Success
               </p>
             </div>{/* MSME Badge (Updated to be Clickable) */}
             <a 
               href="https://udyamregistration.gov.in/verifyudyambarcode.aspx?verifyudrn=RSJY8rgnTgRTm8ijboLT5cK97n99ZnSNIyyOuwQCSqA="
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-3 border border-white/10 rounded-lg p-3 bg-white/5 backdrop-blur-sm w-fit group hover:border-coral/50 transition-colors duration-300 cursor-pointer"
             >
               <img 
                 src="https://iconape.com/wp-content/files/ua/258195/png/msme-micro-small-medium-enterprises-logo.png" 
                 alt="MSME Certified" 
                 className="h-8 w-auto opacity-80 filter brightness-200 contrast-0 grayscale group-hover:grayscale-0 transition-all duration-300"
               />
               <div className="flex flex-col">
                 <span className="text-[10px] uppercase tracking-widest text-coral font-bold">Government Certified</span>
                 <span className="text-[10px] text-gray-400 font-mono">UDYAM-GJ-01-0578059</span>
               </div>
             </a>
             {/* Time & Location */}
             <div className="pt-2">
                <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-wider mb-1">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   <span>Ahmedabad, India</span>
                </div>
                <p className="text-xl text-white font-mono font-light tabular-nums tracking-widest">{time}</p>
             </div>
          </div>

          {/* --- CENTER COLUMN: COMPLETE SLOGAN --- */}
          <div className="md:mt-8 text-center group cursor-help relative min-h-[120px] flex flex-col justify-center items-center">
             
             {/* Sanskrit Text (Moves Up on Hover) */}
             <div className="transition-all duration-500 group-hover:-translate-y-4">
               <p className="text-white text-xl md:text-2xl font-medium tracking-wide leading-relaxed group-hover:text-coral transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                 "शिल्पेन संदेशो गच्छति दूरम्।
               </p>
               <p className="text-white text-xl md:text-2xl font-medium tracking-wide leading-relaxed group-hover:text-coral transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                 कलया जगत् सुशोभते॥"
               </p>
             </div>
             
             {/* English Explanation (Reveals Below) */}
             <div className="absolute top-full mt-0 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none w-max">
               <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500">
                 Through design, messages travel far.
               </span>
               <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500">
                 Through art, the world becomes beautiful.
               </span>
             </div>
          </div>

          {/* --- RIGHT COLUMN: Links --- */}
          <div className="flex gap-12 text-sm uppercase tracking-widest text-gray-400 md:mt-4">
             <div className="flex flex-col gap-4">
                <a href="#portfolio" className="hover:text-white transition-colors hover:translate-x-1 duration-300 inline-block">Work</a>
                <a href="#services" className="hover:text-white transition-colors hover:translate-x-1 duration-300 inline-block">Services</a>
                <a href="#about" className="hover:text-white transition-colors hover:translate-x-1 duration-300 inline-block">About</a>
             </div>
             <div className="flex flex-col gap-4">
                <a href="https://www.instagram.com/dt_solution/" className="hover:text-white transition-colors hover:translate-x-1 duration-300 inline-block">Instagram</a>
                <a href="https://www.linkedin.com/company/dts-media/?viewAsMember=true" className="hover:text-white transition-colors hover:translate-x-1 duration-300 inline-block">LinkedIn</a>
                <a href="https://iamdhiraj777.myportfolio.com/" className="hover:text-coral transition-colors hover:translate-x-1 duration-300 inline-block">Adobe Portfolio</a>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-end gap-4">
           <p className="text-[10px] text-gray-600 uppercase tracking-wider">© 2025 DT Solution.</p>
           <p className="text-[10px] text-gray-600 uppercase tracking-wider">Crafted with Soul.</p>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="w-full overflow-hidden leading-[0.8] select-none pointer-events-none opacity-[0.05] mt-[-5vw] relative z-0">
         <h1 className="text-[18vw] font-display font-bold text-center text-white translate-y-[10%]">
            DT SOLUTION
         </h1>
      </div>
    </footer>
  );
};

export default Footer;