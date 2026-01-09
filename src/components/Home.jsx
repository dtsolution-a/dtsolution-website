import { useEffect, useState } from 'react';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import SmoothScroll from './SmoothScroll';

import Navbar from './Navbar';

import CustomCursor from './CustomCursor';

import Hero from './Hero/Hero';

import BrandDock from './BrandDock';

import About from './About/About';

import Services from './Services/Services';

import Testimonials from './Testimonials';

import Portfolio from './Portfolio/Portfolio';

import Contact from './Contact/Contact';

import Manifesto from './Manifesto';

import Footer from './Footer/Footer';



// Preloader Component

const Preloader = ({ onComplete }) => {

  return (

    <motion.div

      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"

      initial={{ opacity: 1 }}

      exit={{ opacity: 0, transition: { duration: 0.8 } }}

    >

      <motion.div

        initial={{ opacity: 0, scale: 0.95 }}

        animate={{ opacity: 1, scale: 1 }}

        transition={{ duration: 1.2, ease: "easeOut" }}

        onAnimationComplete={() => setTimeout(onComplete, 1800)}

        className="text-center relative"

      >

        <h2 className="text-xl md:text-3xl font-display text-white/90 font-light tracking-[0.2em]">

          शिल्पेन संदेशो गच्छति दूरम्

        </h2>

        <motion.div

          initial={{ scaleX: 0 }}

          animate={{ scaleX: 1 }}

          transition={{ duration: 1, delay: 0.5 }}

          className="h-[1px] bg-coral w-24 mx-auto mt-6"

        />

      </motion.div>

    </motion.div>

  );

};



const Home = () => {

  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();

 

  const backgroundColor = useTransform(

    scrollYProgress,

    [0, 0.5, 1],

    ["#050505", "#080808", "#050505"]

  );



  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);



  return (

    <AnimatePresence mode='wait'>

      {loading ? (

        <Preloader key="preloader" onComplete={() => setLoading(false)} />

      ) : (

        <SmoothScroll>

          <motion.div style={{ backgroundColor }} className="App min-h-screen">

            <CustomCursor />

            <Navbar />

           

            <Hero isLoaded={!loading} />

           

            <div className="relative z-10 bg-dark shadow-[0_-20px_50px_rgba(0,0,0,0.8)] rounded-t-[3rem] mt-[-5vh] border-t border-white/5">

              <BrandDock />

              <About />

              <Portfolio />

              <Services />

              <Testimonials />

              <Manifesto />

              <Contact />

            </div>



            <div className="relative z-10 bg-dark">

               <Footer />

            </div>



          </motion.div>

        </SmoothScroll>

      )}

    </AnimatePresence>

  );

};



export default Home;