import { useState, useEffect } from 'react';
import { FaFilePdf, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaBookOpen, FaWhatsapp, FaPrint, FaExternalLinkAlt, FaGhost, FaBuilding, FaEye, FaEyeSlash, FaListUl } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import dtLogo from '../assets/images/logo 121.png';
import signImg from '../assets/images/sign.png';

// --- DATABASE: UPDATED PACKAGES (New Pricing & Features) ---
const PACKAGES = {
  Pack4999: {
    id: "Pack4999",
    name: "Startup Core Pack", 
    price: 4999, 
    concepts: 2, 
    revisions: 2,
    timeline: "4-6 Days",
    timelinePhases: ["Days 1-2", "Days 3-4", "Day 5", "Day 6"],
    includes: [
      "Master Logo Suite (PNG, JPG, PDF, PSD, AI)",
      "Wordmark Variants (Black, White, Full Color)",
      "Brandmark, Horizontal & Portrait Layouts",
      "Digital Optimization (Web, App & Icon Sizes)",
      "Desktop Wallpaper (1 Variant)",
      "✨ Typography: Primary & Secondary Brand Fonts",
      "✨ Social: 1 Profile Picture & 1 Cover Banner"
    ]
  },
  Pack7999: {
    id: "Pack7999",
    name: "Brand Standard Pack", 
    price: 7999, 
    concepts: 4, 
    revisions: 4,
    timeline: "7-10 Days",
    timelinePhases: ["Days 1-2", "Days 3-5", "Days 6-8", "Days 9-10"],
    includes: [
      "Includes all assets from the ₹4,999 Pack",
      "Extended Formats: PDF & CDR (Digital & Print)",
      "Device Kit: Extra Web/App Sizes & Mobile Wallpapers",
      "✨ Detailed Color Palette (HEX, RGB, CMYK codes)",
      "✨ 5-Page Mini Brand Book (Spacing & Guidelines)",
      "✨ Social Media Kit: 3 Editable Post Templates"
    ]
  },
  Pack9999: {
    id: "Pack9999",
    name: "Complete Office Pack", 
    price: 9999, 
    concepts: 6, 
    revisions: 6,
    timeline: "10-14 Days",
    timelinePhases: ["Days 1-3", "Days 4-7", "Days 8-11", "Days 12-14"],
    includes: [
      "Includes all assets from the ₹7,999 Pack",
      "Stationery Suite: Business Cards, Letterheads, Signatures",
      "Corporate Branding: Stamp, ID Cards, Badges, Name Tags",
      "✨ Brand Voice Guide (Tone & Communication Style)",
      "✨ 5-Slide Pitch Deck Template (PPT/Google Slides)",
      "✨ Favicon Set (Custom browser icons)"
    ]
  }
};

