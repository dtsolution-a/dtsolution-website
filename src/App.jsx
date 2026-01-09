import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Components
import InvoiceGenerator from './components/InvoiceGenerator';
import Home from './components/Home';
import Sangraha from './components/Sangraha';
import ServiceDetail from './components/Services/ServiceDetail'; // Naya Page Import

// --- SCROLL HELPER COMPONENT ---
// Ye component ensure karega ki naye page par top pe khule
// Aur jab wapas aaye to #services section par scroll ho
const ScrollToTopAndHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Agar URL me hash hai (eg: /#services) to wahan scroll karo
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } 
    // Agar naya page hai (eg: /service/branding) to Top pe jao
    else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTopAndHash /> {/* Ye line add karni zaroori hai */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sangraha" element={<Sangraha />} />
        <Route path="/internal-tools/invoice" element={<InvoiceGenerator />} />
        
        {/* Naya Dynamic Route for Services */}
        <Route path="/service/:id" element={<ServiceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;