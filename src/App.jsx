import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceGenerator from './components/InvoiceGenerator';
import Home from './components/Home';
import Sangraha from './components/Sangraha';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sangraha" element={<Sangraha />} />
        <Route path="/internal-tools/invoice" element={<InvoiceGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;