const LogoOnboarding = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [client, setClient] = useState({
    name: '', company: '', subject: '', date: new Date().toISOString().split('T')[0], 
    refNo: `LGO-${Math.floor(1000 + Math.random() * 9000)}`
  });
  const [selectedPack, setSelectedPack] = useState('Pack4999');

  // DISCOVERY ANSWERS STATE
  const [s1, setS1] = useState({ nameTagline: '', desc: '', values: '', audience: '', competitors: '', usp: '' });
  const [s2, setS2] = useState({ logoType: '', mood: '', colors: '', typography: '', icon: '', metaphor: '' });
  const [s3, setS3] = useState({ insp: '', anti: '', complexity: '', assets: '', scale: '', message: '' });

  // PRINT MODE & TOGGLES
  const [printType, setPrintType] = useState('proposal'); // 'proposal' | 'questionnaire' | 'catalog'
  const [showPrices, setShowPrices] = useState(true);
  const [isWhiteLabel, setIsWhiteLabel] = useState(false);

  // --- ADVANCED AUTO-SUGGEST LOGIC ---
  useEffect(() => {
    let score = 0;
    Object.values({...s1, ...s2, ...s3}).forEach(val => { if (val.trim().length > 0) score += 1; });
    
    if (score > 12) setSelectedPack('Pack9999');
    else if (score > 6) setSelectedPack('Pack7999');
    else setSelectedPack('Pack4999');
  }, [s1, s2, s3]); 

  // --- HANDLERS ---
  const handlePrintProposal = () => {
    if (!client.name || !client.company) { alert("Please enter Client Name and Company."); return; }
    setPrintType('proposal');
    setTimeout(() => window.print(), 150);
  };

  const handlePrintQuestionnaire = () => {
    setPrintType('questionnaire');
    setTimeout(() => window.print(), 150);
  };

  const handlePrintCatalog = () => {
    setPrintType('catalog');
    setTimeout(() => window.print(), 150);
  };

  // --- WHATSAPP GENERATOR ---
  const sendWhatsApp = () => {
    const greeting = isWhiteLabel ? "*Client Discovery Brief* 🎨\n\nHello" : "*DT Solution - Client Discovery Brief* 🎨\n\nHello";
    const waText = `${greeting}${client.name ? ' ' + client.name : ''}! To help us craft the perfect visual identity for your brand, please reply with answers to the following questions:\n\n*SECTION 1: Brand Essence*\n1. Brand Name & Tagline (Exact spelling & case):\n2. Business Description (What do you do?):\n3. Core Values (3 words defining your brand):\n4. Target Audience (Who are your customers?):\n5. Competitors (Main 2-3 rivals):\n6. Unique Selling Point (What makes you different?):\n\n*SECTION 2: Visual Style*\n7. Logo Type (Icon, Wordmark, Emblem?):\n8. Overall Mood (Minimal, Bold, Luxury?):\n9. Color Palette Preferences (Likes/Dislikes):\n10. Typography Style (Modern, Clean, Script?):\n11. Specific Iconography (Any specific symbol?):\n12. Visual Metaphor (Hidden meaning/concept?):\n\n*SECTION 3: Design Constraints*\n13. Inspiration (Links to 3 logos you love):\n14. Anti-Inspiration (Designs you completely hate):\n15. Complexity Level (Simple vs Detailed):\n16. Existing Assets (Website, Store vibe?):\n17. Scalability (Where will it be used most?):\n18. Core Message (First word audience should think?):\n\nLooking forward to your thoughts! Let us know if you need help with any question.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
  };

  const packData = PACKAGES[selectedPack];

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
            .print-link { color: #2563eb !important; text-decoration: underline !important; }
          }
          details > summary { list-style: none; cursor: pointer; }
          details > summary::-webkit-details-marker { display: none; }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] pointer-events-none no-print"><CustomCursor /></div>

      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-center mb-6 max-w-[1600px] mx-auto bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-lg no-print">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white" style={{ fontFamily: 'Nunito' }}>
          <span className="text-coral bg-coral/10 p-2 rounded-lg"><FaBookOpen /></span> Logo Onboarding Suite
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
            <FaArrowLeft /> Exit
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto items-start relative z-10 no-print">
        
        {/* --- LEFT: DISCOVERY FORM --- */}
        <div className="w-full lg:w-[500px] space-y-6 h-[85vh] overflow-y-auto custom-scrollbar pr-2 no-print">
           
           {/* Client Data */}
           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
             <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4">1. Client & Package</h3>
             <div className="space-y-3">
                <input type="text" placeholder="Client Name" value={client.name} onChange={e => setClient({...client, name: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                <input type="text" placeholder="Brand / Company Name" value={client.company} onChange={e => setClient({...client, company: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                <input type="text" placeholder="Proposal Subject (e.g. Identity Design)" value={client.subject} onChange={e => setClient({...client, subject: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
             </div>
             
             <label className="text-xs text-gray-400 mt-4 block">Select Package For Contract:</label>
             <select value={selectedPack} onChange={e => setSelectedPack(e.target.value)} className="w-full bg-coral/10 border border-coral p-2.5 rounded text-white text-sm outline-none font-bold mt-1">
                <option value="Pack4999">Startup Core (₹4,999)</option>
                <option value="Pack7999">Brand Standard (₹7,999)</option>
                <option value="Pack9999">Complete Office (₹9,999)</option>
             </select>
           </div>

           {/* The 18 Questions Form */}
           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
               <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4 border-b border-white/10 pb-4">Internal Brief Entry</h3>
               <div className="space-y-3">
                  <details className="bg-white/5 border border-white/10 rounded-lg group">
                     <summary className="p-3 font-bold text-sm text-gray-200 group-open:border-b border-white/10">Section 1: Brand Essence</summary>
                     <div className="p-3 space-y-3">
                        <input type="text" placeholder="1. Brand Name & Tagline" value={s1.nameTagline} onChange={e=>setS1({...s1, nameTagline: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <textarea placeholder="2. Business Description" value={s1.desc} onChange={e=>setS1({...s1, desc: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" rows="2"/>
                        <input type="text" placeholder="3. Core Values" value={s1.values} onChange={e=>setS1({...s1, values: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="4. Target Audience" value={s1.audience} onChange={e=>setS1({...s1, audience: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="5. Competitors" value={s1.competitors} onChange={e=>setS1({...s1, competitors: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <textarea placeholder="6. Unique Selling Point" value={s1.usp} onChange={e=>setS1({...s1, usp: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" rows="2"/>
                     </div>
                  </details>

                  <details className="bg-white/5 border border-white/10 rounded-lg group">
                     <summary className="p-3 font-bold text-sm text-gray-200 group-open:border-b border-white/10">Section 2: Visual Style</summary>
                     <div className="p-3 space-y-3">
                        <input type="text" placeholder="7. Logo Type" value={s2.logoType} onChange={e=>setS2({...s2, logoType: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="8. Overall Mood" value={s2.mood} onChange={e=>setS2({...s2, mood: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="9. Color Palette" value={s2.colors} onChange={e=>setS2({...s2, colors: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="10. Typography" value={s2.typography} onChange={e=>setS2({...s2, typography: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="11. Specific Iconography" value={s2.icon} onChange={e=>setS2({...s2, icon: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="12. Visual Metaphor" value={s2.metaphor} onChange={e=>setS2({...s2, metaphor: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                     </div>
                  </details>

                  <details className="bg-white/5 border border-white/10 rounded-lg group">
                     <summary className="p-3 font-bold text-sm text-gray-200 group-open:border-b border-white/10">Section 3: Constraints</summary>
                     <div className="p-3 space-y-3">
                        <textarea placeholder="13. Inspiration (Links)" value={s3.insp} onChange={e=>setS3({...s3, insp: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" rows="2"/>
                        <textarea placeholder="14. Anti-Inspiration" value={s3.anti} onChange={e=>setS3({...s3, anti: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" rows="2"/>
                        <input type="text" placeholder="15. Complexity Level" value={s3.complexity} onChange={e=>setS3({...s3, complexity: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="16. Existing Assets" value={s3.assets} onChange={e=>setS3({...s3, assets: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="17. Scalability" value={s3.scale} onChange={e=>setS3({...s3, scale: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                        <input type="text" placeholder="18. Core Message" value={s3.message} onChange={e=>setS3({...s3, message: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 rounded text-white text-xs outline-none" />
                     </div>
                  </details>
               </div>
           </div>
        </div>

        {/* --- RIGHT: DASHBOARD & TOGGLES --- */}
        <div className="flex-1 bg-[#121212] p-8 rounded-xl border border-white/10 h-fit sticky top-24">
           <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4" style={{ fontFamily: 'Nunito' }}>System Settings</h2>
           
           {/* TOGGLES */}
           <div className="grid grid-cols-2 gap-4 mb-6">
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
                  <p className="text-xs text-gray-400">Include project costs in generated PDFs.</p>
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

           {/* ACTIONS */}
           <div className="bg-gray-900 rounded-xl p-5 border border-white/5 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">Available Actions</h4>
              
              {/* Action 1: Catalog */}
              <div className="flex items-center gap-4 text-sm text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                 <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg"><FaListUl size={20}/></div>
                 <div className="flex-1">
                    <p className="font-bold text-white">Download Pricing Catalog</p>
                    <p className="text-xs text-gray-400">Send clients all 3 packages with detailed comparison.</p>
                 </div>
                 <button onClick={handlePrintCatalog} className="bg-purple-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-purple-700">Catalog</button>
              </div>

              {/* Action 2: WhatsApp */}
              <div className="flex items-center gap-4 text-sm text-gray-300">
                 <div className="p-3 bg-green-500/10 text-green-500 rounded-lg"><FaWhatsapp size={20}/></div>
                 <div className="flex-1">
                    <p className="font-bold text-white">Send WhatsApp Questionnaire</p>
                    <p className="text-xs text-gray-400">Send 18 questions to client directly to chat.</p>
                 </div>
                 <button onClick={sendWhatsApp} className="bg-green-500 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-green-600">Send</button>
              </div>
              
              {/* Action 3: Blank PDF */}
              <div className="flex items-center gap-4 text-sm text-gray-300">
                 <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><FaPrint size={20}/></div>
                 <div className="flex-1">
                    <p className="font-bold text-white">Download Blank Questionnaire PDF</p>
                    <p className="text-xs text-gray-400">Includes visual reference links for clients.</p>
                 </div>
                 <button onClick={handlePrintQuestionnaire} className="bg-blue-500 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-blue-600">Print</button>
              </div>
              
              {/* Action 4: Final Proposal */}
              <div className="flex items-center gap-4 text-sm text-gray-300 border-t border-white/10 pt-4 mt-2">
                 <div className="p-3 bg-coral/10 text-coral rounded-lg"><FaBookOpen size={20}/></div>
                 <div className="flex-1">
                    <p className="font-bold text-white">Generate Final Proposal PDF</p>
                    <p className="text-xs text-gray-400">Includes chosen pack, contract & approved brief.</p>
                 </div>
                 <button onClick={handlePrintProposal} className="bg-coral text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-orange-600">Generate</button>
              </div>
           </div>
        </div>
      </div>

      {/* ================================================================================== */}
      {/* CONDITIONAL PRINT CONTAINERS                                                       */}
      {/* ================================================================================== */}
      
      {/* -------------------------------------------------------------------------
          PRINT 1: PROPOSAL + BRIEF (2-Page Layout for selected pack)
          ------------------------------------------------------------------------- */}
      {printType === 'proposal' && (
         <div className="print-only-container hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
            
            <div className="fixed-header px-12 py-4 flex justify-between items-center print-bg-dark">
               <div className="flex items-center gap-3">
                  {!isWhiteLabel && ( <div className="bg-white p-1.5 rounded shadow"><img src={dtLogo} className="h-8 object-contain" /></div> )}
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-coral uppercase">{isWhiteLabel ? "Strategic Design Proposal" : "Designing Transformation"}</p>
                    {!isWhiteLabel && <p className="text-[8px] text-gray-300">dtsolution.in</p>}
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Project Proposal</p>
                  <p className="text-[10px] text-gray-400">#{client.refNo}</p>
               </div>
            </div>

            <div className="fixed-footer px-12 py-3 flex justify-between items-center print-bg-dark">
               <p className="text-[9px] text-white">
                 {isWhiteLabel ? "Confidential & Proprietary Document" : <>dt.solution.service@gmail.com | <span className="font-bold">www.dtsolution.in</span></>}
               </p>
               <p className="text-[9px] text-gray-400">
                 {isWhiteLabel ? "Generated via Authorized Partner" : "Ahmedabad, Gujarat | +91 70482 77402"}
               </p>
            </div>

            <table className="w-full">
               <thead><tr><td><div style={{ height: '90px' }}></div></td></tr></thead>
               <tfoot><tr><td><div style={{ height: '50px' }}></div></td></tr></tfoot>
               <tbody>
                  <tr>
                     <td className="px-12 py-6">
                        {/* PAGE 1: SCOPE & TIMELINE */}
                        <div className="mb-8 mt-2 pb-6 border-b border-gray-200">
                           <div className="flex justify-between items-start">
                               <div>
                                   <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Prepared For</p>
                                   <h1 className="font-black text-3xl text-black print-text-black mb-1">{client.company || 'Company Name'}</h1>
                                   {client.subject && <p className="text-sm font-bold text-coral uppercase tracking-wide mb-2">Subject: {client.subject}</p>}
                                   <p className="text-sm text-gray-600 print-text-gray font-bold">Attn: {client.name || 'Client Name'}</p>
                               </div>
                               <div className="text-right">
                                   <p className="text-[10px] font-bold text-gray-400 uppercase">Date</p>
                                   <p className="text-sm font-bold text-black">{new Date(client.date).toLocaleDateString('en-GB')}</p>
                               </div>
                           </div>
                        </div>

                        <div className="print-bg-gray p-6 rounded-lg mb-8 border border-gray-200 page-break-avoid">
                           <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                              <div><p className="text-[10px] font-bold text-coral uppercase tracking-widest mb-1">Approved Package</p><h3 className="text-xl font-bold print-text-black m-0">{packData.name}</h3></div>
                              {showPrices && <div className="text-right"><p className="text-2xl font-black text-coral m-0">₹{packData.price.toLocaleString('en-IN')}</p></div>}
                           </div>
                           <div className="grid grid-cols-2 gap-6">
                              <div>
                                 <p className="text-[10px] font-bold text-black mb-2 uppercase tracking-wide">Strict Constraints</p>
                                 <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4 font-medium">
                                    <li><strong>{packData.concepts}</strong> Initial Design Concepts</li>
                                    <li><strong>{packData.revisions}</strong> Rounds of Revisions</li>
                                    <li><strong>Timeline:</strong> {packData.timeline}</li>
                                 </ul>
                              </div>
                              <div>
                                 <p className="text-[10px] font-bold text-black mb-2 uppercase tracking-wide">Deliverables</p>
                                 <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                                    {packData.includes.map((item, i) => <li key={i}>{item}</li>)}
                                 </ul>
                              </div>
                           </div>
                        </div>

                        <div className="mb-8 page-break-avoid">
                           <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Execution Timeline</h3>
                           <div className="space-y-4">
                              <div className="flex gap-4"><div className="w-20 font-bold text-coral text-xs pt-0.5">{packData.timelinePhases[0]}</div><div><p className="font-bold text-black text-sm m-0">Discovery & Strategy</p><p className="text-xs text-gray-600 mt-1">Analyzing the creative brief, industry research, and mood-boarding.</p></div></div>
                              <div className="flex gap-4"><div className="w-20 font-bold text-coral text-xs pt-0.5">{packData.timelinePhases[1]}</div><div><p className="font-bold text-black text-sm m-0">Concept Presentation</p><p className="text-xs text-gray-600 mt-1">Presentation of {packData.concepts} distinct design variations for review.</p></div></div>
                              <div className="flex gap-4"><div className="w-20 font-bold text-coral text-xs pt-0.5">{packData.timelinePhases[2]}</div><div><p className="font-bold text-black text-sm m-0">Revisions & Refinement</p><p className="text-xs text-gray-600 mt-1">Executing up to {packData.revisions} revision rounds on the chosen concept.</p></div></div>
                              <div className="flex gap-4"><div className="w-20 font-bold text-coral text-xs pt-0.5">{packData.timelinePhases[3]}</div><div><p className="font-bold text-black text-sm m-0">Final Handover</p><p className="text-xs text-gray-600 mt-1">Preparation and delivery of all final assets across required formats.</p></div></div>
                           </div>
                        </div>

                        <div className="border border-red-200 bg-red-50 p-4 rounded-lg page-break-avoid mb-8">
                           <h3 className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-2">Scope & Revision Policy (Please Read)</h3>
                           <p className="text-xs text-red-800 leading-relaxed m-0 font-medium">
                             This project includes strictly <strong>{packData.revisions} round(s) of revisions</strong> to maintain quality and timelines. A "revision" constitutes minor tweaks (color, font, sizing) to an existing concept, not entirely new designs. <br/><br/><strong>Any additional revisions requested beyond this limit will be billed at standard agency rates.</strong>
                           </p>
                        </div>

                        <div className="page-break-avoid mt-6 pt-4 border-t border-gray-200">
                           <div className="flex justify-between items-end">
                              <div className="w-[60%]">
                                 <p className="text-[10px] font-bold uppercase text-gray-500 mb-2 tracking-widest">Terms & Conditions</p>
                                 <ul className="text-[9px] text-gray-600 list-disc pl-3 font-medium">
                                    <li>50% advance payment required to commence work.</li>
                                    <li>Quotation valid for 15 days from the date of issue.</li>
                                    <li>Intellectual property rights transfer to client upon full payment.</li>
                                 </ul>
                              </div>
                              <div className="text-center">
                                 {!isWhiteLabel && <img src={signImg} alt="Sign" className="h-10 object-contain mx-auto mb-1" />}
                                 {isWhiteLabel && <div className="h-10 mb-1"></div>}
                                 <div className="border-t border-black pt-1 w-32 mx-auto">
                                    <p className="text-[9px] font-bold uppercase text-black">Authorized Signatory</p>
                                    {!isWhiteLabel && <p className="text-[7px] text-gray-500">DT Solution</p>}
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* PAGE 2: CREATIVE BRIEF */}
                        <div className="page-break-before pt-8">
                           <div className="text-center mb-8 pb-4 border-b border-gray-200">
                              <h2 className="text-2xl font-black text-black uppercase tracking-wide">Approved Creative Brief</h2>
                              <p className="text-xs text-gray-500 mt-1">This document outlines the exact requirements discussed.</p>
                           </div>
                           <div className="mb-6"><h3 className="text-sm font-bold text-coral uppercase tracking-widest mb-3 pb-1 border-b border-gray-100">1. Brand Essence (The Soul)</h3>
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Brand Name & Tagline</p><p className="text-xs text-black font-semibold mt-0.5">{s1.nameTagline || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Core Values</p><p className="text-xs text-black font-semibold mt-0.5">{s1.values || 'N/A'}</p></div>
                                 <div className="col-span-2"><p className="text-[9px] text-gray-400 font-bold uppercase">Business Description</p><p className="text-xs text-black font-medium mt-0.5">{s1.desc || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Target Audience</p><p className="text-xs text-black font-semibold mt-0.5">{s1.audience || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Competitors</p><p className="text-xs text-black font-semibold mt-0.5">{s1.competitors || 'N/A'}</p></div>
                                 <div className="col-span-2"><p className="text-[9px] text-gray-400 font-bold uppercase">Unique Selling Point</p><p className="text-xs text-black font-medium mt-0.5">{s1.usp || 'N/A'}</p></div>
                              </div>
                           </div>
                           <div className="mb-6"><h3 className="text-sm font-bold text-coral uppercase tracking-widest mb-3 pb-1 border-b border-gray-100">2. Visual Style (The Look)</h3>
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Logo Type Preference</p><p className="text-xs text-black font-semibold mt-0.5">{s2.logoType || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Overall Mood / Vibe</p><p className="text-xs text-black font-semibold mt-0.5">{s2.mood || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Color Palette</p><p className="text-xs text-black font-semibold mt-0.5">{s2.colors || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Typography Style</p><p className="text-xs text-black font-semibold mt-0.5">{s2.typography || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Specific Iconography</p><p className="text-xs text-black font-semibold mt-0.5">{s2.icon || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Visual Metaphor</p><p className="text-xs text-black font-semibold mt-0.5">{s2.metaphor || 'N/A'}</p></div>
                              </div>
                           </div>
                           <div className="mb-6"><h3 className="text-sm font-bold text-coral uppercase tracking-widest mb-3 pb-1 border-b border-gray-100">3. Design Constraints & Rules</h3>
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                 <div className="col-span-2"><p className="text-[9px] text-gray-400 font-bold uppercase">Inspiration (Likes)</p><p className="text-xs text-black font-medium mt-0.5">{s3.insp || 'N/A'}</p></div>
                                 <div className="col-span-2"><p className="text-[9px] text-gray-400 font-bold uppercase">Anti-Inspiration (Dislikes)</p><p className="text-xs text-black font-medium mt-0.5">{s3.anti || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Complexity Level</p><p className="text-xs text-black font-semibold mt-0.5">{s3.complexity || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Existing Assets</p><p className="text-xs text-black font-semibold mt-0.5">{s3.assets || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Scalability / Usage</p><p className="text-xs text-black font-semibold mt-0.5">{s3.scale || 'N/A'}</p></div>
                                 <div><p className="text-[9px] text-gray-400 font-bold uppercase">Message to Audience</p><p className="text-xs text-black font-semibold mt-0.5">{s3.message || 'N/A'}</p></div>
                              </div>
                           </div>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      )}


      {/* -------------------------------------------------------------------------
          PRINT 2: ALL PACKAGES CATALOG (Comparison Sheet)
          ------------------------------------------------------------------------- */}
      {printType === 'catalog' && (
         <div className="print-only-container hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
            
            <div className="fixed-header px-12 py-4 flex justify-between items-center print-bg-dark">
               <div className="flex items-center gap-3">
                  {!isWhiteLabel && ( <div className="bg-white p-1.5 rounded shadow"><img src={dtLogo} className="h-8 object-contain" /></div> )}
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-coral uppercase">{isWhiteLabel ? "Design Packages" : "Designing Transformation"}</p>
                    {!isWhiteLabel && <p className="text-[8px] text-gray-300">dtsolution.in</p>}
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Pricing Catalog</p>
                  <p className="text-[10px] text-gray-400">Valid for 30 Days</p>
               </div>
            </div>

            <div className="fixed-footer px-12 py-3 flex justify-between items-center print-bg-dark">
               <p className="text-[9px] text-white">
                 {isWhiteLabel ? "Confidential Pricing Document" : <>dt.solution.service@gmail.com | <span className="font-bold">www.dtsolution.in</span></>}
               </p>
               <p className="text-[9px] text-gray-400">
                 {isWhiteLabel ? "Rates subject to project complexity" : "+91 70482 77402"}
               </p>
            </div>

            <table className="w-full">
               <thead><tr><td><div style={{ height: '90px' }}></div></td></tr></thead>
               <tfoot><tr><td><div style={{ height: '50px' }}></div></td></tr></tfoot>
               <tbody>
                  <tr>
                     <td className="px-12 py-8">
                        
                        <div className="text-center mb-10 pb-6 border-b border-gray-200">
                           <h2 className="text-3xl font-black text-black uppercase tracking-wide">Logo & Branding Packages</h2>
                           <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">We offer comprehensive design solutions tailored to your business needs. Please review our standardized packages below.</p>
                        </div>

                        <div className="space-y-8">
                           {Object.values(PACKAGES).map((pack) => (
                             <div key={pack.id} className="print-bg-gray p-6 rounded-xl border print-border page-break-avoid relative overflow-hidden">
                                
                                {/* Header of Pack */}
                                <div className="flex justify-between items-end border-b border-gray-300 pb-4 mb-4 relative z-10">
                                   <div>
                                      <h3 className="text-2xl font-black print-text-black m-0">{pack.name}</h3>
                                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Estimated Timeline: {pack.timeline}</p>
                                   </div>
                                   {showPrices && (
                                      <div className="text-right bg-white px-4 py-2 rounded-lg border print-border shadow-sm">
                                         <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-0.5">Investment</p>
                                         <p className="text-2xl font-black text-coral m-0">₹{pack.price.toLocaleString('en-IN')}</p>
                                      </div>
                                   )}
                                </div>

                                {/* Body of Pack */}
                                <div className="grid grid-cols-[1fr_2fr] gap-8 relative z-10">
                                   
                                   {/* Constraints Column */}
                                   <div>
                                      <p className="text-[10px] font-bold text-coral uppercase tracking-widest mb-3">Core Details</p>
                                      <div className="space-y-4">
                                         <div className="bg-white p-3 rounded border print-border">
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Initial Concepts</p>
                                            <p className="text-lg font-black print-text-black">{pack.concepts} <span className="text-xs font-medium text-gray-500">Variations</span></p>
                                         </div>
                                         <div className="bg-white p-3 rounded border print-border">
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Revisions Included</p>
                                            <p className="text-lg font-black print-text-black">{pack.revisions} <span className="text-xs font-medium text-gray-500">Rounds</span></p>
                                         </div>
                                      </div>
                                   </div>

                                   {/* Deliverables Column */}
                                   <div>
                                      <p className="text-[10px] font-bold text-coral uppercase tracking-widest mb-3">Final Deliverables Include</p>
                                      <ul className="space-y-2 text-sm print-text-black font-medium">
                                         {pack.includes.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                               <span className="text-coral mt-0.5">•</span>
                                               <span className="leading-snug">
                                                  {/* Bold the "NEW Addition" text slightly if it starts with star */}
                                                  {item.startsWith("✨") ? <strong>{item}</strong> : item}
                                               </span>
                                            </li>
                                         ))}
                                      </ul>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>

                        <div className="mt-8 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                           All packages require a 50% advance to initiate the discovery phase.
                        </div>

                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      )}


      {/* -------------------------------------------------------------------------
          PRINT 3: BLANK QUESTIONNAIRE PDF (With links)
          ------------------------------------------------------------------------- */}
      {printType === 'questionnaire' && (
         <div className="print-only-container hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <div className="fixed-header px-12 py-4 flex justify-between items-center print-bg-dark">
               <div className="flex items-center gap-3">
                  {!isWhiteLabel && <div className="bg-white p-1.5 rounded shadow"><img src={dtLogo} className="h-8 object-contain" /></div>}
                  <div><p className="text-[10px] font-bold tracking-[0.2em] text-coral uppercase">{isWhiteLabel ? "Creative Discovery" : "Designing Transformation"}</p></div>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Client Discovery Brief</p>
               </div>
            </div>
            <div className="fixed-footer px-12 py-3 flex justify-between items-center print-bg-dark">
               <p className="text-[9px] text-white">
                 {isWhiteLabel ? "Confidential Questionnaire" : <>dt.solution.service@gmail.com | <span className="font-bold">www.dtsolution.in</span></>}
               </p>
               <p className="text-[9px] text-gray-400">Click on blue links in PDF to view reference samples.</p>
            </div>

            <table className="w-full">
               <thead><tr><td><div style={{ height: '80px' }}></div></td></tr></thead>
               <tfoot><tr><td><div style={{ height: '40px' }}></div></td></tr></tfoot>
               <tbody>
                  <tr>
                     <td className="px-12 py-6">
                        <div className="text-center mb-8 pb-4 border-b border-gray-200">
                           <h2 className="text-2xl font-black text-black uppercase tracking-wide">Logo Design Questionnaire</h2>
                           <p className="text-xs text-gray-600 mt-1">Please fill out this brief to help us understand your vision. Click reference links for ideas.</p>
                        </div>

                        {(() => {
                           const QLine = ({ q, rows = 1, links = null }) => (
                             <div className="mb-6 page-break-avoid">
                               <p className="text-sm font-bold text-black mb-1">{q}</p>
                               {links && (
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sample References:</span>
                                     {links.map((link, idx) => (
                                        <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="print-link text-[10px] flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                           {link.label} <FaExternalLinkAlt size={8}/>
                                        </a>
                                     ))}
                                  </div>
                               )}
                               <div className="w-full border border-gray-300 rounded bg-gray-50" style={{ height: `${rows * 35}px` }}></div>
                             </div>
                           );

                           return (
                             <>
                               <h3 className="text-sm font-bold text-coral uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">1. Brand Essence</h3>
                               <QLine q="1. Brand Name & Tagline (Exact spelling & uppercase/lowercase preference)" />
                               <QLine q="2. Business Description (What do you do in 2-3 sentences?)" rows={2} />
                               <QLine q="3. Core Values (3 words that define your brand. e.g., Trust, Speed, Modern)" />
                               <QLine q="4. Target Audience (Who buys your product/service?)" />
                               <QLine q="5. Main Competitors (Name 2-3 rivals so we stand out)" />
                               <QLine q="6. Unique Selling Point (What makes you different?)" rows={2} />

                               <div className="page-break-before pt-4"></div>
                               <h3 className="text-sm font-bold text-coral uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">2. Visual Style</h3>
                               <QLine 
                                  q="7. Logo Type Preference (Wordmark, Icon-based, Emblem?)" 
                                  links={[
                                    { label: 'Wordmark Style', url: 'https://cdn.logojoy.com/wp-content/uploads/20241018183448/10-09-24_Wordmark-Logo-Blog-Infographics_INFOGRAPHIC-D4-600x326.jpg' },
                                    { label: 'Icon-Based Style', url: 'https://tse3.mm.bing.net/th/id/OIP.sXhDGbOLv7lZbMhMtipJDAHaDG?w=1192&h=500&rs=1&pid=ImgDetMain&o=7&rm=3' },
                                    { label: 'Emblem Style', url: 'https://storage.googleapis.com/wowledge-new-032221/homepage_section-images/Q17CI4RAKTCz4iE9sJ6H4Ytac5sWGmXLHSwLdvJZ.webp' }
                                  ]}
                               />
                               <QLine 
                                  q="8. Overall Mood (Minimal, Bold, Luxury, Corporate, Playful?)" 
                                  links={[
                                    { label: 'Minimal', url: 'https://graphicdesignjunction.com/wp-content/uploads/2024/03/minimal_logo_concepts_ideas.jpg' },
                                    { label: 'Luxury', url: 'https://graphicsfamily.com/wp-content/uploads/2020/11/Professional-Luxury-Logo-Design-on-realistic-leather-scaled.jpg' },
                                    { label: 'Corporate', url: 'https://www.creativefabrica.com/wp-content/uploads/2022/06/13/Set-of-company-logo-design-ideas-vector-Graphics-32243506-1.jpg' },
                                    { label: 'Playful', url: 'https://tse4.mm.bing.net/th/id/OIP.ZBcLhzJ1Tcvyy98I4Po0jwHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3' }
                                  ]}
                               />
                               <QLine q="9. Color Palette (Colors you love or absolutely hate)" />
                               <QLine 
                                  q="10. Typography (Modern Sans-Serif, Classic Serif, Script?)" 
                                  links={[
                                    { label: 'Serif vs Sans-Serif Guide', url: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_700,h_400/http://assets.designhill.com/design-blog/wp-content/uploads/2023/08/Serif-vs-Sans-Serif-1-1.png' },
                                    { label: 'Sans-Serif Fonts', url: 'https://www.creightive.co/wp-content/uploads/2021/07/Font-Examples-1024x576.jpg' },
                                    { label: 'Open Sans Example', url: 'https://cdn.logojoy.com/wp-content/uploads/20210408171832/Screen-Shot-2021-04-08-at-2.18.04-PM-768x481.png' }
                                  ]}
                               />
                               <QLine q="11. Specific Iconography (Any symbol or shape you want included?)" />
                               <QLine q="12. Visual Metaphor (Should there be a hidden meaning?)" />

                               <div className="page-break-before pt-4"></div>
                               <h3 className="text-sm font-bold text-coral uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">3. Design Constraints</h3>
                               <QLine q="13. Inspiration Gallery (Share links/names of 3 logos you love)" rows={2} />
                               <QLine q="14. Anti-Inspiration (What styles do you completely dislike?)" rows={2} />
                               <QLine q="15. Complexity Level (Super simple/minimal or detailed?)" />
                               <QLine q="16. Existing Assets (Is there an existing website/store theme we must match?)" />
                               <QLine q="17. Scalability (Where will this logo be used the most?)" />
                               <QLine q="18. Message to Audience (First word they should think when they see it?)" />
                             </>
                           )
                        })()}
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      )}

    </div>
  );
};

export default LogoOnboarding;