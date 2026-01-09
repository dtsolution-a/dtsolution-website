import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { servicesData } from '../../data/servicesData';
import CustomCursor from '../CustomCursor';

// --- ANIMATED BACKGROUND COMPONENT (New Design) ---
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-coral/10 rounded-full blur-[120px]"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
  );
};

// --- PLAN INQUIRY MODAL (Fixed Cursor & Design) ---
const PlanInquiryModal = ({ planName, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxz8E1AdJS05ip39-2ozU9UHGbSh40LZ46QbHmX6i-8Ecy1Q4as0kkjil0JspEPGODv/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name, email: formData.email, phone: formData.phone,
            service: `Selected Plan: ${planName}`, vision: formData.message || "No message"
          })
        });
        setIsSuccess(true);
        setTimeout(() => { onClose(); setIsSuccess(false); }, 4000);
      } catch (error) { 
        alert("Submission Failed"); 
        setIsSubmitting(false); 
      }
  };

  return (
    // FIX: Added !cursor-auto to force default cursor visibility
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 !cursor-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden"
      >
         {/* Modal Glow */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-coral to-transparent opacity-50" />
         
         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><FaTimes/></button>
         
         {!isSuccess ? (
             <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                 <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Inquiring For</h3>
                    <p className="text-xl font-display font-bold text-white">{planName}</p>
                 </div>
                 
                 <div className="space-y-4">
                    <input type="text" required placeholder="Your Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-coral focus:bg-white/10 outline-none transition-all placeholder-gray-600 !cursor-text" onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input type="email" required placeholder="Email Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-coral focus:bg-white/10 outline-none transition-all placeholder-gray-600 !cursor-text" onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input type="tel" required placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-coral focus:bg-white/10 outline-none transition-all placeholder-gray-600 !cursor-text" onChange={e => setFormData({...formData, phone: e.target.value})} />
                 </div>

                 <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-coral hover:text-white transition-all shadow-lg !cursor-pointer">
                    {isSubmitting ? 'Processing...' : 'Send Request'}
                 </button>
             </form>
         ) : (
            <div className="text-center text-white py-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                    <FaCheckCircle className="text-4xl text-green-500"/>
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="text-gray-400 text-sm">Our team will get back to you shortly.</p>
            </div>
         )}
      </motion.div>
    </div>
  );
};

// --- MAIN PAGE ---
const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const service = servicesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) return <div className="text-white text-center pt-40">Service Not Found</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-10 pb-20 relative z-50 cursor-none overflow-x-hidden selection:bg-coral selection:text-white">
        
        {/* Cursor & Background */}
        <div className="fixed inset-0 z-[9999] pointer-events-none"><CustomCursor /></div>
        <AnimatedBackground />

        <div className="container-center max-w-[1400px] mx-auto px-6 relative z-10">
            
            {/* Back Button */}
            <motion.button 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                onClick={() => navigate('/', { state: { scrollTo: 'services' } })} 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-16 group cursor-none backdrop-blur-md bg-white/5 px-6 py-3 rounded-full border border-white/5 hover:border-white/20 w-fit"
            >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform"/>
                <span className="uppercase tracking-widest text-xs font-bold">Back to Services</span>
            </motion.button>

            {/* Header with Animation */}
            <div className="mb-20 pb-8 relative">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {service.title}
                </motion.h1>
                <motion.div 
                    initial={{ width: 0 }} animate={{ width: 100 }} transition={{ delay: 0.5, duration: 1 }}
                    className="h-2 bg-coral mb-8"
                />
                <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="text-2xl text-gray-300 max-w-3xl font-light leading-relaxed glass-text"
                >
                    {service.description}
                </motion.p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
                {service.subServices.map((sub, index) => (
                    <button 
                        key={index} onClick={() => setActiveTab(index)} 
                        className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all border whitespace-nowrap cursor-none backdrop-blur-md ${activeTab === index ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                    >
                        {sub.name}
                    </button>
                ))}
            </div>

            {/* Packages Grid (Glassmorphism) */}
            <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {service.subServices[activeTab].packages.map((pkg, idx) => (
                    <div 
                        key={idx} 
                        className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-500 group overflow-hidden ${pkg.highlight ? 'bg-gradient-to-b from-white/10 to-transparent border-coral/50 shadow-[0_0_40px_rgba(255,107,107,0.1)]' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}`}
                    >
                        {/* Highlight Badge */}
                        {pkg.highlight && (
                            <div className="absolute top-0 right-0 bg-coral text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                                Popular
                            </div>
                        )}

                        <h4 className={`text-2xl font-bold mb-8 ${pkg.highlight ? 'text-white' : 'text-gray-300'}`}>{pkg.name}</h4>
                        
                        <ul className="space-y-5 flex-grow mb-10">
                            {pkg.features.map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-4 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <FaCheck size={12} className={`mt-1 flex-shrink-0 ${pkg.highlight ? 'text-coral' : 'text-gray-600'}`} />
                                    <span className="leading-relaxed">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        {/* FIX 1: Button Colors Fixed - White BG, Black Text on Hover */}
                        <button 
                            onClick={() => setSelectedPlan(`${service.title} - ${pkg.name}`)}
                            className={`w-full py-4 text-xs font-bold uppercase tracking-widest border transition-all rounded-xl cursor-none relative overflow-hidden group/btn 
                                ${pkg.highlight 
                                    ? 'bg-white text-black border-white hover:bg-coral hover:text-white hover:border-coral' 
                                    : 'border-white/20 text-white hover:bg-white hover:text-black hover:border-white'}`}
                        >
                            <span className="relative z-10">Select Plan</span>
                        </button>
                    </div>
                ))}
            </motion.div>
        </div>

        <AnimatePresence>
            {selectedPlan && <PlanInquiryModal planName={selectedPlan} onClose={() => setSelectedPlan(null)} />}
        </AnimatePresence>
    </div>
  );
};

export default ServiceDetail;