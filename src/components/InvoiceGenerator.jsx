import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { FaPlus, FaPrint, FaTrash, FaCalculator, FaPercentage, FaRupeeSign, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomCursor from './CustomCursor';

// --- IMPORT IMAGES ---
import dtsLogo from '../assets/images/logo 121.png'; 
import signImg from '../assets/images/sign.png'; 

// --- UTILITY: Number to Words ---
const numToWords = (num) => {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  if ((num = num.toString()).length > 9) return 'Overflow';
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; 
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only' : '';
  return str || 'Zero Only';
};

const InvoiceGenerator = () => {
  const navigate = useNavigate();

  // --- 1. COMPANY CONFIG ---
  const companyDetails = {
    name: "DT Solution",
    slogan: "Designing Transformation into Success",
    address: "G-505, VSH 1, Gota Road,\nAhmedabad - 380060, Gujarat",
    email: "dt.solution.service@gmail.com",
    phone: "+91 70482 77402",
    msme: "UDYAM-GJ-01-0578059",
    upiId: "7048277402@axl" 
  };

  const defaultTerms = [
    "Payment is due within 15 days from the date of invoice.",
    "Late payments may delay future project deliveries.",
    "Please quote the Invoice Number when remitting funds.",
  ];

  // --- 2. STATE ---
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    clientName: '',
    clientAddress: ''
  });

  const [items, setItems] = useState([
    { description: 'Graphic Design Services', qty: 1, rate: 0 }
  ]);

  const [discountType, setDiscountType] = useState('amount'); 
  const [discountValue, setDiscountValue] = useState(0);
  const [totals, setTotals] = useState({ subtotal: 0, discountAmt: 0, total: 0 });

  // --- 3. CALCULATIONS ---
  useEffect(() => {
    const sub = items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    let discAmt = 0;
    if (discountType === 'percent') {
      discAmt = (sub * discountValue) / 100;
    } else {
      discAmt = discountValue;
    }
    const final = sub - discAmt;
    setTotals({ subtotal: sub, discountAmt: discAmt, total: final > 0 ? final : 0 });
  }, [items, discountValue, discountType]);

  const getDueDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 15);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // --- 4. HANDLERS ---
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { description: '', qty: 1, rate: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  // --- 5. NATIVE PRINT FUNCTION ---
  const handlePrint = () => {
    window.print();
  };

  const upiString = `upi://pay?pa=${companyDetails.upiId}&pn=DT%20Solution&am=${totals.total}&cu=INR`;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-6 font-sans print:bg-white print:p-0">
      
      {/* --- CSS FOR PRINTING --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          @media print {
            @page { margin: 0; size: A4; }
            body { background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none !important; }
            /* This class forces the invoice to take full screen on print */
            .print-only-container { 
                display: block !important; 
                width: 100% !important; 
                height: 100% !important; 
                position: absolute; 
                top: 0; 
                left: 0; 
                margin: 0; 
                padding: 0;
                overflow: visible !important;
            }
            /* Hide scrollbars */
            ::-webkit-scrollbar { display: none; }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] pointer-events-none no-print"><CustomCursor /></div>

      {/* --- TOP BAR (Hidden on Print) --- */}
      <div className="flex justify-between items-center mb-6 max-w-[1400px] mx-auto bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-lg relative z-[50] no-print">
        <h1 className="text-xl font-bold flex items-center gap-2 text-coral">
          <FaCalculator /> Internal Invoice Tool
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
            <FaArrowLeft /> Exit
          </button>
          
          <button 
            onClick={handlePrint}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-coral hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <FaPrint /> Print / Save PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto items-start relative z-10 no-print">
        
        {/* --- LEFT: EDITOR FORM (Hidden on Print) --- */}
        <div className="w-full lg:w-[400px] bg-[#121212] p-6 rounded-xl border border-white/10 shrink-0 shadow-xl h-[85vh] overflow-y-auto custom-scrollbar no-print">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-white/10 pb-2">Invoice Details</h2>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-gray-500 uppercase block mb-1">Inv No</label>
                <input type="text" value={invoiceData.invoiceNo} onChange={(e) => setInvoiceData({...invoiceData, invoiceNo: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/20 p-2.5 rounded text-sm text-white focus:border-coral outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase block mb-1">Date</label>
                <input type="date" value={invoiceData.date} onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/20 p-2.5 rounded text-sm text-white focus:border-coral outline-none" />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-500 uppercase block mb-1">Client Name</label>
              <input type="text" placeholder="Client Name" value={invoiceData.clientName} onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/20 p-2.5 rounded text-sm text-white focus:border-coral outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase block mb-1">Client Address</label>
              <textarea placeholder="Address, City, State" rows="2" value={invoiceData.clientAddress} onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/20 p-2.5 rounded text-sm text-white focus:border-coral outline-none resize-none" />
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-gray-500 uppercase">Services</label>
                <button onClick={addItem} className="text-xs text-coral hover:text-white transition flex items-center gap-1 font-bold cursor-pointer"><FaPlus /> Add</button>
              </div>
              
              <div className="space-y-3 mb-4">
                {items.map((item, i) => (
                  <div key={i} className="bg-[#1a1a1a] p-3 rounded border border-white/5 relative group hover:border-white/20 transition-colors">
                    <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(i, 'description', e.target.value)} className="w-full bg-transparent border-b border-white/10 mb-2 pb-1 outline-none text-sm font-medium" />
                    <div className="flex gap-2">
                      <div className="w-16">
                          <input type="number" placeholder="Qty" value={item.qty} onChange={(e) => handleItemChange(i, 'qty', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 p-1.5 rounded text-xs text-center outline-none text-gray-300" />
                      </div>
                      <div className="flex-1">
                          <input type="number" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(i, 'rate', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 p-1.5 rounded text-xs outline-none text-gray-300" />
                      </div>
                    </div>
                    <button onClick={() => removeItem(i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition cursor-pointer"><FaTrash size={10}/></button>
                  </div>
                ))}
              </div>

              {/* Discount Controls */}
              <div className="bg-[#1a1a1a] p-3 rounded border border-white/5">
                 <div className="flex justify-between mb-2">
                    <label className="text-[10px] text-gray-400 uppercase">Discount Type</label>
                    <div className="flex gap-2">
                       <button onClick={() => setDiscountType('amount')} className={`text-[10px] px-2 py-0.5 rounded cursor-pointer ${discountType === 'amount' ? 'bg-coral text-white' : 'bg-[#0a0a0a] text-gray-500'}`}>Amount</button>
                       <button onClick={() => setDiscountType('percent')} className={`text-[10px] px-2 py-0.5 rounded cursor-pointer ${discountType === 'percent' ? 'bg-coral text-white' : 'bg-[#0a0a0a] text-gray-500'}`}>%</button>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                   {discountType === 'amount' ? <FaRupeeSign className="text-gray-500 text-xs"/> : <FaPercentage className="text-gray-500 text-xs"/>}
                   <input type="number" value={discountValue} onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)} className="flex-1 bg-[#0a0a0a] border border-white/10 p-1.5 rounded text-xs text-right outline-none text-white" placeholder="0" />
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- RIGHT: PREVIEW CONTAINER (Always visible in DOM, scaled for Print) --- */}
      <div className="flex justify-center print-only-container lg:absolute lg:top-24 lg:left-[450px] lg:right-0 no-print-bg">
         
         <div 
           className="bg-white text-black w-[210mm] min-h-[297mm] h-auto relative shadow-2xl overflow-hidden print:shadow-none print:w-full print:h-full print:overflow-visible"
           style={{ fontFamily: "'Inter', sans-serif" }} 
         >
            {/* --- WATERMARK --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
               <img src={dtsLogo} alt="Watermark" className="w-[500px] opacity-[0.04] object-contain grayscale" />
            </div>

            {/* --- CONTENT Z-INDEX 10 --- */}
            <div className="relative z-10 h-full flex flex-col bg-white">
              
              {/* ================= NEW STYLISH HEADER (OFFER LETTER STYLE) ================= */}
              <div className="bg-[#1a1a1a] flex justify-between items-start px-12 py-8 border-b-4 border-coral print:bg-[#1a1a1a] print:text-white print-color-adjust:exact">
                <div className="flex flex-col">
                    {/* White Logo Container to pop out */}
                    <div className="bg-white p-2 rounded-lg w-fit mb-2 shadow-lg">
                       <img src={dtsLogo} alt="DT Solution" className="h-12 object-contain" />
                    </div>
                    <p className="text-[9px] font-bold tracking-[0.3em] text-coral uppercase ml-1">Designing Transformation</p>
                </div>
                <div className="text-right">
                  <h1 className="text-5xl font-extrabold text-white tracking-wide uppercase leading-none">INVOICE</h1>
                  <p className="font-mono text-lg text-gray-300 mt-1">#{invoiceData.invoiceNo}</p>
                  
                  <div className="mt-4 text-right flex flex-col items-end">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Issued</span>
                        <span className="text-sm font-bold text-white">{new Date(invoiceData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-coral font-bold uppercase tracking-wider">Due by</span>
                        <span className="text-sm font-bold text-white">{getDueDate(invoiceData.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* ================= END HEADER ================= */}


              {/* 2. BODY CONTENT (With Padding) */}
              <div className="px-12 py-10 flex-grow">

                  {/* Address Section */}
                  <div className="flex justify-between mb-12 gap-10">
                    <div className="w-[48%]">
                      <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest border-b border-gray-100 pb-1 inline-block">Bill To</p>
                      <p className="font-bold text-xl text-black leading-tight mb-2">{invoiceData.clientName || 'Client Name'}</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{invoiceData.clientAddress || 'Client Address...'}</p>
                    </div>
                    <div className="w-[48%] text-right">
                      <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest border-b border-gray-100 pb-1 inline-block">Payable To</p>
                      <p className="font-bold text-lg text-black">{companyDetails.name}</p>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{companyDetails.address}</p>
                      <p className="text-xs text-gray-500 mt-2">M: {companyDetails.phone}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">MSME: {companyDetails.msme}</p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="mb-8 flex-grow">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-black border-y border-gray-300">
                          <th className="py-3 pl-4 pr-4 text-left text-[11px] font-bold uppercase tracking-wider w-[50%]">Item Description</th>
                          <th className="py-3 px-4 text-center text-[11px] font-bold uppercase tracking-wider">Qty</th>
                          <th className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-wider">Rate</th>
                          <th className="py-3 pl-4 pr-4 text-right text-[11px] font-bold uppercase tracking-wider">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {items.map((item, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 pl-4 pr-4 font-medium text-gray-800 align-top">{item.description || '---'}</td>
                            <td className="py-4 px-4 text-center text-gray-500 align-top">{item.qty}</td>
                            <td className="py-4 px-4 text-right text-gray-500 align-top">₹{parseFloat(item.rate).toLocaleString('en-IN')}</td>
                            <td className="py-4 pl-4 pr-4 text-right font-bold text-gray-900 align-top">₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Section */}
                  <div className="flex justify-end mb-2">
                    <div className="w-[50%] bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                        <span className="text-sm font-bold text-gray-800">₹{totals.subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      
                      {totals.discountAmt > 0 && (
                        <div className="flex justify-between mb-2 text-coral">
                          <span className="text-sm font-medium">Discount {discountType === 'percent' ? `(${discountValue}%)` : ''}</span>
                          <span className="text-sm font-bold">- ₹{totals.discountAmt.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      <div className="h-px bg-gray-300 my-3"></div>
                      
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-lg font-bold text-black uppercase">Total</span>
                        <span className="text-2xl font-bold text-black">₹{totals.total.toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="text-right mt-2">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide italic border-t border-gray-200 pt-2 inline-block">
                          {numToWords(totals.total)} Rupees Only
                        </p>
                      </div>
                    </div>
                  </div>
              </div> {/* End Body Padding */}


              {/* 3. FOOTER AREA (With Padding) */}
              <div className="mt-auto px-12 pb-8">
                <div className="flex justify-between items-end pb-6">
                  
                  {/* Payment Info & QR */}
                  <div className="flex gap-4 items-end">
                      <div className="bg-white p-1 border-2 border-black rounded-lg">
                        <QRCode value={upiString} size={80} fgColor="#000" level="Q" />
                      </div>
                      <div className="pb-1">
                        <p className="text-[10px] font-bold uppercase text-black tracking-widest mb-1">Payment via UPI</p>
                        <p className="text-sm font-mono font-bold text-gray-800">{companyDetails.upiId}</p>
                        <p className="text-[9px] text-gray-500">Scan to pay exact amount</p>
                      </div>
                  </div>

                  {/* Signatory */}
                  <div className="text-center">
                      <div className="h-14 mb-1 flex justify-center items-end px-2 w-[180px] mx-auto">
                        <img src={signImg} alt="Signature" className="h-12 object-contain" />
                      </div>
                      <div className="border-t-2 border-black pt-2 w-full">
                         <p className="text-xs font-bold text-black uppercase tracking-wider">Authorized Signatory</p>
                         <p className="text-[9px] text-gray-500">For, DT Solution</p>
                      </div>
                  </div>
                </div>

                {/* Terms & Footer Strip (The one you liked) */}
                <div className="bg-gray-900 text-white p-4 rounded-lg flex justify-between items-center print:bg-gray-900 print:text-white print-color-adjust:exact">
                   <div className="w-[60%]">
                      <p className="text-[9px] font-bold uppercase text-gray-400 mb-1 tracking-widest">Terms</p>
                      <ul className="text-[9px] text-gray-300 list-disc pl-3 leading-relaxed">
                        {defaultTerms.map((term, i) => <li key={i}>{term}</li>)}
                      </ul>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-bold">dtsolution.in</p>
                      <p className="text-[9px] text-gray-400">{companyDetails.email}</p>
                   </div>
                </div>
              </div>

            </div>
         </div>
      </div>

    </div>
  );
};

export default InvoiceGenerator;