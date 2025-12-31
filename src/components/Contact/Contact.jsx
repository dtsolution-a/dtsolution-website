import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

// Manifesto removed as it is now in a separate component

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    service: '', 
    vision: '' 
  });
  const [focused, setFocused] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- GOOGLE SCRIPT URL ---
  // Replace this with your actual Web App URL after deployment
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxz8E1AdJS05ip39-2ozU9UHGbSh40LZ46QbHmX6i-8Ecy1Q4as0kkjil0JspEPGODv/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', vision: '' });
      
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (error) {
      console.error("Error submitting form", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Related with Graphics",
    "Logo Design",
    "Branding",
    "App Development",
    "Web Development",
    "UI & UX Design",
    "Consultation",
    "Other"
  ];

  return (
    <section id="contact" className="relative bg-[#080808] pt-20 pb-32 border-t border-white/5">
      
      {/* Manifesto Removed */}

      <div className="container-center max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          
          {/* Left Side Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter">
               Let's <br /> <span className="text-gray-700">Talk.</span>
             </h2>
             <p className="text-gray-400 text-lg font-light mb-12 max-w-md">
               Have an idea? We are ready to build the impossible. Drop us a line.
             </p>

             <div className="space-y-8">
               <div>
                 <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email</h4>
                 <a href="mailto:dt.solution.service@gmail.com" className="text-xl text-white hover:text-coral transition-colors font-display">dt.solution.service@gmail.com</a>
               </div>
               <div>
                 <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</h4>
                 <a href="tel:+917048277402" className="text-xl text-white hover:text-coral transition-colors font-display">+91 70482 77402</a>
               </div>
             </div>
          </motion.div>

          {/* Right Side Form */}
          <form onSubmit={handleSubmit} className="space-y-8 mt-8 md:mt-0 relative">
            
            {/* Name */}
            <div className="relative">
              <input 
                type="text" name="name" required
                value={formData.name} onChange={handleChange}
                placeholder="Your Name"
                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                className={`w-full bg-transparent border-b ${focused === 'name' ? 'border-coral' : 'border-white/20'} py-4 text-white placeholder-white/20 outline-none transition-colors duration-500 font-display text-lg`}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input 
                type="email" name="email" required
                value={formData.email} onChange={handleChange}
                placeholder="Your Email"
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                className={`w-full bg-transparent border-b ${focused === 'email' ? 'border-coral' : 'border-white/20'} py-4 text-white placeholder-white/20 outline-none transition-colors duration-500 font-display text-lg`}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <input 
                type="tel" name="phone" required
                value={formData.phone} onChange={handleChange}
                placeholder="Your Phone No."
                onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                className={`w-full bg-transparent border-b ${focused === 'phone' ? 'border-coral' : 'border-white/20'} py-4 text-white placeholder-white/20 outline-none transition-colors duration-500 font-display text-lg`}
              />
            </div>

            {/* Service Dropdown */}
            <div className="relative">
              <select 
                name="service" required
                value={formData.service} onChange={handleChange}
                onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}
                className={`w-full bg-[#080808] border-b ${focused === 'service' ? 'border-coral' : 'border-white/20'} py-4 text-white outline-none transition-colors duration-500 font-display text-lg appearance-none cursor-pointer`}
                style={{ color: formData.service ? 'white' : 'rgba(255,255,255,0.2)' }}
              >
                <option value="" disabled>Select Service Interest</option>
                {services.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">▼</div>
            </div>

            {/* Vision (Optional) */}
            <div className="relative">
              <textarea 
                name="vision" 
                value={formData.vision} onChange={handleChange}
                placeholder="Tell us your Vision (Optional)"
                rows="3"
                onFocus={() => setFocused('vision')} onBlur={() => setFocused(null)}
                className={`w-full bg-transparent border-b ${focused === 'vision' ? 'border-coral' : 'border-white/20'} py-4 text-white placeholder-white/20 outline-none transition-colors duration-500 font-display text-lg resize-none`}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className={`text-white text-2xl font-display font-bold flex items-center gap-4 group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} 
              {!isSubmitting && (
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-coral group-hover:border-coral transition-all duration-300">
                  →
                </span>
              )}
            </motion.button>
          </form>

        </div>
      </div>

      {/* Animated Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-[#121212] border border-white/10 p-10 rounded-2xl max-w-md w-full text-center relative shadow-2xl"
            >
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <FaTimes />
              </button>

              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaCheckCircle className="text-4xl text-green-500" />
              </motion.div>

              <h3 className="text-3xl font-display font-bold text-white mb-2">Received!</h3>
              <p className="text-gray-400 font-light mb-6">
                Your vision has reached our desk. We have sent a confirmation email to you. We will connect shortly.
              </p>

              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-3 bg-coral text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-white hover:text-black transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Contact;