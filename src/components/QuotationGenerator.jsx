import { useState } from 'react';
import { FaPlus, FaTrash, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { LOGO_PACKAGES, CUSTOM_ITEMS } from '../data/quotationData';
import CustomCursor from './CustomCursor';
import dtLogo from '../assets/images/logo 121.png'; 

const QuotationGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // --- STATE ---
  const [client, setClient] = useState({ 
    name: '', 
    email: '', // Added Email Field
    date: new Date().toISOString().split('T')[0], 
    invoiceNo: `QT-${Math.floor(1000 + Math.random() * 9000)}` 
  });
  
  const [mode, setMode] = useState('package'); 
  const [selectedPkgId, setSelectedPkgId] = useState(LOGO_PACKAGES[0].id);
  const [selectedCustomItems, setSelectedCustomItems] = useState(new Set());
  const [manualServices, setManualServices] = useState([]);
  const [manualInput, setManualInput] = useState({ name: '', price: '' });

  // --- CALCULATIONS ---
  const getPackageTotal = () => LOGO_PACKAGES.find(p => p.id === selectedPkgId)?.price || 0;
  
  const getCustomTotal = () => {
    let total = 0;
    CUSTOM_ITEMS.forEach(item => { if (selectedCustomItems.has(item.name)) total += item.price; });
    return total;
  };

  const getManualTotal = () => manualServices.reduce((acc, curr) => acc + Number(curr.price), 0);
  const grandTotal = (mode === 'package' ? getPackageTotal() : getCustomTotal()) + getManualTotal();

  // --- HANDLERS ---
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

  // --- SEND EMAIL FUNCTION ---
  const handleSendEmail = async () => {
    if (!client.email || !client.name) {
      alert("Please enter Client Name and Email.");
      return;
    }

    setLoading(true);

    // 1. Prepare Data Payload
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
    // Add Manual Services
    manualServices.forEach(s => items.push({ name: s.name, category: 'Extra Service', price: s.price }));

    const payload = {
      type: 'quotation', // Identifier for App Script
      clientName: client.name,
      clientEmail: client.email,
      date: client.date,
      invoiceNo: client.invoiceNo,
      items: items,
      total: grandTotal
    };

    // 2. Send to Google Script
    // REPLACE THIS WITH YOUR NEW WEB APP URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzj738OqWdH5upW-EDf4eziEggljqrSs2b1-v49MbFrWNfzY-Hv5ofboYgby3y6mHML/exec"; 

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 5000); // Reset success msg
    } catch (error) {
      console.error("Email Error:", error);
      alert("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20 px-4 md:px-8 text-white font-sans cursor-none selection:bg-coral selection:text-white">
      <div className="fixed inset-0 z-[9999] pointer-events-none"><CustomCursor /></div>

      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[400px_1fr] gap-10 items-start">
        
        {/* --- CONTROLS --- */}
        <div className="space-y-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 h-fit sticky top-24 max-h-[85vh] overflow-y-auto custom-scrollbar">
          
          <div className="border-b border-white/10 pb-4">
            <h1 className="text-2xl font-bold text-white">Quotation Builder</h1>
            <p className="text-gray-400 text-xs mt-1">Send professional estimates via Email.</p>
          </div>

          {/* Client Info */}
          <div className="space-y-3 cursor-auto">
            <h3 className="text-xs font-bold text-coral uppercase tracking-wider">1. Client Details</h3>
            <input type="text" placeholder="Client Name" value={client.name} onChange={e => setClient({...client, name: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
            <input type="email" placeholder="Client Email ID" value={client.email} onChange={e => setClient({...client, email: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
            <input type="date" value={client.date} onChange={e => setClient({...client, date: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
          </div>

          {/* Mode Selector */}
          <div className="space-y-3 cursor-auto">
            <h3 className="text-xs font-bold text-coral uppercase tracking-wider">2. Select Service Type</h3>
            <div className="flex gap-2 bg-black/50 p-1 rounded-lg">
              <button onClick={() => setMode('package')} className={`flex-1 py-2 text-xs font-bold rounded transition-all !cursor-pointer ${mode === 'package' ? 'bg-coral text-white' : 'text-gray-400 hover:text-white'}`}>Package Bundle</button>
              <button onClick={() => setMode('custom')} className={`flex-1 py-2 text-xs font-bold rounded transition-all !cursor-pointer ${mode === 'custom' ? 'bg-coral text-white' : 'text-gray-400 hover:text-white'}`}>Custom Select</button>
            </div>

            {/* Package Options */}
            {mode === 'package' && (
              <div className="grid grid-cols-1 gap-2 mt-2">
                {LOGO_PACKAGES.map(pkg => (
                  <button key={pkg.id} onClick={() => setSelectedPkgId(pkg.id)} className={`p-3 rounded-lg border text-left transition-all !cursor-pointer ${selectedPkgId === pkg.id ? 'border-coral bg-coral/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-white">{pkg.name}</span>
                      <span className="text-coral font-mono text-sm">₹{pkg.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Custom Options */}
            {mode === 'custom' && (
              <div className="mt-2 h-64 overflow-y-auto space-y-1 custom-scrollbar pr-2 border border-white/5 rounded-lg p-2">
                {CUSTOM_ITEMS.map((item, idx) => (
                  <label key={idx} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 !cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={selectedCustomItems.has(item.name)} onChange={() => toggleCustomItem(item.name)} className="accent-coral w-4 h-4 !cursor-pointer" />
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-300 group-hover:text-white">{item.name}</span>
                        <span className="text-[10px] text-gray-500">{item.category}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400">₹{item.price}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Manual Add-ons */}
          <div className="space-y-3 cursor-auto pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-coral uppercase tracking-wider">3. Add Extra Services</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Service Name" value={manualInput.name} onChange={e => setManualInput({...manualInput, name: e.target.value})} className="flex-[2] bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none !cursor-text" />
              <input type="number" placeholder="Price" value={manualInput.price} onChange={e => setManualInput({...manualInput, price: e.target.value})} className="flex-1 bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none !cursor-text" />
              <button onClick={addManualService} className="bg-white text-black px-3 rounded hover:bg-coral hover:text-white !cursor-pointer transition-colors"><FaPlus size={12}/></button>
            </div>
            <div className="space-y-1">
              {manualServices.map(s => (
                <div key={s.id} className="flex justify-between items-center text-xs bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-gray-300">{s.name}</span>
                  <div className="flex items-center gap-3">
                     <span className="font-mono text-coral">₹{s.price}</span>
                     <button onClick={() => setManualServices(manualServices.filter(i => i.id !== s.id))} className="text-gray-500 hover:text-red-500 !cursor-pointer"><FaTrash size={10}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL: LIVE PREVIEW --- */}
        <div className="flex flex-col items-center">
          
          <div className="w-full max-w-[794px] flex justify-between items-center mb-6">
             <div>
               <h2 className="text-2xl font-bold">Live Preview</h2>
               <p className="text-gray-500 text-sm">Sending to: {client.email || '...'}</p>
             </div>
             
             {emailSent ? (
               <div className="flex items-center gap-2 bg-green-500 px-6 py-3 rounded-full font-bold text-white text-sm animate-pulse">
                 <FaCheckCircle /> Sent Successfully!
               </div>
             ) : (
               <button 
                 onClick={handleSendEmail} 
                 disabled={loading}
                 className={`flex items-center gap-2 bg-coral px-8 py-3 rounded-full font-bold text-white text-sm hover:bg-white hover:text-black transition-all !cursor-pointer shadow-[0_0_20px_rgba(255,107,107,0.3)] ${loading ? 'opacity-50' : ''}`}
               >
                 {loading ? 'Sending Mail...' : <><FaPaperPlane /> Send via Email</>}
               </button>
             )}
          </div>

          {/* VISUAL PREVIEW (Sirf dikhane ke liye) */}
          <div className="bg-white text-black w-[794px] min-h-[1123px] shadow-2xl relative flex flex-col shrink-0 p-16">
               
               <div className="flex justify-between items-start mb-12">
                  <div className="w-[60%]">
                      <img src={dtLogo} alt="DT Solution" className="h-16 object-contain mb-4" />
                      <p className="text-xs font-bold tracking-[0.25em] text-coral uppercase mb-6">Designing Transformation into Success</p>
                      <div className="text-xs text-gray-500 font-medium space-y-1">
                          <p className="text-black font-bold">DT Solution</p>
                          <p>dtsolution.in</p>
                      </div>
                  </div>
                  <div className="text-right w-[40%]">
                      <h1 className="text-5xl font-bold text-[#050505] mb-2">QUOTATION</h1>
                      <p className="text-sm font-bold text-gray-400"># {client.invoiceNo}</p>
                      <div className="mt-8">
                          <p className="text-[10px] text-gray-400 uppercase font-bold">Prepared For</p>
                          <p className="text-xl font-bold text-black">{client.name || 'Client Name'}</p>
                      </div>
                  </div>
               </div>

               <div className="flex-grow">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className="border-b-2 border-black">
                              <th className="pb-4 text-xs uppercase text-gray-400 font-bold w-[70%]">Description</th>
                              <th className="pb-4 text-xs uppercase text-gray-400 font-bold text-right">Amount</th>
                          </tr>
                      </thead>
                      <tbody className="text-sm align-top">
                          {mode === 'package' ? (
                              <tr className="border-b border-gray-100">
                                  <td className="py-6 pr-8 font-bold text-xl">{LOGO_PACKAGES.find(p => p.id === selectedPkgId).name}</td>
                                  <td className="py-6 text-right font-bold text-xl">₹{getPackageTotal().toLocaleString()}</td>
                              </tr>
                          ) : (
                             Array.from(selectedCustomItems).map((itemName, idx) => {
                                const item = CUSTOM_ITEMS.find(i => i.name === itemName);
                                return (
                                  <tr key={idx} className="border-b border-gray-100">
                                    <td className="py-4 font-bold">{item.name}</td>
                                    <td className="py-4 text-right">₹{item.price.toLocaleString()}</td>
                                  </tr>
                                )
                             })
                          )}
                          {manualServices.map(s => (
                              <tr key={s.id} className="border-b border-gray-100 bg-gray-50">
                                  <td className="py-4 pl-4 font-bold">{s.name} (Extra)</td>
                                  <td className="py-4 text-right pr-2">₹{Number(s.price).toLocaleString()}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
               </div>

               <div className="flex justify-end mt-12">
                   <div className="bg-[#050505] text-white p-6 rounded-lg shadow-xl w-64">
                       <div className="flex justify-between items-center">
                           <span className="text-sm font-bold text-coral">Total</span>
                           <span className="text-3xl font-bold">₹{grandTotal.toLocaleString()}</span>
                       </div>
                   </div>
               </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationGenerator;