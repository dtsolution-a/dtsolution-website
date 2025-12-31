import { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'react-qr-code';
import { FaPlus, FaPrint, FaTrash, FaCalculator, FaPercentage, FaRupeeSign, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
  const componentRef = useRef(null);

  // --- 1. CSS FOR PAGINATION & WATERMARK ---
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: auto !important; }
      .print-btn { cursor: pointer !important; }
      .custom-cursor { display: none !important; }
      
      /* Print Specific Styles for Multi-page */
      @media print {
        @page { size: A4; margin: 10mm; }
        body { -webkit-print-color-adjust: exact; }
        
        /* Ensure Table Headers Repeat on New Pages */
        thead { display: table-header-group; }
        tfoot { display: table-footer-group; }
        tr { page-break-inside: avoid; }
        
        /* Watermark Persistence */
        .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: -1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // --- UPDATED COMPANY DETAILS ---
  const companyDetails = {
    name: "DT Solution",
    slogan: "Designing your transformation into Success",
    // More detailed address for trust
    address: "G-505, VSH 1, Gota Road,\nAhmedabad - 380060, Gujarat",
    email: "dt.solution.service@gmail.com",
    phone: "+91 70482 77402",
    msme: "UDYAM-GJ-01-0578059",
    upiId: "7048277402@axl" 
  };

  const defaultTerms = [
    "Payment is due within 15 days from the date of invoice.",
    "Late payments may delay future project deliveries",
    "Please quote the Invoice Number when remitting funds.",
  ];

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

  const getDueDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 15);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

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

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { description: '', qty: 1, rate: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `INV_${invoiceData.clientName || 'Client'}_${invoiceData.invoiceNo}`,
  });

  const upiString = `upi://pay?pa=${companyDetails.upiId}&pn=DT%20Solution&am=${totals.total}&cu=INR`;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-6 font-sans">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 max-w-[1200px] mx-auto bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-lg relative z-[9999] print:hidden">
        <h1 className="text-xl font-bold flex items-center gap-2 text-coral">
          <FaCalculator /> Internal Invoice Tool
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
            <FaArrowLeft /> Exit
          </button>
          
          <button 
            onClick={handlePrint}
            className="print-btn bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-coral hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <FaPrint /> Print / Save PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1200px] mx-auto items-start relative z-10">
        
        {/* --- LEFT: EDITOR FORM --- */}
        <div className="w-full lg:w-[400px] bg-[#121212] p-6 rounded-xl border border-white/10 shrink-0 shadow-xl h-[85vh] overflow-y-auto custom-scrollbar print:hidden">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-white/10 pb-2">Details</h2>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-gray-500 uppercase block mb-1">Inv No</label>
                <input 
                  type="text" value={invoiceData.invoiceNo} 
                  onChange={(e) => setInvoiceData({...invoiceData, invoiceNo: e.target.value})} 
                  className="w-full bg-[#0a0a0a] border border-white/20 p-2.5 rounded text-sm text-white focus:border-coral outline-none" 
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase block mb-1">Date</label>
                <input 
                  type="date" value={invoiceData.date} 
                  onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})} 
                  className="w-full bg-[#0a0a0a] border border-white/20 p-2.5 rounded text-sm text-white focus:border-coral outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-500 uppercase block mb-1">Client Name</label>
              <input 
                type="text" placeholder="Client Name" value={invoiceData.clientName} 
                onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} 
                className="w-full bg-[#0a0a0a] border border-white/20 p-2.5 rounded text-sm text-white focus:border-coral outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase block mb-1">Client Address</label>
              <textarea 
                placeholder="Address, City, State" rows="2" value={invoiceData.clientAddress} 
                onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})} 
                className="w-full bg-[#0a0a0a] border border-white/20 p-2.5 rounded text-sm text-white focus:border-coral outline-none resize-none" 
              />
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-gray-500 uppercase">Services</label>
                <button onClick={addItem} className="text-xs text-coral hover:text-white transition flex items-center gap-1 font-bold cursor-pointer"><FaPlus /> Add</button>
              </div>
              
              <div className="space-y-3 mb-4">
                {items.map((item, i) => (
                  <div key={i} className="bg-[#1a1a1a] p-3 rounded border border-white/5 relative group hover:border-white/20 transition-colors">
                    <input 
                      type="text" placeholder="Description" 
                      value={item.description} onChange={(e) => handleItemChange(i, 'description', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 mb-2 pb-1 outline-none text-sm font-medium"
                    />
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
                   <input 
                     type="number" value={discountValue} onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)} 
                     className="flex-1 bg-[#0a0a0a] border border-white/10 p-1.5 rounded text-xs text-right outline-none text-white" 
                     placeholder="0"
                   />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: PREVIEW CONTAINER (Center) --- */}
        <div className="flex-1 flex justify-center bg-gray-800 p-8 rounded-xl overflow-hidden border border-white/5 print:bg-white print:p-0 print:border-none print:w-full print:h-full">
          
          {/* THE ACTUAL A4 INVOICE */}
          <div 
            ref={componentRef} 
            className="bg-white text-black w-[210mm] min-h-[297mm] h-auto p-[15mm] relative shadow-2xl overflow-visible"
            style={{ fontFamily: "'Inter', sans-serif" }} 
          >
            {/* --- WATERMARK (FIXED POSITION FOR MULTI-PAGE) --- */}
            <div className="watermark fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
               <img 
                 src={dtsLogo} 
                 alt="Watermark" 
                 className="w-[500px] opacity-[0.06] object-contain" 
               />
            </div>

            {/* --- MAIN CONTENT (Z-10 to stay above watermark) --- */}
            <div className="relative z-10 h-full flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
                <div className="flex flex-col items-start">
                    <img src={dtsLogo} alt="DTS Logo" className="h-20 w-auto object-contain mb-3" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">{companyDetails.slogan}</p>
                </div>
                <div className="text-right">
                  <h1 className="text-5xl font-extralight text-gray-300 uppercase tracking-widest leading-none mb-2">Invoice</h1>
                  <p className="font-bold text-lg text-black">#{invoiceData.invoiceNo}</p>
                  
                  <div className="mt-2 text-right">
                    <p className="text-xs text-gray-500">Date: <span className="text-black font-medium">{new Date(invoiceData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                    <p className="text-xs text-red-500 font-bold mt-1">Due Date: {getDueDate(invoiceData.date)}</p>
                  </div>
                </div>
              </div>

              {/* Billing Info */}
              <div className="flex justify-between mb-12 gap-8">
                <div className="w-[45%]">
                  <p className="text-[10px] font-bold uppercase text-[#FF5A36] mb-3 tracking-widest border-b border-[#FF5A36]/20 pb-1 inline-block">Billed To</p>
                  <p className="font-bold text-xl text-black leading-tight mb-2">{invoiceData.clientName || 'Client Name'}</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed opacity-80">{invoiceData.clientAddress || 'Address details...'}</p>
                </div>
                <div className="w-[45%] text-right">
                  <p className="text-[10px] font-bold uppercase text-[#FF5A36] mb-3 tracking-widest border-b border-[#FF5A36]/20 pb-1 inline-block">Billed By</p>
                  <p className="font-bold text-base text-black mb-1">{companyDetails.name}</p>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{companyDetails.address}</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-gray-500">P: {companyDetails.phone}</p>
                  </div>
                  <div className="mt-3">
                    <span className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-[10px] font-bold text-gray-600">
                      MSME: {companyDetails.msme}
                    </span>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="mb-8 flex-grow">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="py-3 pl-4 pr-4 text-left text-[11px] font-bold uppercase tracking-wider w-[50%] rounded-l-sm">Description</th>
                      <th className="py-3 px-4 text-center text-[11px] font-bold uppercase tracking-wider">Qty</th>
                      <th className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-wider">Rate</th>
                      <th className="py-3 pl-4 pr-4 text-right text-[11px] font-bold uppercase tracking-wider rounded-r-sm">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
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
              <div className="flex justify-end mb-8 page-break-inside-avoid">
                <div className="w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                    <span className="text-sm font-bold text-gray-800">₹{totals.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {totals.discountAmt > 0 && (
                    <div className="flex justify-between mb-2 text-red-500">
                      <span className="text-sm font-medium">
                        Discount {discountType === 'percent' ? `(${discountValue}%)` : ''}
                      </span>
                      <span className="text-sm font-bold">- ₹{totals.discountAmt.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="h-px bg-gray-200 my-3"></div>
                  
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-lg font-bold text-black">Total Due</span>
                    <span className="text-xl font-bold text-[#FF5A36]">₹{totals.total.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="text-right mt-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                      {numToWords(totals.total)} Rupees Only
                    </p>
                  </div>
                </div>
              </div>

              {/* FOOTER AREA */}
              <div className="page-break-inside-avoid">
                {/* Signatory */}
                <div className="flex justify-end mb-6">
                  <div className="text-center">
                      <div className="h-16 mb-1 flex justify-center items-end border-b-2 border-black pb-2 px-2 w-[200px] mx-auto">
                        <img src={signImg} alt="Signature" className="h-12 object-contain opacity-90" />
                      </div>
                      <p className="text-sm font-bold text-black mt-2">Authorized Signatory</p>
                      <p className="text-[10px] text-gray-500">DT Solution</p>
                  </div>
                </div>

                <div className="flex justify-between items-end pb-4 border-t border-gray-200 pt-6">
                  {/* QR Code */}
                  <div className="flex gap-5 items-end">
                      <div className="bg-white p-1 border border-gray-200 rounded-lg shadow-sm">
                        <QRCode value={upiString} size={80} fgColor="#000" level="Q" />
                      </div>
                      <div className="pb-1">
                        <p className="text-[10px] font-bold uppercase text-[#FF5A36] tracking-widest mb-1">Payment</p>
                        <p className="text-sm font-bold text-black">{companyDetails.upiId}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Scan to pay exact amount</p>
                      </div>
                  </div>

                  {/* Terms */}
                  <div className="w-[45%] text-right">
                      <p className="text-[10px] font-bold uppercase text-gray-600 mb-2 tracking-widest">Terms & Conditions</p>
                      <ul className="text-[9px] text-gray-800 leading-relaxed list-none font-medium">
                        {defaultTerms.map((term, i) => <li key={i} className="mb-0.5">{term}</li>)}
                      </ul>
                  </div>
                </div>
                
                {/* Footer Strip */}
                <div className="border-t-2 border-[#FF5A36] mt-2 pt-3 flex justify-between items-center">
                  <p className="text-[10px] text-gray-500">
                    For any enquiry, email us at <span className="text-black font-bold">{companyDetails.email}</span>
                  </p>
                  <p className="text-[9px] text-gray-400">Page 1 of 1</p>
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