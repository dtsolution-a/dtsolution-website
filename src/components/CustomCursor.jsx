import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-coral rounded-full pointer-events-none z-[99999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6, // Centering adjustments
          y: mousePosition.y - 6,
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0
        }}
      />

      {/* Follower Ring (Smooth Physics only, No Scaling) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-coral rounded-full pointer-events-none z-[99999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: 'spring',
          stiffness: 100, // Thoda loose aur smooth movement
          damping: 20,
          mass: 0.5
        }}
      />
    </>
  );
};

export default CustomCursor;