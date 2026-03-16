import { useState } from 'react';
import { FaArrowLeft, FaPrint, FaChartLine, FaGhost, FaBuilding, FaArrowUp, FaInstagram, FaVideo, FaImages, FaLayerGroup, FaHistory, FaCheckCircle, FaPaintBrush, FaCalendarCheck, FaComments, FaExternalLinkAlt, FaShieldAlt, FaRocket, FaChartPie, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import dtLogo from '../assets/images/logo 121.png';

const SocialMediaReportV2 = () => {
  const navigate = useNavigate();

  // --- STATE: DATA INPUTS ---
  const [report, setReport] = useState({
    clientName: 'Everstone Tiles',
    month: 'Feb 13 - Mar 14, 2026',
    platform: 'Instagram',
    
    // Core Growth Numbers
    views: '5,705',
    reach: '1,038',
    profileVisits: '233',
    
    // Follower Trend
    prevFollowersStart: '70', 
    managementStart: '66',    
    currentFollowers: '86',   
    
    // Audience Split
    followersReach: '56',
    nonFollowersReach: '44',
    
    // Content Volume 
    reelsCount: '3',
    singlePostsCount: '10',
    carouselsCount: '4',
    storiesCount: '45',

    // Analytics Proof Link
    analyticsLink: 'https://drive.google.com/drive/folders/your-proof-folder-link',
    
    // Insights
    topContent: 'Luxury Texture Reels generated the highest visibility (400+ views persistently). Carousels educated the audience effectively.',
    recommendation: 'Next month, we will double down on trending audio Reels and aggressive community engagement to keep non-follower reach high.'
  });

  const [isWhiteLabel, setIsWhiteLabel] = useState(true);

  const handlePrint = () => window.print();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport(prev => ({ ...prev, [name]: value }));
  };

  const calculateGrowthPercentage = (oldVal, newVal) => {
     if(!oldVal || !newVal || Number(oldVal) === 0) return '0%';
     const diff = Number(newVal) - Number(oldVal);
     const percent = ((diff / Number(oldVal)) * 100).toFixed(1);
     return percent > 0 ? `+${percent}%` : `${percent}%`;
  };

  const totalFollowersGained = Number(report.currentFollowers) - Number(report.managementStart);
  const comebackPercentage = calculateGrowthPercentage(report.managementStart, report.currentFollowers);
  const totalContent = Number(report.reelsCount) + Number(report.singlePostsCount) + Number(report.carouselsCount);

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
        `}
      </style>

      <div className="fixed inset-0 z-[9999] pointer-events-none no-print"><CustomCursor /></div>

      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-center mb-6 max-w-[1600px] mx-auto bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-lg no-print">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white" style={{ fontFamily: 'Nunito' }}>
          <span className="text-coral bg-coral/10 p-2 rounded-lg"><FaChartLine /></span> Performance Report V3 (2-Page Deck)
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
            <FaArrowLeft /> Exit
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto items-start relative z-10 no-print">
        
        {/* --- LEFT: DATA ENTRY FORM --- */}
        <div className="w-full lg:w-[500px] space-y-6 h-[85vh] overflow-y-auto custom-scrollbar pr-2 no-print pb-10">
           
           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
             <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4">1. Client & Period</h3>
             <div className="space-y-3">
                <input type="text" name="clientName" placeholder="Client Name" value={report.clientName} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
                <input type="text" name="month" placeholder="Report Period" value={report.month} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2.5 rounded text-white text-sm focus:border-coral outline-none" />
             </div>
           </div>

           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
               <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4 border-b border-white/10 pb-4">2. Core Growth Analytics</h3>
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Total Reach / Views / Visits</label>
                    <div className="flex gap-2">
                       <input type="text" name="reach" placeholder="Reach" value={report.reach} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                       <input type="text" name="views" placeholder="Views" value={report.views} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                       <input type="text" name="profileVisits" placeholder="Visits" value={report.profileVisits} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                     <h4 className="col-span-2 text-xs font-bold text-gray-300">Follower Recovery Journey</h4>
                     <div>
                       <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Prev. Peak (e.g. 70)</label>
                       <input type="number" name="prevFollowersStart" value={report.prevFollowersStart} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                     </div>
                     <div>
                       <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Your Start Point (Dip: 66)</label>
                       <input type="number" name="managementStart" value={report.managementStart} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                     </div>
                     <div className="col-span-2">
                       <label className="text-[10px] text-coral uppercase font-bold mb-1 block">Final Number (e.g. 86)</label>
                       <input type="number" name="currentFollowers" value={report.currentFollowers} onChange={handleInputChange} className="w-full bg-black/50 border border-coral p-2 rounded text-white text-sm font-bold outline-none" />
                     </div>
                  </div>
               </div>
           </div>

           <div className="bg-[#121212] p-6 rounded-xl border border-white/10">
               <h3 className="text-xs font-bold text-coral uppercase tracking-wider mb-4 border-b border-white/10 pb-4">3. Content & Transparency Link</h3>
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Number of Reels</label><input type="number" name="reelsCount" value={report.reelsCount} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" /></div>
                  <div><label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Single Posts</label><input type="number" name="singlePostsCount" value={report.singlePostsCount} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" /></div>
                  <div><label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Carousels</label><input type="number" name="carouselsCount" value={report.carouselsCount} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" /></div>
                  <div><label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Stories Uploaded</label><input type="number" name="storiesCount" value={report.storiesCount} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" /></div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mb-4">
                  <div><label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Follower Reach (%)</label><input type="number" name="followersReach" value={report.followersReach} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" /></div>
                  <div><label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Non-Follower Reach (%)</label><input type="number" name="nonFollowersReach" value={report.nonFollowersReach} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" /></div>
               </div>

               <div className="pt-4 border-t border-white/10 space-y-4">
                  <div>
                    <label className="text-[10px] text-coral uppercase font-bold mb-1 block">Strategy: What Worked</label>
                    <textarea name="topContent" rows="2" value={report.topContent} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-coral uppercase font-bold mb-1 block">Action Plan</label>
                    <textarea name="recommendation" rows="2" value={report.recommendation} onChange={handleInputChange} className="w-full bg-black/50 border border-white/20 p-2 rounded text-white text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-coral uppercase font-bold mb-1 block">Google Drive / Proof Link</label>
                    <input type="text" name="analyticsLink" placeholder="Paste link to screenshots folder..." value={report.analyticsLink} onChange={handleInputChange} className="w-full bg-black/50 border border-coral/50 p-2 rounded text-white text-sm outline-none" />
                  </div>
               </div>
           </div>

        </div>

        {/* --- RIGHT: DASHBOARD & ACTIONS --- */}
        <div className="flex-1 bg-[#121212] p-8 rounded-xl border border-white/10 h-fit sticky top-24">
           <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4" style={{ fontFamily: 'Nunito' }}>Report Settings</h2>
           
           <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-between cursor-pointer mb-8" onClick={() => setIsWhiteLabel(!isWhiteLabel)}>
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                     {isWhiteLabel ? <FaGhost className="text-coral" /> : <FaBuilding className="text-gray-500" />}
                     <span>White-Label Mode</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${isWhiteLabel ? 'bg-coral' : 'bg-gray-600'}`}>
                     <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isWhiteLabel ? 'left-4' : 'left-0.5'}`}></div>
                  </div>
               </div>
               <p className="text-xs text-gray-400">Keep ON to hide agency name from the client report.</p>
           </div>

           <div className="bg-coral/10 border border-coral/30 rounded-xl p-6 text-center shadow-[0_0_30px_rgba(255,90,54,0.1)]">
              <FaChartLine className="text-5xl text-coral mx-auto mb-5" />
              <h3 className="text-lg font-bold text-white mb-2">Generate 2-Page Deck</h3>
              <p className="text-sm text-gray-300 mb-6">Generates a visually stunning 2-page PDF. Page 1: Growth Numbers. Page 2: Agency Value & Retention Strategy.</p>
              <button onClick={handlePrint} className="w-full bg-coral text-white py-3.5 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(255,90,54,0.3)] flex items-center justify-center gap-2">
                 <FaPrint /> Download Executive PDF
              </button>
           </div>
        </div>
      </div>

      {/* ================================================================================== */}
      {/* PRINT ONLY CONTAINER (The Actual 2-Page Report)                                    */}
      {/* ================================================================================== */}
      <div className="print-only-container hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
         
         <div className="fixed-header px-12 py-4 flex justify-between items-center print-bg-dark">
            <div className="flex items-center gap-3">
               {!isWhiteLabel && ( <div className="bg-white p-1.5 rounded shadow"><img src={dtLogo} className="h-8 object-contain" /></div> )}
               <div>
                 <p className="text-[10px] font-bold tracking-[0.2em] text-coral uppercase">Monthly Business Review</p>
                 <p className="text-[8px] text-gray-300 flex items-center gap-1"><FaInstagram/> {report.platform} Performance</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-xs font-bold text-white uppercase tracking-wider">Premium Account Deck</p>
               <p className="text-[10px] text-gray-400">{report.month}</p>
            </div>
         </div>

         <div className="fixed-footer px-12 py-3 flex justify-between items-center print-bg-dark">
            <p className="text-[9px] text-white">
              {isWhiteLabel ? "Confidential Performance Data" : "Prepared by DT Solution"}
            </p>
            <p className="text-[9px] text-gray-400">Page <span className="page-number"></span> | Data sourced from platform analytics.</p>
         </div>

         <table className="w-full">
            <thead><tr><td><div style={{ height: '90px' }}></div></td></tr></thead>
            <tfoot><tr><td><div style={{ height: '60px' }}></div></td></tr></tfoot>
            <tbody>
               <tr>
                  <td className="px-12 py-6">
                     
                     {/* ================= PAGE 1 ================= */}
                     <div className="mb-8 mt-2 pb-6 border-b-2 border-gray-200 text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Executive Summary</p>
                        <h1 className="font-black text-4xl text-black print-text-black mb-1">{report.clientName}</h1>
                        <p className="text-[11px] font-bold text-coral uppercase tracking-widest mb-4">Growth Report | Period: {report.month}</p>
                        
                        <div className="bg-gray-900 print-bg-dark text-white p-4 rounded-lg max-w-2xl mx-auto page-break-avoid shadow-lg">
                           <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-2"/>
                           <h2 className="text-xl font-black text-coral m-0 mb-1">Strategy Recovered Account Velocity</h2>
                           <p className="text-xs font-medium text-gray-300 leading-relaxed m-0">
                              By implementing an aggressive outbound engagement strategy and optimizing content formats, we successfully reversed the follower dip and drastically expanded your brand discovery to non-followers.
                           </p>
                        </div>
                     </div>

                     <div className="grid grid-cols-[3fr_2fr] gap-8 mb-10 page-break-avoid">
                        <div className="grid grid-cols-3 gap-4">
                           <div className="print-bg-gray p-4 rounded-xl border print-border text-center relative overflow-hidden flex flex-col justify-center h-[110px]">
                              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Accounts Reached</p>
                              <h3 className="text-3xl font-black print-text-black m-0 leading-snug">{report.reach}</h3>
                              <p className="text-[10px] font-bold text-green-600 mt-1 flex items-center justify-center gap-1"><FaArrowUp/> Growth</p>
                           </div>
                           <div className="print-bg-gray p-4 rounded-xl border print-border text-center relative overflow-hidden flex flex-col justify-center h-[110px]">
                              <div className="absolute top-0 left-0 w-full h-1 bg-coral"></div>
                              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Views</p>
                              <h3 className="text-3xl font-black print-text-black m-0 leading-snug">{report.views}</h3>
                              <p className="text-[10px] font-bold text-green-600 mt-1 flex items-center justify-center gap-1"><FaArrowUp/> Growth</p>
                           </div>
                           <div className="print-bg-gray p-4 rounded-xl border print-border text-center relative overflow-hidden flex flex-col justify-center h-[110px]">
                              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Profile Visits</p>
                              <h3 className="text-3xl font-black print-text-black m-0 leading-snug">{report.profileVisits}</h3>
                              <p className="text-[10px] font-bold text-green-600 mt-1 flex items-center justify-center gap-1"><FaArrowUp/> Growth</p>
                           </div>
                        </div>

                        {/* Follower Trend Visual */}
                        <div className="print-bg-gray p-4 rounded-xl border print-border flex flex-col justify-between h-[110px]">
                            <div className="flex justify-between items-center mb-1">
                               <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Follower Comeback</p>
                               <span className="text-sm font-black text-green-600">+{totalFollowersGained}</span>
                            </div>
                            
                            <div className="relative pl-6 flex-1 pt-1">
                               <div className="absolute left-[3px] top-[10px] bottom-1 w-[2px] bg-gray-300"></div>
                               <div className="flex gap-2 items-center mb-2 relative">
                                  <div className="w-2 h-2 rounded-full bg-gray-400 z-10"></div>
                                  <p className="text-[9px] text-gray-500 font-bold m-0 w-8 text-right">{report.prevFollowersStart}</p>
                                  <p className="text-[8px] text-gray-400 font-medium m-0">Prev. Peak</p>
                               </div>
                               <div className="flex gap-2 items-center mb-2 relative">
                                  <div className="w-2 h-2 rounded-full border-2 border-gray-400 bg-white z-10"></div>
                                  <p className="text-[9px] text-gray-500 font-bold m-0 w-8 text-right">{report.managementStart}</p>
                                  <p className="text-[8px] text-red-500 font-medium m-0">Dip / Start</p>
                               </div>
                               <div className="flex gap-2 items-center relative">
                                  <div className="w-2 h-2 rounded-full bg-coral z-10"></div>
                                  <p className="text-[9px] text-coral font-bold m-0 w-8 text-right">{report.currentFollowers}</p>
                                  <p className="text-[8px] text-green-600 font-bold m-0">Current ({comebackPercentage} Up)</p>
                               </div>
                            </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-[3fr_2fr] gap-8 mb-8 page-break-avoid">
                        {/* Content Output Charts */}
                        <div>
                           <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Content Published</h3>
                           <div className="grid grid-cols-4 gap-3">
                              <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg text-center flex flex-col justify-center">
                                 <FaVideo className="text-coral mx-auto mb-1 text-base" />
                                 <h4 className="text-2xl font-black text-black m-0 leading-tight">{report.reelsCount}</h4>
                                 <p className="text-[8px] font-bold text-gray-500 uppercase">Reels</p>
                              </div>
                              <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-center flex flex-col justify-center">
                                 <FaImages className="text-blue-500 mx-auto mb-1 text-base" />
                                 <h4 className="text-2xl font-black text-black m-0 leading-tight">{report.singlePostsCount}</h4>
                                 <p className="text-[8px] font-bold text-gray-500 uppercase">Posts</p>
                              </div>
                              <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg text-center flex flex-col justify-center">
                                 <FaLayerGroup className="text-purple-500 mx-auto mb-1 text-base" />
                                 <h4 className="text-2xl font-black text-black m-0 leading-tight">{report.carouselsCount}</h4>
                                 <p className="text-[8px] font-bold text-gray-500 uppercase">Carousels</p>
                              </div>
                              <div className="bg-green-50 border border-green-100 p-3 rounded-lg text-center flex flex-col justify-center">
                                 <FaHistory className="text-green-500 mx-auto mb-1 text-base" />
                                 <h4 className="text-2xl font-black text-black m-0 leading-tight">{report.storiesCount}</h4>
                                 <p className="text-[8px] font-bold text-gray-500 uppercase">Stories</p>
                              </div>
                           </div>
                           <p className="text-[9px] text-gray-500 mt-2 font-medium">A high-frequency mix of {totalContent} feed items + {report.storiesCount} stories kept the brand algorithmically relevant.</p>
                        </div>

                        {/* Audience Split */}
                        <div>
                           <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Discovery Split</h3>
                           <div className="space-y-4 mt-2 bg-gray-50 p-4 rounded-xl border border-gray-200 h-[100px] flex flex-col justify-center">
                              <div>
                                 <div className="flex justify-between text-[10px] font-bold mb-1">
                                    <span className="text-gray-600">Reached Followers</span>
                                    <span className="text-black">{report.followersReach}%</span>
                                 </div>
                                 <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-coral h-1.5 rounded-full" style={{width: `${report.followersReach}%`}}></div>
                                 </div>
                              </div>
                              <div>
                                 <div className="flex justify-between text-[10px] font-bold mb-1">
                                    <span className="text-gray-600">Reached Non-Followers</span>
                                    <span className="text-black">{report.nonFollowersReach}%</span>
                                 </div>
                                 <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-purple-500 h-1.5 rounded-full" style={{width: `${report.nonFollowersReach}%`}}></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Content Mix Distribution Chart to fill the space on Page 1 */}
                     <div className="grid grid-cols-[2fr_1fr] gap-8 mb-8 page-break-avoid border-t-2 border-gray-200 pt-8">
                        <div>
                           <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xs font-bold text-black uppercase tracking-wider m-0">Content Mix Distribution</h3>
                              <div className="flex gap-4 items-center text-[10px] font-bold">
                                 <span className="flex items-center gap-1.5 text-coral print-text-coral"><div className="w-2.5 h-2.5 bg-coral rounded"></div> Reels</span>
                                 <span className="flex items-center gap-1.5 text-blue-500 print-text-blue"><div className="w-2.5 h-2.5 bg-blue-500 rounded"></div> Posts</span>
                                 <span className="flex items-center gap-1.5 text-purple-500 print-text-purple"><div className="w-2.5 h-2.5 bg-purple-500 rounded"></div> Carousels</span>
                              </div>
                           </div>
                           <div className="w-full flex h-6 rounded-lg overflow-hidden border print-border shadow-inner">
                              <div style={{width: `${(Number(report.reelsCount)/totalContent)*100}%`}} className="bg-coral flex items-center justify-center text-white text-[9px] font-black border-r border-white/20">{Math.round((Number(report.reelsCount)/totalContent)*100)}%</div>
                              <div style={{width: `${(Number(report.singlePostsCount)/totalContent)*100}%`}} className="bg-blue-500 flex items-center justify-center text-white text-[9px] font-black border-r border-white/20">{Math.round((Number(report.singlePostsCount)/totalContent)*100)}%</div>
                              <div style={{width: `${(Number(report.carouselsCount)/totalContent)*100}%`}} className="bg-purple-500 flex items-center justify-center text-white text-[9px] font-black">{Math.round((Number(report.carouselsCount)/totalContent)*100)}%</div>
                           </div>
                        </div>
                        <div className="bg-gray-50 border print-border rounded-xl p-4 flex flex-col justify-center text-center">
                           <FaChartPie className="text-2xl text-gray-400 mx-auto mb-1.5"/>
                           <p className="text-[10px] text-gray-600 font-medium m-0 leading-relaxed">Diversified content types help target different algorithm surfaces.</p>
                        </div>
                     </div>


                     {/* ================= PAGE 2 ================= */}
                     <div className="page-break-before pt-6">
                        
                        <div className="text-center mb-10 pb-4 border-b border-gray-200">
                           <h2 className="text-2xl font-black text-black uppercase tracking-wide">Behind The Metrics</h2>
                           <p className="text-xs text-gray-500 mt-1">Understanding the operational effort and long-term strategy behind your account's growth.</p>
                        </div>

                        {/* Analytics Proof Box */}
                        {report.analyticsLink && (
                           <div className="mb-8 border border-blue-200 bg-blue-50 p-6 rounded-xl flex items-center justify-between page-break-avoid">
                              <div className="flex items-center gap-4">
                                 <div className="bg-blue-100 p-3 rounded-full text-blue-600"><FaShieldAlt size={24}/></div>
                                 <div>
                                    <h3 className="text-sm font-bold text-black m-0">Transparent Reporting (Raw Analytics Data)</h3>
                                    <p className="text-[10px] text-gray-600 m-0 mt-1">We believe in 100% transparency. Click the link to view raw screenshots directly from the platform.</p>
                                 </div>
                              </div>
                              <a href={report.analyticsLink} target="_blank" rel="noreferrer" className="bg-blue-600 print-bg-dark text-white print-text-blue px-6 py-3 rounded-lg text-[10px] font-bold flex items-center gap-2 no-underline shadow whitespace-nowrap">
                                 View Proof Folder <FaExternalLinkAlt />
                              </a>
                           </div>
                        )}

                        {/* AGENCY VALUE (WHAT WE DID) */}
                        <div className="mb-10 page-break-avoid">
                           <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Monthly Operations Log (Effort Deployed)</h3>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="flex gap-3 items-start print-bg-gray p-4 rounded-lg border print-border">
                                 <div className="bg-white p-2.5 rounded shadow-sm text-coral border print-border"><FaPaintBrush size={16}/></div>
                                 <div>
                                    <p className="text-xs font-bold text-black m-0 uppercase tracking-wide">Content Development</p>
                                    <p className="text-[10px] text-gray-600 m-0 mt-1 leading-relaxed">Extensive ideation, copywriting, graphic design, and carousel creation to maintain premium brand aesthetics.</p>
                                 </div>
                              </div>
                              <div className="flex gap-3 items-start print-bg-gray p-4 rounded-lg border print-border">
                                 <div className="bg-white p-2.5 rounded shadow-sm text-blue-500 border print-border"><FaVideo size={16}/></div>
                                 <div>
                                    <p className="text-xs font-bold text-black m-0 uppercase tracking-wide">Video Editing & Reels</p>
                                    <p className="text-[10px] text-gray-600 m-0 mt-1 leading-relaxed">Professional editing, fast-paced cuts, color grading, and trending audio research to maximize audience retention.</p>
                                 </div>
                              </div>
                              <div className="flex gap-3 items-start print-bg-gray p-4 rounded-lg border print-border">
                                 <div className="bg-white p-2.5 rounded shadow-sm text-green-500 border print-border"><FaComments size={16}/></div>
                                 <div>
                                    <p className="text-xs font-bold text-black m-0 uppercase tracking-wide">Outbound Engagement</p>
                                    <p className="text-[10px] text-gray-600 m-0 mt-1 leading-relaxed">Actively liking, commenting, and interacting with target audience accounts to trigger algorithmic visibility spikes.</p>
                                 </div>
                              </div>
                              <div className="flex gap-3 items-start print-bg-gray p-4 rounded-lg border print-border">
                                 <div className="bg-white p-2.5 rounded shadow-sm text-purple-500 border print-border"><FaCalendarCheck size={16}/></div>
                                 <div>
                                    <p className="text-xs font-bold text-black m-0 uppercase tracking-wide">Publishing & Management</p>
                                    <p className="text-[10px] text-gray-600 m-0 mt-1 leading-relaxed">Scheduling posts at peak times, managing daily stories, and monitoring performance analytics continuously.</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* THE COMPOUNDING EFFECT (RETENTION STRATEGY) */}
                        <div className="mb-12 border border-gray-200 p-6 rounded-xl page-break-avoid shadow-inner">
                           <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
                              <h3 className="text-sm font-bold text-black uppercase tracking-wider m-0">The Power of Consistency</h3>
                              <span className="bg-coral/10 text-coral text-[10px] font-bold px-3 py-1 rounded-full print-text-coral">Long-Term Strategy</span>
                           </div>
                           
                           <p className="text-xs text-gray-600 mb-8 font-medium leading-relaxed">Social media growth is exponential, not linear. Stopping campaigns disrupts the algorithmic momentum we have carefully built. Committing to consistency turns reach into revenue.</p>
                           
                           <div className="flex justify-between items-start relative px-2">
                              <div className="absolute top-4 left-6 right-6 h-1 bg-gray-200 -z-10"></div>
                              <div className="absolute top-4 left-6 w-1/3 h-1 bg-coral -z-10"></div>

                              <div className="text-center w-1/3 px-2">
                                 <div className="w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center mx-auto font-bold text-sm mb-2 shadow"><FaChartPie size={12}/></div>
                                 <h4 className="text-[10px] font-bold text-black uppercase">Months 1-2</h4>
                                 <p className="text-[9px] text-gray-500 mt-1 leading-tight">Calibration &<br/>Testing Phase</p>
                              </div>
                              <div className="text-center w-1/3 px-2">
                                 <div className="w-8 h-8 border-2 border-coral bg-white text-coral rounded-full flex items-center justify-center mx-auto font-bold text-sm mb-2 shadow"><FaRocket size={12}/></div>
                                 <h4 className="text-[10px] font-bold text-black uppercase">Months 3-5</h4>
                                 <p className="text-[9px] text-gray-500 mt-1 leading-tight">Accelerated Reach &<br/>Trust Building</p>
                              </div>
                              <div className="text-center w-1/3 px-2">
                                 <div className="w-8 h-8 border-2 border-gray-300 bg-white text-gray-400 rounded-full flex items-center justify-center mx-auto font-bold text-sm mb-2"><FaBuilding size={12}/></div>
                                 <h4 className="text-[10px] font-bold text-gray-500 uppercase">Month 6+</h4>
                                 <p className="text-[9px] text-gray-400 mt-1 leading-tight">Market Domination &<br/>Conversion Spikes</p>
                              </div>
                           </div>
                        </div>

                        {/* STRATEGIC OBSERVATIONS & SHLOKA (Stacked Vertically) */}
                        <div className="page-break-avoid flex flex-col gap-6 w-full">
                           
                           <div className="w-full border border-coral p-6 rounded-xl print-bg-coral-light bg-orange-50/50 shadow-inner">
                              <h3 className="text-sm font-bold text-coral uppercase tracking-widest mb-4 print-text-coral border-b border-coral/20 pb-2">Forward Strategy</h3>
                              <p className="text-[13px] text-gray-800 leading-relaxed font-semibold print-text-gray m-0 mb-4">
                                 <strong className="print-text-black font-extrabold text-[13px] block mb-1">What Gained Traction:</strong> {report.topContent}
                              </p>
                              <p className="text-[13px] text-gray-800 leading-relaxed font-semibold print-text-gray m-0">
                                 <strong className="print-text-black font-extrabold text-[13px] block mb-1">Action Plan:</strong> {report.recommendation}
                              </p>
                           </div>

                           <div className="w-full text-center mt-2">
                              <div className="bg-gray-50/50 print-bg-gray p-6 rounded-xl border border-gray-100">
                                <p className="text-xl font-black print-text-black m-0 tracking-wide leading-tight" style={{fontFamily: "'Noto Sans Devanagari', sans-serif"}}>जलविन्दुनिपातेन क्रमशः पूर्यते घटः।</p>
                                <p className="text-[12px] font-bold text-coral mt-2 print-text-coral">(Just as a pot fills drop by drop, lasting growth is built through consistent, compounding efforts,
                                    not overnight shortcuts.)</p>
                              </div>
                              <p className="text-[10px] font-bold text-gray-500 mt-4 uppercase tracking-wider">Strategy Deck</p>
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

export default SocialMediaReportV2;