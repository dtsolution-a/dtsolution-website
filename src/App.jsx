import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Components
import InvoiceGenerator from './components/InvoiceGenerator';
import LogoOnboarding from './components/LogoOnboarding';
import Home from './components/Home';
import Sangraha from './components/Sangraha';
import ServiceDetail from './components/Services/ServiceDetail'; // Naya Page Import
import QuotationGenerator from './components/QuotationGenerator';
import OfferLetterGenerator from './components/OfferLetterGenerator';
import QuotationGeneratorPDF from './components/QuotationGeneratorPDF';
import WebsiteProposalGenerator from './components/WebsiteProposalGenerator';
import SocialMediaReportV2 from './components/SocialMediaReportV2';
import LetterheadGenerator from './components/LetterheadGenerator';

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

    else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTopAndHash />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sangraha" element={<Sangraha />} />
        <Route path="/internal-tools/invoice" element={<InvoiceGenerator />} />
        
        {/* Naya Dynamic Route for Services */}
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/internal-tools/quotation" element={<QuotationGenerator />} />
        <Route path="/internal-tools/offer-letter" element={<OfferLetterGenerator />} />
        <Route path="/internal-tools/proposal-pdf" element={<QuotationGeneratorPDF />} />
        <Route path="/internal-tools/logo-onboarding" element={<LogoOnboarding />} />
        <Route path="/internal-tools/website-proposal" element={<WebsiteProposalGenerator />} />
        <Route path="/internal-tools/social-media-report-v2" element={<SocialMediaReportV2 />} />
        <Route path="/internal-tools/letterhead" element={<LetterheadGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;