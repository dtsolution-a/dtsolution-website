import { useState } from 'react';
import { FaFilePdf, FaArrowLeft, FaGlobe, FaLaptopCode, FaCheckCircle, FaExclamationTriangle, FaEye, FaEyeSlash, FaGhost, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor';

// Assets
import dtLogo from '../assets/images/logo 121.png';
import signImg from '../assets/images/sign.png';

const WebsiteProposalGenerator = () => {
  const navigate = useNavigate();

  // --- STATE: CLIENT DETAILS ---
  const [client, setClient] = useState({
    name: '', 
    company: '', 
    subject: 'Website Design & Development Proposal', 
    date: new Date().toISOString().split('T')[0], 
    refNo: `WEB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  });

  // --- STATE: PRICING ---
  const [costs, setCosts] = useState({
    uiux: 15000,
    dev: 25000,
    mgmt: 5000 // Domain/Hosting/Maintenance
  });

  // --- STATE: TIMELINE (Days) ---
  const [timeline, setTimeline] = useState({
    phase1: '5-7',
    phase2: '10-14',
    phase3: '3-5',
    phase4: '1-2'
  });

  // --- STATE: SETTINGS ---
  const [showPrices, setShowPrices] = useState(true);
  const [isWhiteLabel, setIsWhiteLabel] = useState(false);

  // --- CALCULATIONS ---
  const getTotal = () => Number(costs.uiux) + Number(costs.dev) + Number(costs.mgmt);

  const handlePrint = () => {
    if (!client.name || !client.company) {
      alert("Please enter Client Name and Company.");
      return;
    }
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-6 font-sans print:bg-white print:p-0">
      
      {/* --- PRINT CSS --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap');
          
          @media print {
            @page { margin: 0; size: A4; }
            body { background-color: white !important; color: black !important; font-family: 'Nunito', sans-serif !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            .no-print, nav, footer, .cursor-none { display: none !important; }
            
            .print-only-container { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; background: white; z-index: 9999; }
            
            thead { display: table-header-group; } 
            tfoot { display: table-footer-group; }
            .fixed-header { position: fixed; top: 0; left: 0; width: 100%; background: #1a1a1a; color: white; z-index: 100; border-bottom: 4px solid #FF5A36; }
            .fixed-footer { position: fixed; bottom: 0; left: 0; width: 100%; background: #1a1a1a; color: white; z-index: 100; }
            
            .page-break-avoid { page-break-inside: avoid; }
            .page-break-before { page-break-before: always; }
            
            .print-text-black { color: #000 !important; }
            .print-text-gray { color: #4b5563 !important; }
            .print-bg-dark { background-color: #1a1a1a !important; color: white !important; }
            .print-bg-gray { background-color: #f9fafb !important; }
            .print-border { border-color: #e5e7eb !important; }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] pointer-events-none no-print"><CustomCursor /></div>

      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-center mb-6 max-w-[1600px] mx-auto bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-lg no-print">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white" style={{ fontFamily: 'Nunito' }}>
          <span className="text-coral bg-coral/10 p-2 rounded-lg"><FaGlobe /></span> Website Proposal Builder
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
            <FaArrowLeft /> Exit
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto items-start relative z-10 no-print">
        
        {/* --- LEFT: INPUT FORM --- */}
        <div className="w-full lg:w-[500px] space-y-6 h-[85vh] overflow-y-auto custom-scrollbar pr-2 no-print">
           
           {/* Client Data */}
           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
             <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4">1. Client Details</h3>
             <div className="space-y-3">
                <input type="text" placeholder="Client Name" value={client.name} onChange={e => setClient({...client, name: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                <input type="text" placeholder="Brand / Company Name" value={client.company} onChange={e => setClient({...client, company: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                <input type="text" placeholder="Proposal Subject (e.g. E-Commerce Development)" value={client.subject} onChange={e => setClient({...client, subject: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
             </div>
           </div>

           {/* Investment / Pricing */}
           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
               <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4 border-b border-white/10 pb-4">2. Cost Breakdown (₹)</h3>
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">UI/UX Design Cost</label>
                    <input type="number" value={costs.uiux} onChange={e => setCosts({...costs, uiux: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Development & Integration Cost</label>
                    <input type="number" value={costs.dev} onChange={e => setCosts({...costs, dev: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Hosting, Domain & Setup (Optional)</label>
                    <input type="number" value={costs.mgmt} onChange={e => setCosts({...costs, mgmt: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                  </div>
               </div>
               
               <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold text-gray-400">Total Investment:</span>
                  <span className="text-xl font-bold text-coral">₹{getTotal().toLocaleString()}</span>
               </div>
           </div>

           {/* Timeline Estimations */}
           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
               <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4 border-b border-white/10 pb-4">3. Project Timeline (In Days)</h3>
               <div className="space-y-3">
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 flex items-center justify-center bg-white/10 rounded font-bold text-xs text-gray-400">1</span>
                     <div className="flex-1"><p className="text-xs font-bold">Discovery & UI/UX Design</p></div>
                     <input type="text" value={timeline.phase1} onChange={e => setTimeline({...timeline, phase1: e.target.value})} placeholder="e.g. 5-7" className="w-20 bg-black/50 border border-white/20 p-1.5 text-center rounded text-white text-sm outline-none" />
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 flex items-center justify-center bg-white/10 rounded font-bold text-xs text-gray-400">2</span>
                     <div className="flex-1"><p className="text-xs font-bold">Core Development</p></div>
                     <input type="text" value={timeline.phase2} onChange={e => setTimeline({...timeline, phase2: e.target.value})} placeholder="e.g. 10-14" className="w-20 bg-black/50 border border-white/20 p-1.5 text-center rounded text-white text-sm outline-none" />
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 flex items-center justify-center bg-white/10 rounded font-bold text-xs text-gray-400">3</span>
                     <div className="flex-1"><p className="text-xs font-bold">QA Testing & Refinement</p></div>
                     <input type="text" value={timeline.phase3} onChange={e => setTimeline({...timeline, phase3: e.target.value})} placeholder="e.g. 3-5" className="w-20 bg-black/50 border border-white/20 p-1.5 text-center rounded text-white text-sm outline-none" />
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 flex items-center justify-center bg-white/10 rounded font-bold text-xs text-gray-400">4</span>
                     <div className="flex-1"><p className="text-xs font-bold">Final Deployment & Launch</p></div>
                     <input type="text" value={timeline.phase4} onChange={e => setTimeline({...timeline, phase4: e.target.value})} placeholder="e.g. 1-2" className="w-20 bg-black/50 border border-white/20 p-1.5 text-center rounded text-white text-sm outline-none" />
                  </div>
               </div>
           </div>

        </div>

        {/* --- RIGHT: DASHBOARD & TOGGLES --- */}
        <div className="flex-1 bg-[#121212] p-8 rounded-xl border border-white/10 h-fit sticky top-24">
           <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4" style={{ fontFamily: 'Nunito' }}>System Settings & Actions</h2>
           
           {/* TOGGLES */}
           <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-between cursor-pointer" onClick={() => setShowPrices(!showPrices)}>
                  <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center gap-2 text-sm font-bold text-white">
                        {showPrices ? <FaEye className="text-coral" /> : <FaEyeSlash className="text-gray-500" />}
                        <span>Show Pricing</span>
                     </div>
                     <div className={`w-8 h-4 rounded-full relative transition-colors ${showPrices ? 'bg-coral' : 'bg-gray-600'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${showPrices ? 'left-4' : 'left-0.5'}`}></div>
                     </div>
                  </div>
                  <p className="text-xs text-gray-400">Include exact costs in the PDF proposal.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-between cursor-pointer" onClick={() => setIsWhiteLabel(!isWhiteLabel)}>
                  <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center gap-2 text-sm font-bold text-white">
                        {isWhiteLabel ? <FaGhost className="text-coral" /> : <FaBuilding className="text-gray-500" />}
                        <span>White-Label Mode</span>
                     </div>
                     <div className={`w-8 h-4 rounded-full relative transition-colors ${isWhiteLabel ? 'bg-coral' : 'bg-gray-600'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isWhiteLabel ? 'left-4' : 'left-0.5'}`}></div>
                     </div>
                  </div>
                  <p className="text-xs text-gray-400">Remove DT branding for external agencies.</p>
              </div>
           </div>

           {/* ACTION BUTTON */}
           <div className="bg-coral/10 border border-coral/30 rounded-xl p-6 text-center">
              <FaLaptopCode className="text-4xl text-coral mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Ready to Pitch?</h3>
              <p className="text-sm text-gray-300 mb-6">Generates a professional multi-page website proposal including scope, timeline, and strict SLA policies.</p>
              <button onClick={handlePrint} className="w-full bg-coral text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(255,90,54,0.3)] flex items-center justify-center gap-2">
                 <FaFilePdf /> Generate Web Proposal PDF
              </button>
           </div>
        </div>
      </div>


      {/* ================================================================================== */}
      {/* PRINT ONLY CONTAINER (The Actual PDF)                                              */}
      {/* ================================================================================== */}
      <div className="print-only-container hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
         
         {/* 1. FIXED HEADER */}
         <div className="fixed-header px-12 py-4 flex justify-between items-center print-bg-dark">
            <div className="flex items-center gap-3">
               {!isWhiteLabel && ( <div className="bg-white p-1.5 rounded shadow"><img src={dtLogo} className="h-8 object-contain" /></div> )}
               <div>
                 <p className="text-[10px] font-bold tracking-[0.2em] text-coral uppercase">{isWhiteLabel ? "Strategic Development Proposal" : "Designing Transformation"}</p>
                 {!isWhiteLabel && <p className="text-[8px] text-gray-300">dtsolution.in</p>}
               </div>
            </div>
            <div className="text-right">
               <p className="text-xs font-bold text-white uppercase tracking-wider">Web Proposal</p>
               <p className="text-[10px] text-gray-400">#{client.refNo}</p>
            </div>
         </div>

         {/* 2. FIXED FOOTER */}
         <div className="fixed-footer px-12 py-3 flex justify-between items-center print-bg-dark">
            <p className="text-[9px] text-white">
              {isWhiteLabel ? "Confidential & Proprietary Document" : <>dt.solution.service@gmail.com | <span className="font-bold">www.dtsolution.in</span></>}
            </p>
            <p className="text-[9px] text-gray-400">
              {isWhiteLabel ? "Generated via Authorized Partner" : "Ahmedabad, Gujarat | +91 70482 77402"}
            </p>
         </div>

         {/* 3. CONTENT BODY */}
         <table className="w-full">
            <thead><tr><td><div style={{ height: '90px' }}></div></td></tr></thead>
            <tfoot><tr><td><div style={{ height: '50px' }}></div></td></tr></tfoot>
            <tbody>
               <tr>
                  <td className="px-12 py-6">
                     
                     {/* ================= HERO SECTION ================= */}
                     <div className="mb-10 mt-2 pb-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Prepared For</p>
                                <h1 className="font-black text-4xl text-black print-text-black mb-1">{client.company || 'Company Name'}</h1>
                                {client.subject && <p className="text-sm font-bold text-coral uppercase tracking-wide mb-2">{client.subject}</p>}
                                <p className="text-sm text-gray-600 print-text-gray font-bold">Attn: {client.name || 'Client Name'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Date Issued</p>
                                <p className="text-sm font-bold text-black mb-3">{new Date(client.date).toLocaleDateString('en-GB')}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Valid Until</p>
                                <p className="text-sm font-bold text-black">15 Days</p>
                            </div>
                        </div>
                     </div>

                     {/* ================= COST BREAKDOWN ================= */}
                     <div className="mb-10 page-break-avoid">
                        <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Estimated Investment Breakdown</h3>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                           <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Phase 1</p>
                              <h4 className="text-sm font-bold text-black mb-1">UI/UX Design</h4>
                              {showPrices ? <p className="text-lg font-black text-coral">₹{Number(costs.uiux).toLocaleString('en-IN')}</p> : <p className="text-xs text-gray-400">Included</p>}
                           </div>
                           <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Phase 2</p>
                              <h4 className="text-sm font-bold text-black mb-1">Development</h4>
                              {showPrices ? <p className="text-lg font-black text-coral">₹{Number(costs.dev).toLocaleString('en-IN')}</p> : <p className="text-xs text-gray-400">Included</p>}
                           </div>
                           <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Management</p>
                              <h4 className="text-sm font-bold text-black mb-1">Management Cost</h4>
                              {showPrices ? <p className="text-lg font-black text-coral">₹{Number(costs.mgmt).toLocaleString('en-IN')}</p> : <p className="text-xs text-gray-400">Custom</p>}
                           </div>
                        </div>

                        {showPrices && (
                           <div className="flex justify-end">
                              <div className="bg-[#1a1a1a] print-bg-dark text-white px-8 py-4 rounded-lg text-right">
                                 <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">Total Estimated Project Cost</p>
                                 <p className="text-3xl font-black text-coral m-0">₹{getTotal().toLocaleString('en-IN')}</p>
                              </div>
                           </div>
                        )}
                     </div>

                     {/* ================= TIMELINE ================= */}
                     <div className="mb-10 page-break-avoid">
                        <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Execution Timeline</h3>
                        <div className="space-y-5 pl-2">
                           
                           <div className="flex gap-6 items-start relative">
                              <div className="w-20 pt-1 text-right">
                                 <span className="bg-coral text-white text-[10px] font-bold px-2 py-1 rounded">{timeline.phase1} Days</span>
                              </div>
                              <div className="absolute left-[92px] top-2 bottom-[-24px] w-[2px] bg-gray-200"></div>
                              <div className="w-3 h-3 bg-coral rounded-full absolute left-[87px] top-1.5 ring-4 ring-white"></div>
                              <div className="pl-6 pb-2">
                                 <p className="font-bold text-black text-sm m-0">Discovery, Wireframing & UI/UX Design</p>
                                 <p className="text-xs text-gray-600 mt-1 max-w-lg">Gathering requirements, creating site architecture, and delivering high-fidelity design mockups for approval before coding begins.</p>
                              </div>
                           </div>

                           <div className="flex gap-6 items-start relative">
                              <div className="w-20 pt-1 text-right">
                                 <span className="bg-coral text-white text-[10px] font-bold px-2 py-1 rounded">{timeline.phase2} Days</span>
                              </div>
                              <div className="absolute left-[92px] top-2 bottom-[-24px] w-[2px] bg-gray-200"></div>
                              <div className="w-3 h-3 border-2 border-coral bg-white rounded-full absolute left-[87px] top-1.5"></div>
                              <div className="pl-6 pb-2">
                                 <p className="font-bold text-black text-sm m-0">Front-End & Back-End Development</p>
                                 <p className="text-xs text-gray-600 mt-1 max-w-lg">Converting approved designs into clean, responsive code. Setting up CMS, databases, and integrating necessary third-party APIs.</p>
                              </div>
                           </div>

                           <div className="flex gap-6 items-start relative">
                              <div className="w-20 pt-1 text-right">
                                 <span className="bg-coral text-white text-[10px] font-bold px-2 py-1 rounded">{timeline.phase3} Days</span>
                              </div>
                              <div className="absolute left-[92px] top-2 bottom-[-24px] w-[2px] bg-gray-200"></div>
                              <div className="w-3 h-3 border-2 border-coral bg-white rounded-full absolute left-[87px] top-1.5"></div>
                              <div className="pl-6 pb-2">
                                 <p className="font-bold text-black text-sm m-0">QA Testing & Client Review</p>
                                 <p className="text-xs text-gray-600 mt-1 max-w-lg">Testing across mobile/desktop browsers, checking load speeds, fixing bugs, and handing over a staging link for your review.</p>
                              </div>
                           </div>

                           <div className="flex gap-6 items-start relative">
                              <div className="w-20 pt-1 text-right">
                                 <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">{timeline.phase4} Days</span>
                              </div>
                              <div className="w-3 h-3 bg-green-500 rounded-full absolute left-[87px] top-1.5 ring-4 ring-white"></div>
                              <div className="pl-6">
                                 <p className="font-bold text-black text-sm m-0">Deployment & Handover</p>
                                 <p className="text-xs text-gray-600 mt-1 max-w-lg">Migrating the site to the live server, connecting the primary domain, final SEO checks, and sharing admin credentials.</p>
                              </div>
                           </div>

                        </div>
                     </div>

                     {/* ================= WEBSITE SPECIFIC RULES (RED BOX) ================= */}
                     <div className="border border-red-200 bg-red-50 p-5 rounded-lg page-break-avoid mb-8">
                        <h3 className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-3">Service Level Agreement & Scope Rules</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                           <p className="text-[10px] text-red-800 leading-relaxed m-0 font-medium">
                             <strong className="text-red-900 block mb-1">1. Post-Launch Warranty</strong>
                             Includes a 30-day free support period strictly for functional bug fixes. Structural changes or new feature requests post-approval will incur standard hourly charges.
                           </p>
                           <p className="text-[10px] text-red-800 leading-relaxed m-0 font-medium">
                             <strong className="text-red-900 block mb-1">2. Content Responsibility</strong>
                             Unless copywriting is explicitly included, the client must provide all text, images, and legal content. Delays in content delivery will pause the timeline.
                           </p>
                           <p className="text-[10px] text-red-800 leading-relaxed m-0 font-medium">
                             <strong className="text-red-900 block mb-1">3. Milestone Payments</strong>
                             Development strictly follows a 50-25-25 model: 50% advance to start, 25% post UI approval, and the final 25% prior to live server deployment.
                           </p>
                           <p className="text-[10px] text-red-800 leading-relaxed m-0 font-medium">
                             <strong className="text-red-900 block mb-1">4. Third-Party Costs</strong>
                             Costs for premium plugins, themes, gateways, or APIs not mentioned in the scope are to be borne by the client directly.
                           </p>
                        </div>
                     </div>

                     {/* ================= SIGNATURES ================= */}
                     <div className="page-break-avoid mt-8 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-end">
                           <div className="w-[50%]">
                              <p className="text-[10px] font-bold uppercase text-gray-500 mb-6 tracking-widest">Client Acceptance</p>
                              <div className="border-b border-black w-48 mb-2"></div>
                              <p className="text-[10px] font-bold text-black uppercase">Sign & Date</p>
                           </div>
                           <div className="text-right pr-4">
                              {!isWhiteLabel && <img src={signImg} alt="Sign" className="h-10 object-contain ml-auto mb-1" />}
                              {isWhiteLabel && <div className="h-10 mb-1"></div>}
                              <div className="border-t border-black pt-1 w-32 ml-auto">
                                 <p className="text-[9px] font-bold uppercase text-black">Authorized Signatory</p>
                                 {!isWhiteLabel && <p className="text-[7px] text-gray-500 text-center">DT Solution</p>}
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

export default WebsiteProposalGenerator;