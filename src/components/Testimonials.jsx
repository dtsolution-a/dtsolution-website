import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const reviews = [
  { name: "Dr. Poonam Patel", role: "Founder, Medialoop Tech Solutions", text: "A pleasure working with my former BCA students—now skilled graphic designers who bring strong color sense, clean aesthetics, and thoughtful design to every project. Watching their growth and collaborating professionally has been truly rewarding and inspiring." },
  { name: "Kinal Patadiya", role: "Founder, The Nail Explorer", text: "I Had an amazing experience working with Dhiraj for my nail brand, The Nail Explore 💅✨ From the very beginning, his creativity and clear understanding of my brand stood out. He designed my logo, loyalty card, and offer posts with great attention to detail and a stylish, trendy touch." },
  { name: "Arnav", role: "IEEE Member, IEEE Explore", text: "Dhiraj Singh’s work is next-level! He delivered 11 stunning, high-quality merchandise designs for our IEEE Student Branch in record time and at a great cost. His creativity outshines professional agencies. I highly recommend him for anyone needing top-tier, professional design work." },
  { name: "Kinal Patadiya", role: "CEO, SRD Jewells", text: "I’m extremely happy with the festival post designs created for my jewelry business, Dhiraj is truly talented and has an excellent eye for even the smallest details. Each post beautifully reflected tradition, elegance, and luxury, and the designs helped my brand stand out during every festival season. Thank you for consistently delivering such high-quality and creative work. Highly recommended!" },
  { name: "Harsimran", role: "Founder, HarTime Social", text: "Big thanks to Dhiraj for creating my website exactly the way I imagined it. He really understood all my requirements, paid attention to every detail, and delivered a smooth, well-working site. As a social media manager, I truly understand how important a strong online presence is — and he turned that dream into reality. Super grateful for his work!" },
  
  // { name: "Vikram Singh", role: "Owner, VS Motors", text: "Best creative agency in Ahmedabad. They understand modern aesthetics." },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section ref={containerRef} className="py-32 bg-dark relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-coral/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-center max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-[1px] bg-coral"></span>
            <span className="text-coral uppercase tracking-widest text-sm font-bold">Client Verdicts</span>
            <span className="w-12 h-[1px] bg-coral"></span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Trusted by Visionaries.
          </h2>
        </motion.div>

        {/* The Focus Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
             onMouseLeave={() => setHoveredIndex(null)}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`
                relative p-10 rounded-2xl border transition-all duration-500 cursor-default group
                ${hoveredIndex === index ? 'bg-white/5 border-coral scale-[1.02] z-10 shadow-[0_0_30px_rgba(255,90,54,0.15)]' : 'bg-white/[0.02] border-white/5'}
                ${hoveredIndex !== null && hoveredIndex !== index ? 'blur-[2px] opacity-50 scale-95' : 'opacity-100'}
              `}
            >
              {/* Quote Icon */}
              <div className="text-4xl text-coral/50 font-serif mb-6 transition-colors group-hover:text-coral">❝</div>
              
              <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 group-hover:text-white transition-colors">
                {review.text}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5 group-hover:border-coral/30 transition-colors">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-white font-display font-bold group-hover:border-coral transition-colors">
                   {review.name.charAt(0)}
                 </div>
                 <div>
                   <h4 className="text-white font-display font-bold text-base group-hover:text-coral transition-colors">{review.name}</h4>
                   <p className="text-gray-500 text-xs uppercase tracking-wider group-hover:text-gray-400">{review.role}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;