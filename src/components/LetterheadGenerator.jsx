import { useState } from 'react';
import { FaFilePdf, FaArrowLeft, FaFileSignature, FaEye, FaEyeSlash, FaAlignLeft, FaFont, FaBold } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import dtLogo from '../assets/images/logo 121.png';
import signImg from '../assets/images/sign.png';

const LetterheadGenerator = () => {
  const navigate = useNavigate();

  // --- STATE: LETTER DETAILS ---
  const [letter, setLetter] = useState({
    date: new Date().toISOString().split('T')[0],
    recipientName: 'Poonam Mam',
    recipientCompany: 'Medialoop Tech Solution Pvt Ltd',
    subject: 'Response regarding the Non-Disclosure Agreement - DT Solution',
    salutation: 'Dear Poonam Mam,',
    content: `Thank you for sharing the NDA draft. We have thoroughly reviewed the document. While we fully respect the need for confidentiality, we find that the current clauses are significantly outside of standard market practices and are heavily one-sided.

Due to the extreme nature of several clauses, we humbly decline to sign this specific version. However, we remain open to a mutual agreement that protects both Medialoop Tech and DT Solution fairly.

Below is our section-wise observation based on industry standards and the Indian Contract Act, 1872:

**1. Clause 10: Non-Compete (10-Year Restriction)**
• The Draft says: A 10-year ban on providing similar services to your clients.
• Market Standard: Usually 6 months to 2 years.
• Legal Standing: Under Section 27 of the Indian Contract Act, 1872, any agreement that restrains anyone from exercising a lawful profession or business is void. A 10-year restriction is considered "unreasonable restraint" and would likely not hold up in court.

**2. Clause 13: Liquidated Damages (₹50,00,000 Penalty)**
• The Draft says: A fixed penalty of INR 50 Lakhs for any breach.
• Market Standard: Damages should be "actual" or "commensurate" to the loss proven.
• Legal Standing: Under Section 74 of the Indian Contract Act, the court only allows "reasonable compensation." Setting a massive fixed amount without proof of equal loss is seen as a "Penalty Clause" rather than genuine liquidated damages, making it unfair for a startup/service provider.

**3. Clause 8 & 9: Restriction on Use of Name & IP**
• The Draft says: No use of work in portfolios and 100% IP transfer.
• Market Standard: Service providers typically retain the right to showcase "work performed" in their portfolios to grow their business, and keep rights to their own pre-existing "base codes" or "design elements."

**4. Entity Representation (Personal vs. Company)**
• The Draft says: The agreement is drafted in our personal names (Dhiraj & Tejas).
• Our Stand: As we operate as DT Solution, any professional agreement must be between Medialoop Tech Solution Pvt Ltd and DT Solution, not us as individuals. This ensures proper corporate liability.

**Our Proposal:**
We are committed to our collaboration and the security of your data. We are happy to consider a revised NDA that:
- Reduces the Non-Compete period to a reasonable timeframe (e.g., 1 year).
- Adjusts the damages clause to "actual losses proven" rather than a fixed ₹50 Lakhs.
- Is executed between our respective business entities (Medialoop and DT Solution).

If you can provide a revised draft that falls within these mutual and reasonable grounds, we would be happy to review it and move forward.

Looking forward to a fair and professional resolution.`,
    signOff: 'Best regards,',
    senderName: 'Dhiraj Singh & Tejas Singh',
    senderTitle: 'Founders, DT Solution'
  });

  // --- STATE: SETTINGS ---
  const [includeSignature, setIncludeSignature] = useState(true);
  const [fontStyle, setFontStyle] = useState('legal'); // 'modern' | 'legal'

  const handlePrint = () => window.print();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLetter(prev => ({ ...prev, [name]: value }));
  };

  // --- UTILITY: PARSE BOLD TEXT (Markdown style **bold**) ---
  const renderFormattedText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="mb-3 min-h-[1em]">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-extrabold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-6 font-sans print:bg-white print:p-0">
      
      {/* --- PRINT CSS & MULTIPLE FONTS --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&display=swap');
          
          @media print {
            @page { margin: 0; size: A4; }
            body { background-color: white !important; color: black !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            .no-print, nav, footer, .cursor-none { display: none !important; }
            
            .print-only-container { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; background: white; z-index: 9999; }
            
            thead { display: table-header-group; } 
            tfoot { display: table-footer-group; }
            
            /* Professional Letterhead Header */
            .fixed-header { position: fixed; top: 0; left: 0; width: 100%; background: white; z-index: 100; border-bottom: 3px solid #FF5A36; padding: 25px 50px 15px 50px; display: flex; justify-content: space-between; align-items: center; }
            
            /* Clean Minimal Footer */
            .fixed-footer { position: fixed; bottom: 0; left: 0; width: 100%; background: white; z-index: 100; padding: 20px 50px; text-align: center; }
            .footer-line { position: absolute; top: 0; left: 50px; right: 50px; height: 1px; background-color: #e5e7eb; }
            
            /* Watermark */
            .print-watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: -1; opacity: 0.04; width: 550px; pointer-events: none; }
            .print-watermark img { width: 100%; height: auto; filter: grayscale(100%); }

            .page-break-avoid { page-break-inside: avoid; }
            .print-text-black { color: #000 !important; }
            .print-text-gray { color: #4b5563 !important; }
            
            /* Dynamic Font Classes */
            .font-modern { font-family: 'Nunito', sans-serif !important; }
            .font-legal { font-family: 'Merriweather', serif !important; font-size: 13.5px !important; line-height: 1.7 !important; }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] pointer-events-none no-print"><CustomCursor /></div>

      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-center mb-6 max-w-[1600px] mx-auto bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-lg no-print">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white" style={{ fontFamily: 'Nunito' }}>
          <span className="text-coral bg-coral/10 p-2 rounded-lg"><FaAlignLeft /></span> Legal & Official Letterpad
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
            <FaArrowLeft /> Exit
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto items-start relative z-10 no-print">
        
        {/* --- LEFT: DATA ENTRY FORM --- */}
        <div className="w-full lg:w-[650px] space-y-6 h-[85vh] overflow-y-auto custom-scrollbar pr-2 no-print pb-10">
           
           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
             <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4">1. Document Details</h3>
             <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                   <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Date</label>
                   <input type="date" name="date" value={letter.date} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                </div>
             </div>
             <div className="space-y-3">
                <input type="text" name="recipientName" placeholder="Recipient Name (To)" value={letter.recipientName} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                <input type="text" name="recipientCompany" placeholder="Recipient Company" value={letter.recipientCompany} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
             </div>
           </div>

           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
               <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                  <h3 className="text-xs font-bold text-coral uppercase tracking-wider m-0">2. Letter Content</h3>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-black/50 px-2 py-1 rounded">
                     <FaBold className="text-coral"/> <span>Use <strong>**text**</strong> to make it bold</span>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Subject Line</label>
                    <input type="text" name="subject" value={letter.subject} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Salutation</label>
                    <input type="text" name="salutation" value={letter.salutation} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-coral uppercase font-bold mb-1 block">Main Body (Formatting supported)</label>
                    <textarea name="content" value={letter.content} onChange={handleInputChange} rows="15" className="w-full bg-black/50 border border-coral/50 p-3 rounded text-white text-sm outline-none resize-y custom-scrollbar leading-relaxed" />
                  </div>
               </div>
           </div>

           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
               <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4 border-b border-white/10 pb-4">3. Sign-off</h3>
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Sign-off Phrase</label>
                    <input type="text" name="signOff" value={letter.signOff} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Sender Name</label>
                       <input type="text" name="senderName" value={letter.senderName} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                     </div>
                     <div>
                       <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Sender Title</label>
                       <input type="text" name="senderTitle" value={letter.senderTitle} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                     </div>
                  </div>
               </div>
           </div>

        </div>

        {/* --- RIGHT: DASHBOARD & ACTIONS --- */}
        <div className="flex-1 bg-[#121212] p-8 rounded-xl border border-white/10 h-fit sticky top-24">
           <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4" style={{ fontFamily: 'Nunito' }}>Document Settings</h2>
           
           {/* Font Toggle */}
           <div className="mb-6">
              <label className="text-[10px] text-gray-400 uppercase font-bold mb-2 flex items-center gap-2"><FaFont/> Document Typography Style</label>
              <div className="grid grid-cols-2 gap-3">
                 <div 
                    onClick={() => setFontStyle('modern')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${fontStyle === 'modern' ? 'bg-coral/10 border-coral text-coral' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                 >
                    <p className="font-bold mb-1" style={{fontFamily: "'Nunito', sans-serif"}}>Modern (Nunito)</p>
                    <p className="text-[10px] opacity-80">Clean, friendly, best for standard proposals.</p>
                 </div>
                 <div 
                    onClick={() => setFontStyle('legal')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${fontStyle === 'legal' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                 >
                    <p className="font-bold mb-1" style={{fontFamily: "'Merriweather', serif"}}>Legal (Serif)</p>
                    <p className="text-[10px] opacity-80">Formal, authoritative, best for contracts/NDAs.</p>
                 </div>
              </div>
           </div>

           {/* Signature Toggle */}
           <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-between cursor-pointer mb-8" onClick={() => setIncludeSignature(!includeSignature)}>
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                     {includeSignature ? <FaEye className="text-coral" /> : <FaEyeSlash className="text-gray-500" />}
                     <span>Include Digital Signature</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${includeSignature ? 'bg-coral' : 'bg-gray-600'}`}>
                     <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${includeSignature ? 'left-4' : 'left-0.5'}`}></div>
                  </div>
               </div>
               <p className="text-xs text-gray-400">Attach DT Solution authorized signature image at the bottom.</p>
           </div>

           {/* ACTION BUTTON */}
           <div className="bg-coral/10 border border-coral/30 rounded-xl p-6 text-center shadow-[0_0_30px_rgba(255,90,54,0.1)]">
              <FaFileSignature className="text-5xl text-coral mx-auto mb-5" />
              <h3 className="text-lg font-bold text-white mb-2">Generate Letter PDF</h3>
              <p className="text-sm text-gray-300 mb-6">Generates a highly professional, formatted letterhead ready to be sent to corporate clients.</p>
              <button onClick={handlePrint} className="w-full bg-coral text-white py-3.5 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(255,90,54,0.3)] flex items-center justify-center gap-2">
                 <FaFilePdf /> Download Official Letter
              </button>
           </div>
        </div>
      </div>

      {/* ================================================================================== */}
      {/* PRINT ONLY CONTAINER (The Actual Letterpad PDF)                                    */}
      {/* ================================================================================== */}
      <div className={`print-only-container hidden ${fontStyle === 'legal' ? 'font-legal' : 'font-modern'} relative`}>
         
         {/* THE WATERMARK */}
         <div className="print-watermark">
             <img src={dtLogo} alt="Watermark" />
         </div>

         {/* FIXED HEADER */}
         <div className="fixed-header font-modern">
            <div className="flex items-end gap-2">
               <img src={dtLogo} alt="DT Solution" className="h-10 object-contain" />
               <div className="mb-0.5">
                  <p className="text-[10px] font-black tracking-[0.25em] text-coral uppercase m-0 leading-none">Designing</p>
                  <p className="text-[10px] font-black tracking-[0.25em] text-coral uppercase m-0 leading-none mt-0.5">Transformation</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-lg font-black text-black uppercase tracking-wider m-0">DT Solution</p>
               <p className="text-[10px] text-gray-500 font-bold m-0 mt-1 uppercase tracking-widest">Official Communication</p>
            </div>
         </div>

         {/* FIXED CLEAN FOOTER (Email, Website, Phone Only) */}
         <div className="fixed-footer font-modern">
            <div className="footer-line"></div>
            <div className="w-full text-center">
               <p className="m-0 text-gray-500 font-bold text-[10px] tracking-widest uppercase">
                  dt.solution.service@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; www.dtsolution.in &nbsp;&nbsp;|&nbsp;&nbsp; +91 70482 77402
               </p>
            </div>
         </div>

         {/* CONTENT BODY */}
         <table className="w-full relative z-10">
            <thead><tr><td><div style={{ height: '110px' }}></div></td></tr></thead>
            <tfoot><tr><td><div style={{ height: '80px' }}></div></td></tr></tfoot>
            <tbody>
               <tr>
                  <td className="px-12 py-4">
                     
                     {/* Date & Recipient */}
                     <div className="mb-10 text-sm print-text-black">
                        <p className="mb-8">{new Date(letter.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p className="font-bold m-0">{letter.recipientName}</p>
                        <p className="m-0 mt-1">{letter.recipientCompany}</p>
                     </div>

                     {/* Subject */}
                     <div className="mb-8 border-b-2 border-black pb-2">
                        <p className="text-base print-text-black m-0 leading-snug">
                           <span className="font-bold uppercase tracking-wider text-xs mr-2">Subject:</span> 
                           <span className="font-bold">{letter.subject}</span>
                        </p>
                     </div>

                     {/* Salutation */}
                     <div className="mb-6">
                        <p className="text-base print-text-black font-bold m-0">{letter.salutation}</p>
                     </div>
                     
                     {/* THE PARSED MAIN BODY */}
                     <div className="print-text-gray text-[14px]">
                        {renderFormattedText(letter.content)}
                     </div>

                     {/* Sign-off & Signature */}
                     <div className="mt-16 page-break-avoid print-text-black text-sm">
                        <p className="mb-6">{letter.signOff}</p>
                        
                        {includeSignature && (
                           <div className="mb-2">
                              <img src={signImg} alt="Signature" className="h-16 object-contain" />
                           </div>
                        )}
                        {!includeSignature && <div className="h-16"></div>}

                        <p className="font-bold m-0 text-base">{letter.senderName}</p>
                        <p className="text-gray-500 text-xs m-0 mt-1">{letter.senderTitle}</p>
                     </div>

                  </td>
               </tr>
            </tbody>
         </table>
      </div>

    </div>
  );
};

export default LetterheadGenerator;