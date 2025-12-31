import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smart Hover Handler
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2000); // 2 Seconds delay before closing
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#portfolio' },
    { name: 'About', href: '#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-dark/80 backdrop-blur-md border-b border-white/5' : 'py-8'
      }`}
    >
      <div className="container-center flex justify-between items-center px-6 md:px-12 max-w-[1400px] mx-auto">
        
        {/* Animated Brand Logo */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer flex items-center z-50"
        >
          <span className="text-2xl font-bold font-display tracking-tight text-white">DT</span>
          <span className="text-2xl font-bold font-display tracking-tight text-coral">S</span>
          
          <div className="overflow-hidden flex">
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
                paddingLeft: isHovered ? "2px" : "0px"
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl font-bold font-display tracking-tight text-white whitespace-nowrap"
            >
              olution
            </motion.span>
          </div>
          <span className="text-2xl font-bold font-display tracking-tight text-coral">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-dark font-bold text-sm uppercase tracking-wide hover:bg-coral hover:text-white transition-colors"
          >
            Let's Talk
          </motion.a>
        </div>
        
        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-xl">☰</div>
      </div>
    </motion.nav>
  );
};

export default Navbar;