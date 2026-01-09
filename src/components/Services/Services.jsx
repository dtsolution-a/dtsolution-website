import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { servicesData } from '../../data/servicesData'; // Data import

// --- TILT CARD COMPONENT ---
const TiltCard = ({ service, index, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.div
       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
       onMouseMove={(e) => {
           const rect = e.currentTarget.getBoundingClientRect();
           x.set((e.clientX - rect.left) / rect.width - 0.5);
           y.set((e.clientY - rect.top) / rect.height - 0.5);
       }}
       onMouseLeave={() => { x.set(0); y.set(0); }}
       onClick={() => onClick(service.id)}
       className="relative h-[380px] w-full cursor-pointer group perspective-1000"
    >
       <div className="absolute inset-0 bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden transition-colors duration-500 group-hover:border-coral/50 shadow-2xl" style={{ transform: "translateZ(20px)" }}>
           <div className="absolute inset-0 bg-gradient-to-br from-coral/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
               <service.icon size={24} className="text-white mb-4" />
               <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
               <p className="text-gray-500 text-sm">{service.description}</p>
           </div>
           <div className="relative z-10 mt-4 pt-6 border-t border-white/10 flex justify-between items-center" style={{ transform: "translateZ(30px)" }}>
               <span className="text-xs font-bold uppercase text-white group-hover:text-coral transition-colors">View Details</span>
               <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-coral group-hover:text-black transition-all">
                  <FaArrowRight size={10} className="-rotate-45 group-hover:rotate-0 transition-transform" />
               </div>
           </div>
       </div>
    </motion.div>
  );
};

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (id) => {
    navigate(`/service/${id}`);
  };

  return (
    // ID yahan se hata diya kyunki Home.jsx me Wrapper div par laga diya hai
    <section className="pt-40 pb-32 relative z-10 bg-dark overflow-hidden">
      <div className="container-center max-w-[1400px] mx-auto px-6">
        <div className="mb-20 border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">Our Expertise</h2>
            <p className="text-gray-400">Click on any service to explore packages.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 perspective-container">
          {servicesData.map((service, index) => (
            <TiltCard 
              key={service.id} 
              service={service} 
              index={index} 
              onClick={handleServiceClick} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;