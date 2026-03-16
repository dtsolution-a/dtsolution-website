import { useState } from 'react';
import { FaPlus, FaTrash, FaPrint, FaPenNib, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor';

// Assets
import dtLogo from '../assets/images/logo 121.png'; 
import signImg from '../assets/images/sign.png'; 

const QuotationGeneratorPDF = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [client, setClient] = useState({
     name: '', 
     address: '', 
     subject: '', // NEW: Subject Field
     date: new Date().toISOString().split('T')[0], 
     quoteNo: `PROP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
  });

  const [services, setServices] = useState([
     { 
       title: 'Social Media Management', 
       description: 'Comprehensive management of Instagram and LinkedIn accounts including content calendar creation, posting, and community engagement.', 
       price: 25000 
     }
  ]);

  const [newService, setNewService] = useState({ title: '', description: '', price: '' });
  const [showPrices, setShowPrices] = useState(true);

  // --- HANDLERS ---
  const addService = () => {
    if (newService.title) {
        setServices([...services, { ...newService, price: Number(newService.price) || 0 }]);
        setNewService({ title: '', description: '', price: '' });
    }
  };

  const removeService = (index) => setServices(services.filter((_, i) => i !== index));
  const getTotal = () => services.reduce((acc, curr) => acc + curr.price, 0);
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-6 font-sans print:bg-white print:p-0">
      
      {/* --- PRINT CSS & FONT (NUNITO) --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap');
          
          @media print {
            @page { margin: 0; size: A4; }
            body { 
                background-color: white !important; 
                color: black !important;
                font-family: 'Nunito', sans-serif !important;
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important; 
            }
            
            .no-print, nav, footer, .cursor-none { display: none !important; }
            
            .print-only-container { 
                display: block !important; 
                width: 100% !important; 
                height: 100% !important;
                position: absolute;
                top: 0;
                left: 0;
                background: white;
                z-index: 9999;
            }

            /* Header/Footer Repetition Logic */
            thead { display: table-header-group; } 
            tfoot { display: table-footer-group; }
            
            .fixed-header {
                position: fixed; top: 0; left: 0; width: 100%;
                background: #1a1a1a; color: white; z-index: 100;
                border-bottom: 4px solid #FF5A36;
            }

            .fixed-footer {
                position: fixed; bottom: 0; left: 0; width: 100%;
                background: #1a1a1a; color: white; z-index: 100;
            }

            .page-break-avoid { page-break-inside: avoid; }
            tr { page-break-inside: avoid; }
            
            .print-text-black { color: #000 !important; }
            .print-text-gray { color: #4b5563 !important; }
            .print-bg-dark { background-color: #1a1a1a !important; color: white !important; }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] pointer-events-none no-print"><CustomCursor /></div>

      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-center mb-6 max-w-[1600px] mx-auto bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-lg relative z-[50] no-print">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white" style={{ fontFamily: 'Nunito' }}>
          <FaPenNib className="text-coral" /> Proposal Builder
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
            <FaArrowLeft /> Exit
          </button>
          <button onClick={handlePrint} className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-coral hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg">
            <FaPrint /> Print PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto items-start relative z-10 no-print">
        
        {/* --- LEFT: CONTROLS --- */}
        <div className="w-full lg:w-[400px] bg-[#121212] p-6 rounded-xl border border-white/10 shrink-0 shadow-xl h-[85vh] overflow-y-auto custom-scrollbar no-print">
           
           <div className="bg-white/5 p-3 rounded border border-white/10 flex justify-between items-center cursor-pointer mb-6" onClick={() => setShowPrices(!showPrices)}>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                 {showPrices ? <FaEye className="text-coral" /> : <FaEyeSlash />}
                 <span>Show Prices?</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${showPrices ? 'bg-coral' : 'bg-gray-600'}`}>
                 <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showPrices ? 'left-6' : 'left-1'}`}></div>
              </div>
           </div>

           <div className="space-y-4">
             <h3 className="text-xs font-bold text-coral uppercase tracking-wider">Client Details</h3>
             <input type="text" placeholder="Client Name" value={client.name} onChange={e => setClient({...client, name: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none" />
             <input type="text" placeholder="Proposal Subject (e.g. Social Media Strategy)" value={client.subject} onChange={e => setClient({...client, subject: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none" />
             <textarea placeholder="Client Address / Details" rows="2" value={client.address} onChange={e => setClient({...client, address: e.target.value})} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white text-sm focus:border-coral outline-none resize-none" />
             <div className="grid grid-cols-2 gap-2">
                <input type="text" value={client.quoteNo} onChange={e => setClient({...client, quoteNo: e.target.value})} className="bg-black/50 border border-white/20 p-2 rounded text-white text-sm" />
                <input type="date" value={client.date} onChange={e => setClient({...client, date: e.target.value})} className="bg-black/50 border border-white/20 p-2 rounded text-white text-sm" />
             </div>
           </div>

           <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
              <h3 className="text-xs font-bold text-coral uppercase tracking-wider">Add Scope</h3>
              <div className="bg-white/5 p-3 rounded border border-white/5 space-y-2">
                 <input type="text" placeholder="Service Title" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-sm" />
                 <textarea placeholder="Description..." rows="3" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-sm resize-none" />
                 <div className="flex gap-2">
                    <input type="number" placeholder="Price (Optional)" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} className="flex-1 bg-black/50 border border-white/10 p-2 rounded text-white text-sm" />
                    <button onClick={addService} className="bg-white text-black px-4 rounded font-bold hover:bg-coral hover:text-white transition-all text-sm !cursor-pointer">Add</button>
                 </div>
              </div>

              <div className="space-y-2 mt-2">
                {services.map((s, i) => (
                  <div key={i} className="bg-black/30 p-2 rounded flex justify-between items-start border border-white/5">
                    <div className="w-[85%]">
                      <p className="text-xs font-bold text-gray-200">{s.title}</p>
                      {showPrices && <p className="text-[10px] text-coral font-mono">₹{s.price.toLocaleString()}</p>}
                    </div>
                    <button onClick={() => removeService(i)} className="text-red-500 hover:text-red-400 !cursor-pointer"><FaTrash size={10} /></button>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* --- RIGHT: PREVIEW (Screen Only) --- */}
        <div className="flex justify-center flex-1 overflow-auto bg-gray-900/50 p-8 rounded-xl border border-white/5">
           <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl relative flex flex-col p-12" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {/* Screen Preview - Header */}
              <div className="bg-[#1a1a1a] flex justify-between items-start px-8 py-6 mb-8 border-b-4 border-coral rounded">
                 <div><h1 className="text-2xl font-bold text-white">PROPOSAL</h1><p className="text-gray-400 text-sm">#{client.quoteNo}</p></div>
                 <div className="bg-white p-2 rounded"><img src={dtLogo} className="h-8" /></div>
              </div>
              
              {/* Screen Preview - Body */}
              <div className="flex-grow">
                 <h2 className="text-xl font-bold mb-1">{client.name || 'Client Name'}</h2>
                 {client.subject && <p className="text-sm font-bold text-coral mb-2">Subject: {client.subject}</p>}
                 <p className="text-gray-600 mb-8">{client.address}</p>
                 <div className="space-y-6">
                    {services.map((s, i) => (
                       <div key={i} className="border-b pb-4">
                          <div className="flex justify-between font-bold text-lg"><span>{s.title}</span><span>{showPrices && `₹${s.price.toLocaleString()}`}</span></div>
                          <p className="text-gray-600 text-sm mt-1">{s.description}</p>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="mt-8 text-center text-gray-400 text-sm">
                 (Use 'Print PDF' to see the final Multi-Page layout with correct footer)
              </div>
           </div>
        </div>
      </div>

      {/* ================================================================================== */}
      {/* PRINT ONLY CONTAINER (Actual PDF Layout)                                          */}
      {/* ================================================================================== */}
      <div className="print-only-container hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
         
         {/* 1. FIXED HEADER */}
         <div className="fixed-header px-12 py-4 flex justify-between items-center print-bg-dark">
            <div className="flex items-center gap-3">
               <div className="bg-white p-1.5 rounded shadow">
                  <img src={dtLogo} alt="DT" className="h-8 object-contain" />
               </div>
               <div>
                   <p className="text-[10px] font-bold tracking-[0.2em] text-coral uppercase">Designing Transformation</p>
                   <p className="text-[8px] text-gray-300">dtsolution.in</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-xs font-bold text-white uppercase tracking-wider">Proposal</p>
               <p className="text-[10px] text-gray-400">#{client.quoteNo}</p>
            </div>
         </div>

         {/* 2. FIXED FOOTER (Website Added) */}
         <div className="fixed-footer px-12 py-3 flex justify-between items-center print-bg-dark">
            <p className="text-[9px] text-white">dt.solution.service@gmail.com | <span className="font-bold">www.dtsolution.in</span></p>
            <p className="text-[9px] text-gray-400">Ahmedabad, Gujarat | +91 70482 77402</p>
         </div>

         {/* 3. CONTENT BODY (Table Method) */}
         <table className="w-full">
            <thead><tr><td><div style={{ height: '90px' }}></div></td></tr></thead>
            <tfoot><tr><td><div style={{ height: '50px' }}></div></td></tr></tfoot>
            <tbody>
               <tr>
                  <td className="px-12 py-6">
                     
                     {/* --- PAGE 1: HERO SECTION --- */}
                     <div className="mb-12 mt-4 pb-8 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Prepared For</p>
                                <h1 className="font-extrabold text-3xl text-black print-text-black mb-1">{client.name || 'Client Name'}</h1>
                                {/* SUBJECT FIELD HERE */}
                                {client.subject && <p className="text-sm font-bold text-coral uppercase tracking-wide mb-2">Subject: {client.subject}</p>}
                                <p className="text-sm text-gray-600 print-text-gray whitespace-pre-line max-w-md">{client.address}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Date</p>
                                <p className="text-sm font-bold text-black mb-4">{new Date(client.date).toLocaleDateString()}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Valid Until</p>
                                <p className="text-sm font-bold text-black">15 Days</p>
                            </div>
                        </div>
                     </div>

                     {/* --- SCOPE OF WORK --- */}
                     <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                           <FaPenNib className="text-coral" />
                           <h2 className="text-lg font-bold uppercase tracking-wider text-black print-text-black">Scope of Work</h2>
                        </div>

                        <div className="space-y-8">
                           {services.map((service, index) => (
                              <div key={index} className="page-break-avoid border-l-2 border-gray-100 pl-6 ml-2">
                                 <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-black print-text-black">{service.title}</h3>
                                    {showPrices && <p className="font-bold text-lg text-black print-text-black">₹{service.price.toLocaleString()}</p>}
                                 </div>
                                 <p className="text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-wrap print-text-gray">
                                    {service.description}
                                 </p>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* --- TOTAL --- */}
                     {showPrices && (
                        <div className="page-break-avoid flex justify-end mt-12 mb-12">
                           <div className="bg-gray-50 px-10 py-5 rounded-lg text-right border border-gray-200">
                              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Investment</p>
                              <p className="text-4xl font-extrabold text-coral">₹{getTotal().toLocaleString()}</p>
                           </div>
                        </div>
                     )}

                     {/* --- TERMS & AUTHORIZED SIGNATORY (Replaced Client Sign) --- */}
                     <div className="page-break-avoid mt-12 pt-8 border-t border-gray-100">
                        <div className="flex justify-between items-end">
                           
                           {/* Left: Terms */}
                           <div className="w-[60%]">
                              <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Terms & Conditions</p>
                              <ul className="text-[10px] text-gray-500 list-disc pl-3 leading-relaxed print-text-gray">
                                 <li>50% advance payment required to commence work.</li>
                                 <li>Quotation valid for 15 days from the date of issue.</li>
                                 <li>Extra revisions or out-of-scope work will be charged additionally.</li>
                                 <li>All intellectual property rights transfer upon full payment.</li>
                              </ul>
                           </div>

                           {/* Right: Company Signature */}
                           <div className="text-center">
                              <img src={signImg} alt="Sign" className="h-14 object-contain mx-auto mb-2" />
                              <div className="border-t border-black pt-2 w-40 mx-auto">
                                 <p className="text-[10px] font-bold uppercase text-black print-text-black">Authorized Signatory</p>
                                 <p className="text-[8px] text-gray-500">DT Solution</p>
                              </div>
                           </div>
                        </div>
                     </div>

                  </td>
               </tr>
            </tbody>
         </table>
      </div>

    </div>
  );
};

export default QuotationGeneratorPDF;