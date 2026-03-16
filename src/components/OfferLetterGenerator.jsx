import { useState, useRef } from 'react';
import { FaPrint, FaPlus, FaTrash, FaCheckSquare, FaSquare, FaBriefcase, FaUserTie, FaCalendarAlt } from 'react-icons/fa';
import CustomCursor from './CustomCursor';
import { ROLES } from '../data/rolesData'; 

// Assets
import dtLogo from '../assets/images/logo 121.png'; 
import dtSign from '../assets/images/sign.png'; 

const OfferLetterGenerator = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [newTerm, setNewTerm] = useState("");

  // --- STATE: Date Modes ---
  const [headerDateMode, setHeaderDateMode] = useState('today'); // 'today' or 'custom'
  const [customHeaderDate, setCustomHeaderDate] = useState(todayStr);
  
  const [joiningDateMode, setJoiningDateMode] = useState('custom'); // 'today' or 'custom'

  // --- STATE: Candidate Details ---
  const [details, setDetails] = useState({
    name: '',
    role: 'Jr Graphic Designer',
    joiningDate: todayStr, // Used if mode is 'custom'
    ctc: '3,00,000',
    probation: '3 Months',
    notice: '30 Days',
    location: 'Ahmedabad'
  });

  // --- STATE: Optional Terms ---
  const [selectedTerms, setSelectedTerms] = useState({
    startDate: true,
    compensation: true,
    location: true,
    probation: true,
    notice: true,
    leaves: false,
    confidentiality: true
  });

  const [customTerms, setCustomTerms] = useState([]);

  // --- HELPERS: Get Actual Dates based on mode ---
  const getActualHeaderDate = () => headerDateMode === 'today' ? todayStr : customHeaderDate;
  const getActualJoiningDate = () => joiningDateMode === 'today' ? todayStr : details.joiningDate;

  // --- HANDLERS ---
  const toggleTerm = (key) => setSelectedTerms(prev => ({ ...prev, [key]: !prev[key] }));

  const addCustomTerm = () => {
    if (newTerm.trim()) {
      setCustomTerms([...customTerms, newTerm]);
      setNewTerm("");
    }
  };

  const removeCustomTerm = (index) => setCustomTerms(customTerms.filter((_, i) => i !== index));

  // --- NATIVE PRINT FUNCTION ---
  const handlePrint = () => {
    window.print();
  };

  // --- DATE TOGGLE COMPONENT ---
  const DateToggle = ({ mode, setMode, customDateValue, setCustomDateValue, label }) => (
    <div>
        <label className="text-[10px] text-gray-500 mb-2 block flex items-center gap-1"><FaCalendarAlt /> {label}</label>
        <div className="bg-black/30 p-1 rounded-lg flex gap-1 mb-2 border border-white/10">
            <button onClick={() => setMode('today')} className={`flex-1 text-xs py-1.5 rounded-md transition-all !cursor-pointer ${mode === 'today' ? 'bg-coral text-white font-bold' : 'text-gray-400 hover:text-white'}`}>Today</button>
            <button onClick={() => setMode('custom')} className={`flex-1 text-xs py-1.5 rounded-md transition-all !cursor-pointer ${mode === 'custom' ? 'bg-coral text-white font-bold' : 'text-gray-400 hover:text-white'}`}>Custom</button>
        </div>
        {mode === 'custom' && (
            <input type="date" value={customDateValue} onChange={e => setCustomDateValue(e.target.value)} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm focus:border-coral outline-none !cursor-text animate-fadeIn" />
        )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20 px-4 md:px-8 text-white font-sans cursor-none selection:bg-coral selection:text-white print:bg-white print:p-0 print:pt-0">
      
      {/* Load Nunito Font & Print Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap');
          @media print {
            @page { margin: 0; size: A4; }
            body { background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none !important; }
            .print-only { display: block !important; width: 100% !important; height: 100% !important; position: absolute; top: 0; left: 0; }
            html, body { height: 100%; overflow: hidden; }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] pointer-events-none no-print"><CustomCursor /></div>

      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[450px_1fr] gap-10 items-start no-print">
        
        {/* --- LEFT PANEL: CONTROLS (Hidden on Print) --- */}
        <div className="space-y-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 h-fit sticky top-24 max-h-[90vh] overflow-y-auto custom-scrollbar no-print">
          <div className="border-b border-white/10 pb-4">
            <h1 className="text-2xl font-bold text-white">Offer Generator</h1>
            <p className="text-gray-400 text-xs mt-1">Design Official Letters & Contracts.</p>
          </div>

          {/* Details Form */}
          <div className="space-y-4 cursor-auto">
            <h3 className="text-xs font-bold text-coral uppercase tracking-wider">Candidate & Role</h3>
            
            <div className="relative">
               <FaUserTie className="absolute top-3 left-3 text-gray-500 text-xs"/>
               <input type="text" placeholder="Candidate Name" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} className="w-full pl-9 bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
               <div className="relative">
                 <FaBriefcase className="absolute top-3 left-3 text-gray-500 text-xs"/>
                 <select value={details.role} onChange={e => setDetails({...details, role: e.target.value})} className="w-full pl-9 bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none !cursor-pointer appearance-none">
                    {Object.keys(ROLES).map((roleKey) => <option key={roleKey} value={roleKey}>{roleKey}</option>)}
                 </select>
               </div>
               <input type="text" placeholder="CTC (e.g. 3,00,000)" value={details.ctc} onChange={e => setDetails({...details, ctc: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
            </div>
            
            {/* JOINING DATE TOGGLE */}
            <DateToggle 
                label="Joining Date" 
                mode={joiningDateMode} 
                setMode={setJoiningDateMode} 
                customDateValue={details.joiningDate} 
                setCustomDateValue={(val) => setDetails({...details, joiningDate: val})} 
            />

            <div className="grid grid-cols-2 gap-3">
               <div>
                  <label className="text-[10px] text-gray-500 mb-1 block">Probation</label>
                  <input type="text" placeholder="e.g. 3 Months" value={details.probation} onChange={e => setDetails({...details, probation: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
               </div>
               <div>
                  <label className="text-[10px] text-gray-500 mb-1 block">Notice Period</label>
                  <input type="text" placeholder="e.g. 30 Days" value={details.notice} onChange={e => setDetails({...details, notice: e.target.value})} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
               </div>
            </div>
          </div>

          {/* Document Settings */}
          <div className="space-y-3 cursor-auto border-t border-white/10 pt-4">
             <h3 className="text-xs font-bold text-coral uppercase tracking-wider">Document Settings</h3>
             {/* HEADER DATE TOGGLE */}
             <DateToggle 
                label="Document Date (Header)" 
                mode={headerDateMode} 
                setMode={setHeaderDateMode} 
                customDateValue={customHeaderDate} 
                setCustomDateValue={setCustomHeaderDate} 
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 cursor-auto border-t border-white/10 pt-4">
            <h3 className="text-xs font-bold text-coral uppercase tracking-wider">Standard Clauses</h3>
            <div className="grid grid-cols-2 gap-2">
               {Object.keys(selectedTerms).map(key => (
                 <div key={key} onClick={() => toggleTerm(key)} className={`flex items-center gap-2 p-2 rounded cursor-pointer border transition-all !cursor-pointer ${selectedTerms[key] ? 'bg-white/10 border-coral text-white' : 'bg-black/30 border-white/5 text-gray-500'}`}>
                    {selectedTerms[key] ? <FaCheckSquare className="text-coral text-xs"/> : <FaSquare className="text-xs"/>}
                    <span className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Custom Terms */}
          <div className="space-y-3 cursor-auto border-t border-white/10 pt-4">
            <h3 className="text-xs font-bold text-coral uppercase tracking-wider">Extra Clauses</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Add custom point..." value={newTerm} onChange={e => setNewTerm(e.target.value)} className="flex-1 bg-black/50 border border-white/20 p-2 rounded text-white text-sm focus:border-coral outline-none !cursor-text" />
              <button onClick={addCustomTerm} className="bg-white text-black px-3 rounded hover:bg-coral hover:text-white !cursor-pointer"><FaPlus /></button>
            </div>
            <div className="space-y-1">
              {customTerms.map((term, i) => (
                <div key={i} className="flex justify-between items-start text-xs bg-white/5 p-2 rounded border border-white/5">
                   <span className="text-gray-300 w-[90%]">{term}</span>
                   <button onClick={() => removeCustomTerm(i)} className="text-red-400 hover:text-red-600 !cursor-pointer"><FaTrash size={10}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Print Button */}
          <button onClick={handlePrint} className="w-full flex justify-center items-center gap-2 bg-coral py-4 rounded-xl font-bold text-white text-sm hover:bg-white hover:text-black transition-all !cursor-pointer shadow-[0_0_20px_rgba(255,107,107,0.3)] mt-2">
             <FaPrint /> Print / Save PDF
          </button>
          <p className="text-[10px] text-gray-500 text-center mt-2">Select "Save as PDF" in the print dialog.</p>
        </div>
      </div>

      {/* --- RIGHT PANEL: A4 PREVIEW (Visible in Print) --- */}
      <div className="flex justify-center print-only no-print-bg">
        
        <div 
           className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl relative flex flex-col shrink-0 print:shadow-none print:w-full print:h-full"
           style={{ fontFamily: "'Nunito', sans-serif" }} 
        >
             
             {/* 1. STYLISH HEADER */}
             <div className="bg-[#1a1a1a] flex justify-between items-center px-12 py-8 border-b-4 border-coral print:bg-[#1a1a1a] print:text-white print-color-adjust:exact">
                <div className="flex flex-col">
                    {/* Logo Container - NOW WHITE BACKGROUND */}
                    <div className="bg-white p-2 rounded-lg w-fit mb-2 shadow-lg">
                       <img src={dtLogo} alt="DT Solution" className="h-10 object-contain" />
                    </div>
                    <p className="text-[9px] font-bold tracking-[0.3em] text-coral uppercase ml-1">Designing Transformation</p>
                </div>
                <div className="text-right">
                    <h1 className="text-4xl font-extrabold text-white tracking-wide uppercase">Offer Letter</h1>
                    {/* Dynamic Header Date */}
                    <p className="text-xs font-medium text-gray-400 mt-1">Date: {new Date(getActualHeaderDate()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
             </div>

             {/* 2. BODY CONTENT */}
             <div className="px-12 py-10 flex-grow text-[14px] leading-relaxed text-gray-800 font-medium">
                
                <div className="mb-8 pb-4 border-b border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Prepared For</p>
                  <p className="text-xl font-bold text-black">{details.name || 'Candidate Name'}</p>
                </div>

                <p className="mb-4">
                  Dear <strong>{details.name || 'Candidate'}</strong>,
                </p>

                <p className="mb-6 text-gray-600">
                  We are delighted to extend an offer for the position of <strong className="text-coral uppercase">{ROLES[details.role].title}</strong> at <strong>DT Solution</strong>. 
                  Your skills, portfolio, and passion for innovation have impressed us, and we are confident that you will play a key role in our agency's growth.
                </p>

                {/* Role Description Box */}
                <div className="bg-gray-50 p-6 my-6 rounded-lg border border-gray-100 print:bg-gray-50 print-color-adjust:exact">
                   <div className="flex items-center gap-2 mb-2">
                      <FaBriefcase className="text-coral text-xs" />
                      <h3 className="font-bold text-xs uppercase text-gray-800 tracking-widest">Scope of Work</h3>
                   </div>
                   <p className="text-sm text-gray-600 leading-6 text-justify">
                      {ROLES[details.role].desc}
                   </p>
                </div>

                <p className="mb-4 font-bold text-base text-black uppercase tracking-wide border-b border-gray-200 pb-2 inline-block">Key Terms of Employment</p>
                
                <ul className="list-none space-y-2 mb-8 text-gray-700 text-sm">
                    
                    {selectedTerms.startDate && (
                      <li className="flex items-start gap-3">
                         <span className="text-coral font-bold">•</span>
                         {/* Dynamic Joining Date */}
                         <span><strong>Joining Date:</strong> You are expected to join on <strong>{new Date(getActualJoiningDate()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.</span>
                      </li>
                    )}
                    
                    {selectedTerms.compensation && (
                      <li className="flex items-start gap-3">
                         <span className="text-coral font-bold">•</span>
                         <span><strong>Compensation:</strong> Your Annual CTC will be <strong>₹{details.ctc}</strong>. Salary will be disbursed monthly.</span>
                      </li>
                    )}
                    
                    {selectedTerms.location && (
                      <li className="flex items-start gap-3">
                         <span className="text-coral font-bold">•</span>
                         <span><strong>Base Location:</strong> {details.location}.</span>
                      </li>
                    )}
                    
                    {selectedTerms.probation && (
                      <li className="flex items-start gap-3">
                         <span className="text-coral font-bold">•</span>
                         <span><strong>Probation:</strong> A period of <strong>{details.probation}</strong> applies from the date of joining.</span>
                      </li>
                    )}
                    
                    {selectedTerms.notice && (
                      <li className="flex items-start gap-3">
                         <span className="text-coral font-bold">•</span>
                         <span><strong>Notice Period:</strong> <strong>{details.notice}</strong> notice is required for resignation post-confirmation.</span>
                      </li>
                    )}

                    {selectedTerms.leaves && (
                      <li className="flex items-start gap-3">
                         <span className="text-coral font-bold">•</span>
                         <span><strong>Leaves:</strong> Entitled to standard paid leaves and sick leaves as per company policy.</span>
                      </li>
                    )}
                    
                    {selectedTerms.confidentiality && (
                      <li className="flex items-start gap-3">
                         <span className="text-coral font-bold">•</span>
                         <span><strong>Confidentiality:</strong> You agree to maintain the confidentiality of all client data and company intellectual property.</span>
                      </li>
                    )}

                    {/* Custom Terms */}
                    {customTerms.map((term, index) => (
                      <li key={index} className="flex items-start gap-3">
                         <span className="text-coral font-bold">•</span>
                         <span>{term}</span>
                      </li>
                    ))}
                </ul>

                <p className="text-gray-600 text-sm mt-8">
                  We look forward to embarking on this creative journey with you. Please sign a copy of this letter to confirm your acceptance.
                </p>

             </div>

             {/* 3. FOOTER SIGNATURES */}
             <div className="px-12 pb-8 mt-auto">
                 <div className="grid grid-cols-2 gap-20 mb-8 items-end">
                      {/* Company Signature */}
                     <div>
                         <div className="ml-2 mb-[-10px]">
                            <img src={dtSign} alt="Signature" className="h-14 object-contain" />
                         </div>
                         <p className="font-bold text-xs uppercase tracking-wider text-black border-t-2 border-black pt-3 w-40">Authorized Signatory</p>
                         <p className="text-[10px] text-gray-500 mt-1">For, DT Solution</p>
                     </div>
                     
                     {/* Candidate Signature */}
                     <div className="flex flex-col items-end">
                         <div className="h-14"></div>
                         <p className="font-bold text-xs uppercase tracking-wider text-black border-t-2 border-gray-300 pt-3 w-40 text-right">Candidate Signature</p>
                         <p className="text-[10px] text-gray-500 mt-1">Accepted By: {details.name}</p>
                     </div>
                 </div>

                 {/* BOTTOM BAR */}
                 <div className="bg-gray-50 border-t border-gray-100 py-3 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-semibold px-2">
                    <span>www.dtsolution.in</span>
                    <span>dt.solution.service@gmail.com</span>
                 </div>
             </div>

             {/* BOTTOM STRIP */}
             <div className="h-2 w-full bg-coral print:bg-coral print-color-adjust:exact"></div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetterGenerator;