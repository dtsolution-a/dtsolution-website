import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    title: "Love Your Nails",
    category: "E-Commerce Branding Ui",
    description: "Reimagining the future of digital banking with a complete visual identity overhaul.",
    color: "#1a1a1a",
    img: "https://cdn.myportfolio.com/058ec307-2fcd-4d98-a096-c63e56b455d0/7332e166-2d2e-4171-9ba4-3e42e0d21b98_rw_1920.jpg?h=6d9a83a606aeaa2109ea4df1a233cec3",
    tags: ["React", "UI/UX", "Development"],
    link: "https://www.figma.com/proto/a6RSXTATsguMaAsZ0mR7TG/Love-Your-Nails?node-id=1-2&p=f&t=gYW5wRtahVZMUb1S-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1" // Add your Figma links here
  },
  {
    title: "Patel Packaging UI", // You might want to change this duplicate title
    category: "Industrial Branding Ui",
    description: "Reimagining the future of digital banking with a complete visual identity overhaul.",
    color: "#1a1a1a",
    img: "https://cdn.myportfolio.com/058ec307-2fcd-4d98-a096-c63e56b455d0/a00f40d1-257f-4801-aedf-15bdad05954d_rw_3840.jpg?h=da7a3a4d48e8d5dfbbfafa8cca762ad2",
    tags: ["React", "UI/UX", "Development"],
    link: "https://www.figma.com/proto/D3JW4keOlAKR5mrW6GQ6vr?content-scaling=fixed&kind=proto&node-id=1-2&page-id=0%3A1&scaling=min-zoom&starting-point-node-id=1%3A2&fuid=1238818642135714882"
  },
  {
    title: "Fin-Chat",
    category: "Fintech Branding",
    description: "A high-performance streaming interface designed for millions of concurrent users.",
    color: "#161616",
    img: "https://cdn.myportfolio.com/058ec307-2fcd-4d98-a096-c63e56b455d0/c172e3d4-7cf0-4cfa-ae6d-c309ef7be110_rw_3840.jpg?h=8441fd0bd3929e33ca24687599ab3afd",
    tags: ["Flutter", "UI/UX", "Development"],
    link: "https://www.figma.com/proto/T849U9ZdLb9jlm91uWa2YG?content-scaling=fixed&kind=proto&node-id=1-28&page-id=0%3A1&scaling=scale-down&starting-point-node-id=1%3A28&fuid=1238818642135714882"
  }
];

const Card = ({ i, title, description, category, img, tags, link, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }} 
        // Added 'group' class here to control hover effects for children
        className="relative flex flex-col md:flex-row h-[500px] w-full max-w-[1000px] rounded-3xl border border-white/10 bg-[#121212] overflow-hidden shadow-2xl origin-top group"
      >
        {/* Content */}
        <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between relative z-10">
          <div>
             <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-wider text-gray-400">
                    {tag}
                  </span>
                ))}
             </div>
             
             {/* Title: Added group-hover to change color to coral (orange) */}
             <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight group-hover:text-coral transition-colors duration-500">
               {title}
             </h3>
             
             <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
               {description}
             </p>
          </div>

          {/* New View Project Button */}
          <div className="mt-8 md:mt-0">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 group-hover:border-white/40"
            >
              View Project 
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-[55%] h-full relative overflow-hidden">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <img 
              src={img} 
              alt={title} 
              // Changed hover:grayscale-0 to group-hover:grayscale-0
              // Added transition duration for slow effect
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#121212]/80 md:to-[#121212]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const container = useRef(null);
  const navigate = useNavigate(); 
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} id="portfolio" className="relative bg-dark pb-20">
      
      {/* Intro */}
      <div className="pt-32 pb-12 px-6 container-center max-w-[1400px] mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-6">
          Selected <span className="text-gray-600">Works</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
          A showcase of our most impactful digital transformations.
        </p>
      </div>

      {/* Projects Stack */}
      <div className="mt-10 mb-32 px-4">
        {projects.map((project, i) => {
          const targetScale = 1 - ( (projects.length - i) * 0.05 );
          return (
            <Card 
              key={i} 
              i={i} 
              {...project} 
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* --- SANGRAHA TRIGGER --- */}
      <div className="container-center max-w-[1200px] mx-auto px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          onClick={() => navigate('/sangraha')}
          className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer group"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
             <img 
               src="https://i.ibb.co/8gFwh6yc/abstract-gradient-background-wallpaper.jpg" 
               alt="Sangraha Background" 
               className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
             />
             <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
             <motion.span 
               className="text-xs md:text-sm text-coral font-bold tracking-[0.3em] uppercase mb-4 border border-coral/30 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md"
               whileHover={{ scale: 1.1 }}
             >
               The Hidden Archive
             </motion.span>
             
             <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white tracking-tighter mb-2 group-hover:tracking-normal transition-all duration-700">
               SANGRAHA
             </h2>
             
             <p className="text-gray-300 font-light italic text-lg opacity-80 group-hover:opacity-100 transition-opacity">
               Explore our exclusive collection of graphic artistry
             </p>

             <motion.div 
               className="mt-8 w-16 h-16 rounded-full border border-white/30 flex items-center justify-center text-white text-xl bg-white/10 backdrop-blur-md group-hover:bg-coral group-hover:border-coral transition-all duration-500"
               whileHover={{ rotate: 90 }}
             >
               <FaArrowRight />
             </motion.div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Portfolio;