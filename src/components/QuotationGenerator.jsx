
import { useState } from 'react';
import { FaPlus, FaTrash, FaPaperPlane, FaCheckCircle, FaPrint, FaFilePdf, FaEnvelope, FaPenNib, FaEye, FaEyeSlash } from 'react-icons/fa';
import { LOGO_PACKAGES, CUSTOM_ITEMS } from '../data/quotationData';
import CustomCursor from './CustomCursor';
import dtLogo from '../assets/images/logo 121.png'; 
import signImg from '../assets/images/sign.png'; 

const QuotationGenerator = () => {
  const [activeTab, setActiveTab] = useState('email'); // 'email' or 'pdf'

  // ====================================================================
  //  PART 1: EMAIL QUOTE LOGIC (Existing)
  // ====================================================================
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const [client, setClient] = useState({ 
    name: '', email: '', date: new Date().toISOString().split('T')[0], invoiceNo: `QT-${Math.floor(1000 + Math.random() * 9000)}` 
  });
  
  const [mode, setMode] = useState('package'); 
  const [selectedPkgId, setSelectedPkgId] = useState(LOGO_PACKAGES[0].id);
  const [selectedCustomItems, setSelectedCustomItems] = useState(new Set());
  const [manualServices, setManualServices] = useState([]);
  const [manualInput, setManualInput] = useState({ name: '', price: '' });

  const getPackageTotal = () => LOGO_PACKAGES.find(p => p.id === selectedPkgId)?.price || 0;
  
  const getCustomTotal = () => {
    let total = 0;
    CUSTOM_ITEMS.forEach(item => { if (selectedCustomItems.has(item.name)) total += item.price; });
    return total;
  };

  const getManualTotal = () => manualServices.reduce((acc, curr) => acc + Number(curr.price), 0);
  const grandTotal = (mode === 'package' ? getPackageTotal() : getCustomTotal()) + getManualTotal();

  const toggleCustomItem = (itemName) => {
    const newSet = new Set(selectedCustomItems);
    newSet.has(itemName) ? newSet.delete(itemName) : newSet.add(itemName);
    setSelectedCustomItems(newSet);
  };

  const addManualService = () => {
    if (manualInput.name && manualInput.price) {
      setManualServices([...manualServices, { ...manualInput, id: Date.now() }]);
      setManualInput({ name: '', price: '' });
    }
  };

  const handleSendEmail = async () => {
    if (!client.email || !client.name) { alert("Name & Email required."); return; }
    setLoading(true);

    let items = [];
    if (mode === 'package') {
      const pkg = LOGO_PACKAGES.find(p => p.id === selectedPkgId);
      items.push({ name: pkg.name, category: 'Package Bundle', price: pkg.price });
    } else {
      Array.from(selectedCustomItems).forEach(itemName => {
        const item = CUSTOM_ITEMS.find(i => i.name === itemName);
        items.push({ name: item.name, category: item.category, price: item.price });
      });
    }
    manualServices.forEach(s => items.push({ name: s.name, category: 'Extra Service', price: s.price }));

    const payload = {
      type: 'quotation',
      clientName: client.name,
      clientEmail: client.email,
      date: client.date,
      invoiceNo: client.invoiceNo,
      items: items,
      total: grandTotal
    };

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzj738OqWdH5upW-EDf4eziEggljqrSs2b1-v49MbFrWNfzY-Hv5ofboYgby3y6mHML/exec"; 

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 5000);
    } catch (error) {
      console.error("Email Error:", error);
      alert("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };


  // ====================================================================
  //  PART 2: PDF PROPOSAL LOGIC (New)
  // ====================================================================
  const [pdfClient, setPdfClient] = useState({
     name: '', address: '', date: new Date().toISOString().split('T')[0], 
     quoteNo: `PROP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
  });

  const [pdfServices, setPdfServices] = useState([
     { 
       title: 'UI/UX Design Phase', 
       description: 'Complete visual design including wireframing, prototyping, and high-fidelity mockups.', 
       price: 15000 
     }
  ]);

  const [newService, setNewService] = useState({ title: '', description: '', price: '' });
  const [showPrices, setShowPrices] = useState(true);

  const addPdfService = () => {
    if (newService.title) {
        setPdfServices([...pdfServices, { ...newService, price: Number(newService.price) || 0 }]);
        setNewService({ title: '', description: '', price: '' });
    }
  };

  const removePdfService = (index) => setPdfServices(pdfServices.filter((_, i) => i !== index));
  const getPdfTotal = () => pdfServices.reduce((acc, curr) => acc + curr.price, 0);
  
  // --- NATIVE PRINT ---
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20 px-4 md:px-8 text-white font-sans cursor-none selection:bg-coral selection:text-white print:bg-white print:p-0">
      
      {/* --- PRINT CSS --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          @media print {
            @page { margin: 0; size: A4; }
            
            body { 
                background-color: white !important; 
                color: black !important;
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important; 
            }
            
            /* Hide controls and UI elements */
            .no-print { display: none !important; }
            
            /* Ensure images print with colors */
            img { 
                display: block !important;
                -webkit-print-color-adjust: exact !important;
            }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] pointer-events-none no-print"><CustomCursor /></div>

      <div className="max-w-[1800px] mx-auto gap-10 items-start no-print">
        
        {/* --- TAB SWITCHER --- */}
        <div className="flex justify-center mb-8">
            <div className="bg-[#1a1a1a] p-1.5 rounded-full border border-white/10 flex gap-2">
                <button onClick={() => setActiveTab('email')} className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all !cursor-pointer ${activeTab === 'email' ? 'bg-coral text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                    <FaEnvelope /> Quick Email Quote
                </button>
                <button onClick={() => setActiveTab('pdf')} className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all !cursor-pointer ${activeTab === 'pdf' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                    <FaFilePdf /> Detailed PDF Proposal
                </button>
            </div>
        </div>

        {/* ================= MODE 1: EMAIL QUOTE ================= */}
        {activeTab === 'email' && (
          <div className="grid lg:grid-cols-[400px_1fr] gap-10 items-start animate-fadeIn">
            {/* Left Controls */}
            <div className="space-y-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 h-fit sticky top-24 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="border-b border-white/10 pb-4">
                <h1 className="text-2xl font-bold text-white">Email Quote</h1>
                <p className="text-gray-400 text-xs mt-1">Send quick estimates.</p>
              </div>
              <div className="space-y-3 cursor-auto">
                <input type="text" placeholder="Client Name" value={client.name} onChange={e => setClient({...client, name: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
                <input type="email" placeholder="Client Email ID" value={client.email} onChange={e => setClient({...client, email: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
                <input type="date" value={client.date} onChange={e => setClient({...client, date: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
              </div>
              <div className="space-y-3 cursor-auto">
                <div className="flex gap-2 bg-black/50 p-1 rounded-lg">
                  <button onClick={() => setMode('package')} className={`flex-1 py-2 text-xs font-bold rounded transition-all !cursor-pointer ${mode === 'package' ? 'bg-coral text-white' : 'text-gray-400 hover:text-white'}`}>Package</button>
                  <button onClick={() => setMode('custom')} className={`flex-1 py-2 text-xs font-bold rounded transition-all !cursor-pointer ${mode === 'custom' ? 'bg-coral text-white' : 'text-gray-400 hover:text-white'}`}>Custom</button>
                </div>
                {mode === 'package' && (
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {LOGO_PACKAGES.map(pkg => (
                      <button key={pkg.id} onClick={() => setSelectedPkgId(pkg.id)} className={`p-3 rounded-lg border text-left transition-all !cursor-pointer ${selectedPkgId === pkg.id ? 'border-coral bg-coral/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                        <div className="flex justify-between items-center"><span className="font-bold text-sm text-white">{pkg.name}</span><span className="text-coral font-mono text-sm">₹{pkg.price}</span></div>
                      </button>
                    ))}
                  </div>
                )}
                {mode === 'custom' && (
                  <div className="mt-2 h-64 overflow-y-auto space-y-1 custom-scrollbar pr-2 border border-white/5 rounded-lg p-2">
                    {CUSTOM_ITEMS.map((item, idx) => (
                      <label key={idx} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 !cursor-pointer group">
                        <div className="flex items-center gap-3"><input type="checkbox" checked={selectedCustomItems.has(item.name)} onChange={() => toggleCustomItem(item.name)} className="accent-coral w-4 h-4 !cursor-pointer" /><span className="text-sm text-gray-300 group-hover:text-white">{item.name}</span></div>
                        <span className="text-xs font-mono text-gray-400">₹{item.price}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Email Preview */}
            <div className="flex flex-col items-center email-preview-wrapper">
              <div className="w-full max-w-[794px] flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold">Email Preview</h2>
                 {emailSent ? <div className="flex items-center gap-2 bg-green-500 px-6 py-3 rounded-full font-bold text-white text-sm animate-pulse"><FaCheckCircle /> Sent!</div> : 
                   <button onClick={handleSendEmail} disabled={loading} className={`flex items-center gap-2 bg-coral px-8 py-3 rounded-full font-bold text-white text-sm hover:bg-white hover:text-black transition-all !cursor-pointer ${loading ? 'opacity-50' : ''}`}>{loading ? 'Sending...' : <><FaPaperPlane /> Send Email</>}</button>
                 }
              </div>
              <div className="bg-white text-black w-[794px] min-h-[1123px] shadow-2xl relative flex flex-col shrink-0 p-16">
                 <div className="flex justify-between items-start mb-12">
                    <div className="w-[60%]"><img src={dtLogo} alt="DT" className="h-16 object-contain mb-4" /><p className="text-xs font-bold tracking-[0.25em] text-coral uppercase">Designing Transformation</p></div>
                    <div className="text-right w-[40%]"><h1 className="text-5xl font-bold text-[#050505]">QUOTATION</h1><p className="text-sm font-bold text-gray-400"># {client.invoiceNo}</p></div>
                 </div>
                 <div className="flex-grow">
                    <table className="w-full text-left border-collapse">
                        <thead><tr className="border-b-2 border-black"><th className="pb-4 text-xs uppercase text-gray-400 font-bold w-[70%]">Description</th><th className="pb-4 text-xs uppercase text-gray-400 font-bold text-right">Amount</th></tr></thead>
                        <tbody className="text-sm align-top">
                            {mode === 'package' ? <tr className="border-b border-gray-100"><td className="py-6 pr-8 font-bold text-xl">{LOGO_PACKAGES.find(p => p.id === selectedPkgId).name}</td><td className="py-6 text-right font-bold text-xl">₹{getPackageTotal().toLocaleString()}</td></tr> : null}
                        </tbody>
                    </table>
                 </div>
                 <div className="flex justify-end mt-12"><div className="bg-[#050505] text-white p-6 rounded-lg shadow-xl w-64"><div className="flex justify-between items-center"><span className="text-sm font-bold text-coral">Total</span><span className="text-3xl font-bold">₹{grandTotal.toLocaleString()}</span></div></div></div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODE 2: PDF PROPOSAL ================= */}
        {activeTab === 'pdf' && (
          <div className="grid lg:grid-cols-[450px_1fr] gap-10 items-start animate-fadeIn">
            
            {/* Controls */}
            <div className="space-y-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 h-fit sticky top-24 max-h-[90vh] overflow-y-auto custom-scrollbar no-print">
               <div className="border-b border-white/10 pb-4">
                 <h1 className="text-2xl font-bold text-white">Detailed Proposal</h1>
                 <p className="text-gray-400 text-xs mt-1">Add scope and generate PDF.</p>
               </div>

               <div className="bg-white/5 p-3 rounded border border-white/10 flex justify-between items-center cursor-pointer" onClick={() => setShowPrices(!showPrices)}>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                     {showPrices ? <FaEye className="text-coral" /> : <FaEyeSlash />}
                     <span>Show Prices in Document?</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${showPrices ? 'bg-coral' : 'bg-gray-600'}`}>
                     <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showPrices ? 'left-6' : 'left-1'}`}></div>
                  </div>
               </div>

               <div className="space-y-3 cursor-auto">
                 <h3 className="text-xs font-bold text-coral uppercase tracking-wider">Client Details</h3>
                 <input type="text" placeholder="Client Name" value={pdfClient.name} onChange={e => setPdfClient({...pdfClient, name: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                 <textarea placeholder="Client Address / Company" rows="2" value={pdfClient.address} onChange={e => setPdfClient({...pdfClient, address: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none resize-none" />
                 <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={pdfClient.quoteNo} onChange={e => setPdfClient({...pdfClient, quoteNo: e.target.value})} className="bg-black/50 border border-white/20 p-2 rounded text-white text-sm" />
                    <input type="date" value={pdfClient.date} onChange={e => setPdfClient({...pdfClient, date: e.target.value})} className="bg-black/50 border border-white/20 p-2 rounded text-white text-sm" />
                 </div>
               </div>

               <div className="space-y-3 cursor-auto border-t border-white/10 pt-4">
                  <h3 className="text-xs font-bold text-coral uppercase tracking-wider">Add Scope</h3>
                  <div className="bg-white/5 p-3 rounded border border-white/5 space-y-2">
                     <input type="text" placeholder="Service Title" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-sm" />
                     <textarea placeholder="Description..." rows="3" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-sm resize-none" />
                     <div className="flex gap-2">
                        <input type="number" placeholder="Price (Optional)" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} className="flex-1 bg-black/50 border border-white/10 p-2 rounded text-white text-sm" />
                        <button onClick={addPdfService} className="bg-white text-black px-4 rounded font-bold hover:bg-coral hover:text-white transition-all text-sm !cursor-pointer">Add</button>
                     </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    {pdfServices.map((s, i) => (
                      <div key={i} className="bg-black/30 p-2 rounded flex justify-between items-start border border-white/5">
                        <div className="w-[85%]">
                          <p className="text-xs font-bold text-gray-200">{s.title}</p>
                          {showPrices && <p className="text-[10px] text-coral font-mono">₹{s.price}</p>}
                        </div>
                        <button onClick={() => removePdfService(i)} className="text-red-500 hover:text-red-400 !cursor-pointer"><FaTrash size={10} /></button>
                      </div>
                    ))}
                  </div>
               </div>

               <button onClick={handlePrint} className="w-full flex justify-center items-center gap-2 bg-coral py-4 rounded-xl font-bold text-white text-sm hover:bg-white hover:text-black transition-all !cursor-pointer shadow-[0_0_20px_rgba(255,107,107,0.3)] mt-2">
                  <FaPrint /> Print / Save PDF
               </button>
            </div>

            {/* --- PREVIEW/PRINT CONTAINER --- */}
            <div className="flex justify-center">
               <div 
                 className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl relative flex flex-col shrink-0 print:shadow-none"
                 style={{ fontFamily: "'Inter', sans-serif" }} 
               >
                  {/* HEADER */}
                  <div 
                    className="bg-[#1a1a1a] flex justify-between items-start px-12 py-8 border-b-4 border-coral"
                    style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                  >
                    <div className="flex flex-col">
                        <div className="bg-white p-2 rounded-lg w-fit mb-2 shadow-lg">
                           <img src={dtLogo} alt="DT" className="h-10 object-contain" />
                        </div>
                        <p className="text-[9px] font-bold tracking-[0.3em] text-coral uppercase ml-1">Designing Transformation</p>
                    </div>
                    <div className="text-right">
                        <h1 className="text-4xl font-extrabold text-white tracking-wide uppercase leading-none">PROPOSAL</h1>
                        <p className="font-mono text-lg text-gray-300 mt-1">#{pdfClient.quoteNo}</p>
                        <p className="text-xs text-gray-400 mt-1">Date: {new Date(pdfClient.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="px-12 py-10 flex-grow">
                      <div className="mb-10 pb-6 border-b border-gray-100">
                        <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Prepared For</p>
                        <p className="font-bold text-2xl text-black">{pdfClient.name || 'Client Name'}</p>
                        <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{pdfClient.address}</p>
                      </div>

                      <div className="flex items-center gap-2 mb-6">
                         <FaPenNib className="text-coral" />
                         <h2 className="text-lg font-bold uppercase tracking-wider text-black">Scope of Work</h2>
                      </div>

                      <div className="space-y-6">
                         {pdfServices.map((service, index) => (
                           <div key={index} className="flex gap-6 pb-6 border-b border-gray-100 last:border-0">
                              <div className="w-10 pt-1">
                                 <div className="bg-gray-100 text-gray-500 font-bold w-8 h-8 flex items-center justify-center rounded-full text-xs">
                                    {index + 1}
                                 </div>
                              </div>
                              <div className="flex-1">
                                 <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-black">{service.title}</h3>
                                    {showPrices && <p className="font-bold text-lg text-black">₹{service.price.toLocaleString()}</p>}
                                 </div>
                                 <p className="text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-wrap">
                                    {service.description}
                                 </p>
                              </div>
                           </div>
                         ))}
                      </div>

                      {showPrices && (
                        <div className="flex justify-end mt-8">
                           <div className="bg-gray-50 px-8 py-4 rounded-lg text-right border border-gray-200">
                              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Estimate</p>
                              <p className="text-3xl font-bold text-coral">₹{getPdfTotal().toLocaleString()}</p>
                           </div>
                        </div>
                      )}
                  </div>

                  {/* FOOTER */}
                  <div className="px-12 pb-8 mt-auto">
                     <div className="flex justify-between items-end mb-6">
                        <div className="w-[60%]">
                           <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Terms</p>
                           <ul className="text-[10px] text-gray-500 list-disc pl-3">
                              <li>50% advance payment required to commence work.</li>
                              <li>Quotation valid for 15 days from the date of issue.</li>
                           </ul>
                        </div>
                        <div className="text-center">
                            <img src={signImg} alt="Sign" className="h-12 object-contain mx-auto mb-1" />
                            <div className="border-t border-black pt-1 w-32 mx-auto">
                               <p className="text-[9px] font-bold uppercase text-black">Authorized Signatory</p>
                            </div>
                        </div>
                     </div>
                     <div 
                       className="bg-[#1a1a1a] text-white p-3 rounded flex justify-between items-center"
                       style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                     >
                        <p className="text-[10px]">dtsolution.in | dt.solution.service@gmail.com</p>
                        <p className="text-[10px] text-gray-400">Ahmedabad, Gujarat</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default QuotationGenerator;