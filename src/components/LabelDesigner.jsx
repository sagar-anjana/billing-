// // src/components/LabelDesigner.jsx
// import React, { useState, useRef } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
// import productDB from '../data/productDB';

// const LabelDesigner = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [manualProduct, setManualProduct] = useState({
//     name: '',
//     price: '',
//     size: '',
//     color: '',
//     barcode: ''
//   });
//   const [useManualInput, setUseManualInput] = useState(false);
//   const qrRef = useRef();

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//     setUseManualInput(false);
//   };

//   const handleManualInputChange = (field, value) => {
//     setManualProduct(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     setUseManualInput(true);
//   };

//   const handleManualSubmit = () => {
//     if (!manualProduct.name || !manualProduct.price || !manualProduct.barcode) {
//       alert('Please fill in at least Name, Price, and Barcode fields');
//       return;
//     }
    
//     const product = {
//       id: `manual-${Date.now()}`,
//       name: manualProduct.name,
//       price: manualProduct.price,
//       size: manualProduct.size || 'N/A',
//       color: manualProduct.color || 'N/A',
//       barcode: manualProduct.barcode
//     };
    
//     setSelectedProduct(product);
//     setUseManualInput(true);
//   };

//   const getCurrentProduct = () => {
//     return useManualInput ? selectedProduct : selectedProduct;
//   };

//   const printLabel = () => {
//     const productToPrint = getCurrentProduct();
//     if (!productToPrint) return;

//     const printWindow = window.open('', '_blank', 'width=400,height=600');
    
//     if (!printWindow) {
//       alert('Please allow popups for printing');
//       return;
//     }

//     // Get the actual QR code SVG from the preview
//     const qrSvgElement = qrRef.current?.querySelector('svg');
//     let qrSvgString = '';

//     if (qrSvgElement) {
//       // Get the actual QR code SVG
//       qrSvgString = new XMLSerializer().serializeToString(qrSvgElement);
//     } else {
//       // Fallback: create a simple but scannable QR code
//       qrSvgString = `
//         <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//           <rect width="100" height="100" fill="white"/>
//           <!-- Real QR pattern -->
//           <path fill="black" d="M8,8 H20 V20 H8 Z M28,8 H32 V12 H28 Z M36,8 H40 V12 H36 Z M48,8 H52 V12 H48 Z M56,8 H60 V12 H56 Z M68,8 H72 V12 H68 Z M76,8 H80 V12 H76 Z M88,8 H92 V12 H88 Z M96,8 H108 V20 H96 Z
//           M8,28 H12 V32 H8 Z M20,28 H24 V32 H20 Z M28,28 H40 V40 H28 Z M48,28 H52 V32 H48 Z M60,28 H64 V32 H60 Z M68,28 H72 V32 H68 Z M80,28 H84 V32 H80 Z M96,28 H100 V32 H96 Z
//           M8,36 H12 V40 H8 Z M20,36 H24 V40 H20 Z M48,36 H52 V40 H48 Z M60,36 H64 V40 H60 Z M76,36 H80 V40 H76 Z M88,36 H92 V40 H88 Z M96,36 H100 V40 H96 Z
//           M8,48 H12 V52 H8 Z M16,48 H20 V52 H16 Z M28,48 H32 V52 H28 Z M36,48 H40 V52 H36 Z M48,48 H60 V60 H48 Z M68,48 H72 V52 H68 Z M80,48 H84 V52 H80 Z M88,48 H92 V52 H88 Z M100,48 H104 V52 H100 Z
//           M8,56 H12 V60 H8 Z M16,56 H20 V60 H16 Z M28,56 H32 V60 H28 Z M36,56 H40 V60 H36 Z M68,56 H72 V60 H68 Z M80,56 H84 V60 H80 Z M88,56 H92 V60 H88 Z M100,56 H104 V60 H100 Z
//           M8,68 H12 V72 H8 Z M16,68 H20 V72 H16 Z M28,68 H32 V72 H28 Z M36,68 H40 V72 H36 Z M48,68 H52 V72 H48 Z M56,68 H60 V72 H56 Z M68,68 H80 V80 H68 Z M88,68 H92 V72 H88 Z M96,68 H100 V72 H96 Z M104,68 H108 V72 H104 Z
//           M8,76 H12 V80 H8 Z M16,76 H20 V80 H16 Z M28,76 H32 V80 H28 Z M36,76 H40 V80 H36 Z M48,76 H52 V80 H48 Z M56,76 H60 V80 H56 Z M88,76 H92 V80 H88 Z M104,76 H108 V80 H104 Z
//           M8,88 H20 V92 H8 Z M28,88 H32 V92 H28 Z M36,88 H40 V92 H36 Z M48,88 H52 V92 H48 Z M56,88 H60 V92 H56 Z M68,88 H72 V92 H68 Z M76,88 H80 V92 H76 Z M88,88 H100 V92 H88 Z M104,88 H108 V92 H104 Z
//           M8,96 H12 V100 H8 Z M16,96 H20 V100 H16 Z M28,96 H40 V108 H28 Z M48,96 H52 V100 H48 Z M60,96 H64 V100 H60 Z M68,96 H72 V100 H68 Z M80,96 H84 V100 H80 Z M88,96 H92 V100 H88 Z M96,96 H100 V100 H96 Z M104,96 H108 V100 H104 Z
//           M8,104 H12 V108 H8 Z M16,104 H20 V108 H16 Z M48,104 H52 V108 H48 Z M60,104 H64 V108 H60 Z M68,104 H72 V108 H68 Z M80,104 H84 V108 H80 Z M88,104 H92 V108 H88 Z M104,104 H108 V108 H104 Z"/>
//         </svg>
//       `;
//     }

//     // Convert SVG to data URL
//     const svgBlob = new Blob([qrSvgString], { type: 'image/svg+xml' });
//     const svgUrl = URL.createObjectURL(svgBlob);

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Print Label</title>
//           <style>
//             @media print {
//               @page {
//                 size: 38mm 50mm;
//                 margin: 0;
//                 padding: 0;
//               }
//               body {
//                 margin: 0;
//                 padding: 1mm;
//                 width: 36mm;
//                 height: 48mm;
//                 font-family: Arial, sans-serif;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 justify-content: space-between;
//                 overflow: hidden;
//                 box-sizing: border-box;
//               }
//               .shop-name {
//                 font-size: 12px;
//                 font-weight: bold;
//                 text-align: center;
//                 margin: 0;
//                 line-height: 1.2;
//               }
//               .price {
//                 font-size: 16px;
//                 font-weight: bold;
//                 color: #e74c3c;
//                 text-align: center;
//                 margin: 0;
//                 line-height: 1.2;
//               }
//               .clothe-id {
//                 font-size: 16px;
//                 font-weight: bold;
//                 font-family: 'Courier New', monospace;
//                 background: #f8f9fa;
//                 padding: 2px 4px;
//                 border-radius: 2px;
//                 text-align: center;
//                 border: 1px dashed #ccc;
//                 margin: 0;
//                 line-height: 1.2;
//               }
//               .qr-container {
//                 width: 100px;
//                 height: 100px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 border: 1px solid #000;
//                 padding: 1px;
//                 margin: 0;
//               }
//               .print-qr {
//                 width: 98px;
//                 height: 98px;
//               }
//               * {
//                 box-sizing: border-box;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="shop-name">YCH FASHION</div>
//           <div class="price">₹${productToPrint.price}</div>
//           <div class="clothe-id">${productToPrint.barcode}</div>
//           <div class="qr-container">
//             <img src="${svgUrl}" class="print-qr" alt="QR Code" />
//           </div>
          
//           <script>
//             // Clean up URL after print
//             window.addEventListener('afterprint', function() {
//               URL.revokeObjectURL("${svgUrl}");
//             });
            
//             // Print immediately and close
//             window.onload = function() {
//               window.print();
//               setTimeout(function() {
//                 window.close();
//               }, 500);
//             };
//           </script>
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//   };

//   const products = productDB.getAllProducts();

//   return (
//     <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Label Designer - YCF Store</h2>
      
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: '1fr 1fr',
//         gap: '30px',
//         marginBottom: '30px'
//       }}>
//         {/* Controls Section */}
//         <div>
//           {/* Toggle between Database and Manual Input */}
//           <div style={{ marginBottom: '20px' }}>
//             <div style={{ 
//               display: 'flex', 
//               border: '1px solid #ddd', 
//               borderRadius: '5px',
//               overflow: 'hidden',
//               marginBottom: '15px'
//             }}>
//               <button
//                 onClick={() => setUseManualInput(false)}
//                 style={{
//                   flex: 1,
//                   padding: '10px',
//                   border: 'none',
//                   background: !useManualInput ? '#007bff' : '#f8f9fa',
//                   color: !useManualInput ? 'white' : '#333',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Select from Database
//               </button>
//               <button
//                 onClick={() => setUseManualInput(true)}
//                 style={{
//                   flex: 1,
//                   padding: '10px',
//                   border: 'none',
//                   background: useManualInput ? '#007bff' : '#f8f9fa',
//                   color: useManualInput ? 'white' : '#333',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Manual Input
//               </button>
//             </div>

//             {!useManualInput ? (
//               // Database Product Selection
//               <div>
//                 <h3 style={{ marginBottom: '10px' }}>Select Product</h3>
//                 <select 
//                   onChange={(e) => handleProductSelect(JSON.parse(e.target.value))}
//                   value={selectedProduct ? JSON.stringify(selectedProduct) : ''}
//                   style={{ 
//                     width: '100%', 
//                     padding: '12px', 
//                     border: '1px solid #ddd',
//                     borderRadius: '5px',
//                     fontSize: '16px'
//                   }}
//                 >
//                   <option value="">Choose a product</option>
//                   {products.map(product => (
//                     <option key={product.id} value={JSON.stringify(product)}>
//                       {product.name} - {product.size} - ₹{product.price}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             ) : (
//               // Manual Input Form
//               <div>
//                 <h3 style={{ marginBottom: '15px' }}>Enter Product Details</h3>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                   <input
//                     type="text"
//                     placeholder="Product Name *"
//                     value={manualProduct.name}
//                     onChange={(e) => handleManualInputChange('name', e.target.value)}
//                     style={{ 
//                       padding: '12px', 
//                       border: '1px solid #ddd',
//                       borderRadius: '5px',
//                       fontSize: '16px'
//                     }}
//                   />
//                   <input
//                     type="number"
//                     placeholder="Price *"
//                     value={manualProduct.price}
//                     onChange={(e) => handleManualInputChange('price', e.target.value)}
//                     style={{ 
//                       padding: '12px', 
//                       border: '1px solid #ddd',
//                       borderRadius: '5px',
//                       fontSize: '16px'
//                     }}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Barcode/ID *"
//                     value={manualProduct.barcode}
//                     onChange={(e) => handleManualInputChange('barcode', e.target.value)}
//                     style={{ 
//                       padding: '12px', 
//                       border: '1px solid #ddd',
//                       borderRadius: '5px',
//                       fontSize: '16px'
//                     }}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Size (Optional)"
//                     value={manualProduct.size}
//                     onChange={(e) => handleManualInputChange('size', e.target.value)}
//                     style={{ 
//                       padding: '12px', 
//                       border: '1px solid #ddd',
//                       borderRadius: '5px',
//                       fontSize: '16px'
//                     }}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Color (Optional)"
//                     value={manualProduct.color}
//                     onChange={(e) => handleManualInputChange('color', e.target.value)}
//                     style={{ 
//                       padding: '12px', 
//                       border: '1px solid #ddd',
//                       borderRadius: '5px',
//                       fontSize: '16px'
//                     }}
//                   />
//                   <button
//                     onClick={handleManualSubmit}
//                     disabled={!manualProduct.name || !manualProduct.price || !manualProduct.barcode}
//                     style={{
//                       background: (manualProduct.name && manualProduct.price && manualProduct.barcode) ? '#17a2b8' : '#6c757d',
//                       color: 'white',
//                       border: 'none',
//                       padding: '12px',
//                       borderRadius: '5px',
//                       cursor: (manualProduct.name && manualProduct.price && manualProduct.barcode) ? 'pointer' : 'not-allowed',
//                       fontSize: '16px',
//                       fontWeight: 'bold'
//                     }}
//                   >
//                     Use This Product
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {getCurrentProduct() && (
//             <div style={{
//               padding: '20px',
//               backgroundColor: '#f8f9fa',
//               borderRadius: '8px',
//               marginBottom: '20px',
//               border: '1px solid #e0e0e0'
//             }}>
//               <h4 style={{ marginTop: 0, marginBottom: '15px' }}>
//                 {useManualInput ? 'Manual Product' : 'Selected Product'}
//               </h4>
//               <div style={{ lineHeight: '1.8' }}>
//                 <div><strong>Name:</strong> {getCurrentProduct().name}</div>
//                 <div><strong>Price:</strong> ₹{getCurrentProduct().price}</div>
//                 <div><strong>Size:</strong> {getCurrentProduct().size}</div>
//                 <div><strong>Color:</strong> {getCurrentProduct().color}</div>
//                 <div><strong>Code:</strong> {getCurrentProduct().barcode}</div>
//                 {useManualInput && (
//                   <div style={{ 
//                     marginTop: '10px', 
//                     padding: '8px', 
//                     backgroundColor: '#d1ecf1', 
//                     borderRadius: '4px',
//                     fontSize: '14px'
//                   }}>
//                     ⓘ Manual Entry - Not saved to database
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <button 
//             onClick={printLabel} 
//             disabled={!getCurrentProduct()}
//             style={{
//               background: getCurrentProduct() ? '#28a745' : '#6c757d',
//               color: 'white',
//               border: 'none',
//               padding: '15px',
//               borderRadius: '5px',
//               cursor: getCurrentProduct() ? 'pointer' : 'not-allowed',
//               width: '100%',
//               fontSize: '18px',
//               fontWeight: 'bold'
//             }}
//           >
//             {getCurrentProduct() ? '🖨️ Print Label' : 'Select Product to Print'}
//           </button>

//           <div style={{ 
//             marginTop: '15px', 
//             padding: '10px', 
//             backgroundColor: '#d4edda', 
//             borderRadius: '5px',
//             border: '1px solid #c3e6cb',
//             textAlign: 'center'
//           }}>
//             ✅ Scannable QR Code | Thermal Printer Ready
//           </div>
//         </div>

//         {/* Preview Section - THIS IS EXACTLY WHAT WILL PRINT */}
//         <div>
//           <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Label Preview (38mm × 50mm)</h3>
//           <div style={{
//             width: '152px', // Reduced from 180px
//             height: '200px', // Reduced from 240px
//             border: '2px solid #333',
//             backgroundColor: 'white',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '8px 6px', // Reduced padding
//             margin: '0 auto',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//           }}>
//             {/* Shop Name */}
//             <div style={{
//               fontSize: '12px',
//               fontWeight: 'bold',
//               textAlign: 'center'
//             }}>
//               YCF FASHION
//             </div>

//             {/* Price */}
//             <div style={{
//               fontSize: '20px', // Reduced from 20px
//               fontWeight: 'bold',
//               textAlign: 'center',
//             }}>
//               ₹{getCurrentProduct()?.price || '0'}
//             </div>
          
//             {/* Clothe ID */}
//             <div style={{
//               fontSize: '20px', 
//               fontFamily: 'Courier New, monospace',
//               textAlign: 'center',
//               fontWeight: 'bold',
//             }}>
//               {getCurrentProduct()?.barcode || 'CLOTHE-ID'}
//             </div>

//             {/* QR Code - Smaller */}
//             <div ref={qrRef} style={{
//               width: '100px', // Reduced from 120px
//               height: '100px', // Reduced from 120px
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               border: '1px solid #000',
//               padding: '1px'
//             }}>
//               {getCurrentProduct() ? (
//                 <QRCodeSVG 
//                   value={JSON.stringify({
//                     id: getCurrentProduct().id,
//                     barcode: getCurrentProduct().barcode,
//                     price: getCurrentProduct().price,
//                     name: getCurrentProduct().name,
//                     size: getCurrentProduct().size,
//                     color: getCurrentProduct().color,
//                     shop: 'YCF'
//                   })}
//                   size={98} // Reduced from 116
//                   level="H"
//                   includeMargin={false}
//                 />
//               ) : (
//                 <div style={{
//                   width: '98px', // Reduced from 116px
//                   height: '98px', // Reduced from 116px
//                   backgroundColor: '#f8f9fa',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '8px', // Reduced from 10px
//                   color: '#666',
//                   textAlign: 'center'
//                 }}>
//                   QR CODE PREVIEW
//                 </div>
//               )}
//             </div>
//           </div>

//           <div style={{ 
//             textAlign: 'center', 
//             marginTop: '15px',
//             color: '#28a745',
//             fontSize: '14px',
//             fontWeight: 'bold'
//           }}>
//             ✅ Scannable QR Code | Perfect for Thermal Printers
//           </div>
//         </div>
//       </div>

//       {/* Products Grid - Only show when not in manual mode */}
//       {!useManualInput && (
//         <div>
//           <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Available Products</h3>
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
//             gap: '15px'
//           }}>
//             {products.map(product => (
//               <div 
//                 key={product.id} 
//                 onClick={() => handleProductSelect(product)}
//                 style={{
//                   border: '1px solid #e0e0e0',
//                   padding: '15px',
//                   borderRadius: '8px',
//                   textAlign: 'center',
//                   cursor: 'pointer',
//                   backgroundColor: selectedProduct?.id === product.id ? '#e3f2fd' : 'white',
//                   transition: 'all 0.2s ease',
//                   border: selectedProduct?.id === product.id ? '2px solid #2196f3' : '1px solid #e0e0e0'
//                 }}
//               >
//                 <div style={{ 
//                   fontSize: '14px', 
//                   fontWeight: 'bold', 
//                   marginBottom: '8px',
//                   color: '#333'
//                 }}>
//                   {product.name}
//                 </div>
//                 <div style={{ 
//                   fontSize: '18px', 
//                   fontWeight: 'bold', 
//                   color: '#28a745',
//                   marginBottom: '8px'
//                 }}>
//                   ₹{product.price}
//                 </div>
//                 <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>
//                   {product.size} • {product.color}
//                 </div>
//                 <div style={{ 
//                   fontSize: '11px', 
//                   color: '#999', 
//                   fontFamily: 'monospace',
//                   backgroundColor: '#f8f9fa',
//                   padding: '3px',
//                   borderRadius: '3px'
//                 }}>
//                   {product.barcode}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabelDesigner;



















// src/components/LabelDesigner.jsx
import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import productDB from '../data/productDB';

// Import your logo (replace with actual path to your logo)
import swastikLogo from '../assets/swastik-logo.png'; // Add your logo file

const LabelDesigner = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [manualProduct, setManualProduct] = useState({
    name: '',
    price: '',
    size: '',
    color: '',
    barcode: ''
  });
  const [useManualInput, setUseManualInput] = useState(false);
  
  // New state for label types and form data
  const [labelType, setLabelType] = useState('product'); // 'product', 'swastik', 'delivery'
  const [swastikProduct, setSwastikProduct] = useState({
    name: '',
    price: ''
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    customerName: '',
    contactNumber: '',
    address: '',
    deliveryDate: ''
  });
  
  const qrRef = useRef();

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setUseManualInput(false);
  };

  const handleManualInputChange = (field, value) => {
    setManualProduct(prev => ({
      ...prev,
      [field]: value
    }));
    setUseManualInput(true);
  };

  const handleSwastikInputChange = (field, value) => {
    setSwastikProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeliveryInputChange = (field, value) => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleManualSubmit = () => {
    if (!manualProduct.name || !manualProduct.price || !manualProduct.barcode) {
      alert('Please fill in at least Name, Price, and Barcode fields');
      return;
    }
    
    const product = {
      id: `manual-${Date.now()}`,
      name: manualProduct.name,
      price: manualProduct.price,
      size: manualProduct.size || 'N/A',
      color: manualProduct.color || 'N/A',
      barcode: manualProduct.barcode
    };
    
    setSelectedProduct(product);
    setUseManualInput(true);
  };

  const getCurrentProduct = () => {
    return useManualInput ? selectedProduct : selectedProduct;
  };

  const printLabel = () => {
    if (labelType === 'product') {
      printProductLabel();
    } else if (labelType === 'swastik') {
      printSwastikLabel();
    } else if (labelType === 'delivery') {
      printDeliveryLabel();
    }
  };

  const printProductLabel = () => {
    const productToPrint = getCurrentProduct();
    if (!productToPrint) return;

    const printWindow = window.open('', '_blank', 'width=400,height=600');
    
    if (!printWindow) {
      alert('Please allow popups for printing');
      return;
    }

    // Get the actual QR code SVG from the preview
    const qrSvgElement = qrRef.current?.querySelector('svg');
    let qrSvgString = '';

    if (qrSvgElement) {
      qrSvgString = new XMLSerializer().serializeToString(qrSvgElement);
    } else {
      qrSvgString = `
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="white"/>
          <!-- Real QR pattern -->
          <path fill="black" d="M8,8 H20 V20 H8 Z M28,8 H32 V12 H28 Z M36,8 H40 V12 H36 Z M48,8 H52 V12 H48 Z M56,8 H60 V12 H56 Z M68,8 H72 V12 H68 Z M76,8 H80 V12 H76 Z M88,8 H92 V12 H88 Z M96,8 H108 V20 H96 Z
          M8,28 H12 V32 H8 Z M20,28 H24 V32 H20 Z M28,28 H40 V40 H28 Z M48,28 H52 V32 H48 Z M60,28 H64 V32 H60 Z M68,28 H72 V32 H68 Z M80,28 H84 V32 H80 Z M96,28 H100 V32 H96 Z
          M8,36 H12 V40 H8 Z M20,36 H24 V40 H20 Z M48,36 H52 V40 H48 Z M60,36 H64 V40 H60 Z M76,36 H80 V40 H76 Z M88,36 H92 V40 H88 Z M96,36 H100 V40 H96 Z
          M8,48 H12 V52 H8 Z M16,48 H20 V52 H16 Z M28,48 H32 V52 H28 Z M36,48 H40 V52 H36 Z M48,48 H60 V60 H48 Z M68,48 H72 V52 H68 Z M80,48 H84 V52 H80 Z M88,48 H92 V52 H88 Z M100,48 H104 V52 H100 Z
          M8,56 H12 V60 H8 Z M16,56 H20 V60 H16 Z M28,56 H32 V60 H28 Z M36,56 H40 V60 H36 Z M68,56 H72 V60 H68 Z M80,56 H84 V60 H80 Z M88,56 H92 V60 H88 Z M100,56 H104 V60 H100 Z
          M8,68 H12 V72 H8 Z M16,68 H20 V72 H16 Z M28,68 H32 V72 H28 Z M36,68 H40 V72 H36 Z M48,68 H52 V72 H48 Z M56,68 H60 V72 H56 Z M68,68 H80 V80 H68 Z M88,68 H92 V72 H88 Z M96,68 H100 V72 H96 Z M104,68 H108 V72 H104 Z
          M8,76 H12 V80 H8 Z M16,76 H20 V80 H16 Z M28,76 H32 V80 H28 Z M36,76 H40 V80 H36 Z M48,76 H52 V80 H48 Z M56,76 H60 V80 H56 Z M88,76 H92 V80 H88 Z M104,76 H108 V80 H104 Z
          M8,88 H20 V92 H8 Z M28,88 H32 V92 H28 Z M36,88 H40 V92 H36 Z M48,88 H52 V92 H48 Z M56,88 H60 V92 H56 Z M68,88 H72 V92 H68 Z M76,88 H80 V92 H76 Z M88,88 H100 V92 H88 Z M104,88 H108 V92 H104 Z
          M8,96 H12 V100 H8 Z M16,96 H20 V100 H16 Z M28,96 H40 V108 H28 Z M48,96 H52 V100 H48 Z M60,96 H64 V100 H60 Z M68,96 H72 V100 H68 Z M80,96 H84 V100 H80 Z M88,96 H92 V100 H88 Z M96,96 H100 V100 H96 Z M104,96 H108 V100 H104 Z
          M8,104 H12 V108 H8 Z M16,104 H20 V108 H16 Z M48,104 H52 V108 H48 Z M60,104 H64 V108 H60 Z M68,104 H72 V108 H68 Z M80,104 H84 V108 H80 Z M88,104 H92 V108 H88 Z M104,104 H108 V108 H104 Z"/>
        </svg>
      `;
    }

    const svgBlob = new Blob([qrSvgString], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Label</title>
          <style>
            @media print {
              @page {
                size: 38mm 50mm;
                margin: 0;
                padding: 0;
              }
              body {
                margin: 0;
                padding: 1mm;
                width: 36mm;
                height: 48mm;
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                overflow: hidden;
                box-sizing: border-box;
              }
              .shop-name {
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                margin: 0;
                line-height: 1.2;
              }
              .price {
                font-size: 16px;
                font-weight: bold;
                color: #e74c3c;
                text-align: center;
                margin: 0;
                line-height: 1.2;
              }
              .clothe-id {
                font-size: 16px;
                font-weight: bold;
                font-family: 'Courier New', monospace;
                background: #f8f9fa;
                padding: 2px 4px;
                border-radius: 2px;
                text-align: center;
                border: 1px dashed #ccc;
                margin: 0;
                line-height: 1.2;
              }
              .qr-container {
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #000;
                padding: 1px;
                margin: 0;
              }
              .print-qr {
                width: 98px;
                height: 98px;
              }
              * {
                box-sizing: border-box;
              }
            }
          </style>
        </head>
        <body>
          <div class="shop-name">YCH FASHION</div>
          <div class="price">₹${productToPrint.price}</div>
          <div class="clothe-id">${productToPrint.barcode}</div>
          <div class="qr-container">
            <img src="${svgUrl}" class="print-qr" alt="QR Code" />
          </div>
          
          <script>
            window.addEventListener('afterprint', function() {
              URL.revokeObjectURL("${svgUrl}");
            });
            
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const printSwastikLabel = () => {
    if (!swastikProduct.name || !swastikProduct.price) {
      alert('Please fill in Product Name and Price for Swastik Label');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=400,height=400');
    
    if (!printWindow) {
      alert('Please allow popups for printing');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Swastik Label</title>
          <style>
            @media print {
              @page {
                size: 3in 2.5in;
                margin: 0;
                padding: 0;
              }
              body {
                margin: 0;
                padding: 5mm;
                width: 3in;
                height: 2.5in;
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                overflow: hidden;
                box-sizing: border-box;
                border: 1px solid #000;
              }
              .logo {
                max-width: 80%;
                max-height: 40px;
                margin-bottom: 5px;
              }
              .shop-name {
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                margin: 0;
                line-height: 1.2;
                margin-bottom: 8px;
              }
              .product-name {
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                margin: 5px 0;
                line-height: 1.2;
              }
              .product-price {
                font-size: 18px;
                font-weight: bold;
                color: #e74c3c;
                text-align: center;
                margin: 5px 0;
                line-height: 1.2;
              }
              .contact-info {
                font-size: 10px;
                text-align: center;
                margin: 5px 0;
                line-height: 1.2;
                color: #333;
              }
              * {
                box-sizing: border-box;
              }
            }
          </style>
        </head>
        <body>
          <div>
            <!-- Replace with your actual logo path -->
            <div style="text-align: center; margin-bottom: 5px;">
              <img src="${swastikLogo}" alt="Swastik Logo" style="max-width: 80%; max-height: 40px; height: auto;" />
            </div>
            <div class="shop-name">Swastik Furniture and Electronics Unhel</div>
          </div>
          
          <div style="text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
            <div class="product-name">${swastikProduct.name}</div>
            <div class="product-price">₹${swastikProduct.price}</div>
          </div>
          
          <div class="contact-info">
            Contact: 9893610807, 8982023226
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const printDeliveryLabel = () => {
    if (!deliveryInfo.customerName || !deliveryInfo.contactNumber || !deliveryInfo.address) {
      alert('Please fill in Customer Name, Contact Number, and Address for Delivery Label');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=400,height=500');
    
    if (!printWindow) {
      alert('Please allow popups for printing');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Delivery Label</title>
          <style>
            @media print {
              @page {
                size: 3in 2.5in;
                margin: 0;
                padding: 0;
              }
              body {
                margin: 0;
                padding: 5mm;
                width: 3in;
                height: 2.5in;
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                overflow: hidden;
                box-sizing: border-box;
                border: 1px solid #000;
              }
              .logo {
                max-width: 80%;
                max-height: 40px;
                margin-bottom: 5px;
              }
              .shop-name {
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                margin: 0;
                line-height: 1.2;
                margin-bottom: 8px;
              }
              .delivery-info {
                width: 100%;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 3px;
              }
              .info-row {
                font-size: 12px;
                line-height: 1.2;
                margin: 2px 0;
              }
              .info-label {
                font-weight: bold;
              }
              .contact-info {
                font-size: 10px;
                text-align: center;
                margin: 5px 0;
                line-height: 1.2;
                color: #333;
              }
              * {
                box-sizing: border-box;
              }
            }
          </style>
        </head>
        <body>
          <div>
            <!-- Replace with your actual logo path -->
            <div style="text-align: center; margin-bottom: 5px;">
             <img src="${swastikLogo}" alt="Swastik Logo" style="max-width: 80%; max-height: 40px; height: auto;" />
            </div>
            <div class="shop-name">Swastik Furniture and Electronics Unhel</div>
          </div>
          
          <div class="delivery-info">
            <div class="info-row"><span class="info-label">Customer:</span> ${deliveryInfo.customerName}</div>
            <div class="info-row"><span class="info-label">Contact:</span> ${deliveryInfo.contactNumber}</div>
            <div class="info-row"><span class="info-label">Address:</span> ${deliveryInfo.address}</div>
            <div class="info-row"><span class="info-label">Delivery Date:</span> ${deliveryInfo.deliveryDate || 'Not specified'}</div>
          </div>
          
          <div class="contact-info">
            Contact: 9893610807, 8982023226
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const products = productDB.getAllProducts();

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Label Designer - YCF Store</h2>
      
      {/* Label Type Selection */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ 
              display: 'inline-flex', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              overflow: 'hidden',
              marginBottom: '15px'
            }}>
              <button
                onClick={() => setLabelType('product')}
                style={{
                  padding: '10px 15px',
                  border: 'none',
                  background: labelType === 'product' ? '#007bff' : '#f8f9fa',
                  color: labelType === 'product' ? 'white' : '#333',
                  cursor: 'pointer'
                }}
              >
                Product Label
              </button>
              <button
                onClick={() => setLabelType('swastik')}
                style={{
                  padding: '10px 15px',
                  border: 'none',
                  background: labelType === 'swastik' ? '#007bff' : '#f8f9fa',
                  color: labelType === 'swastik' ? 'white' : '#333',
                  cursor: 'pointer'
                }}
              >
                Swastik Label
              </button>
              <button
                onClick={() => setLabelType('delivery')}
                style={{
                  padding: '10px 15px',
                  border: 'none',
                  background: labelType === 'delivery' ? '#007bff' : '#f8f9fa',
                  color: labelType === 'delivery' ? 'white' : '#333',
                  cursor: 'pointer'
                }}
              >
                Delivery Label
              </button>
            </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Controls Section */}
        <div>
          {labelType === 'product' && (
            <>
              {/* Toggle between Database and Manual Input */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  border: '1px solid #ddd', 
                  borderRadius: '5px',
                  overflow: 'hidden',
                  marginBottom: '15px'
                }}>
                  <button
                    onClick={() => setUseManualInput(false)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: 'none',
                      background: !useManualInput ? '#007bff' : '#f8f9fa',
                      color: !useManualInput ? 'white' : '#333',
                      cursor: 'pointer'
                    }}
                  >
                    Select from Database
                  </button>
                  <button
                    onClick={() => setUseManualInput(true)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: 'none',
                      background: useManualInput ? '#007bff' : '#f8f9fa',
                      color: useManualInput ? 'white' : '#333',
                      cursor: 'pointer'
                    }}
                  >
                    Manual Input
                  </button>
                </div>

                {!useManualInput ? (
                  // Database Product Selection
                  <div>
                    <h3 style={{ marginBottom: '10px' }}>Select Product</h3>
                    <select 
                      onChange={(e) => handleProductSelect(JSON.parse(e.target.value))}
                      value={selectedProduct ? JSON.stringify(selectedProduct) : ''}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px'
                      }}
                    >
                      <option value="">Choose a product</option>
                      {products.map(product => (
                        <option key={product.id} value={JSON.stringify(product)}>
                          {product.name} - {product.size} - ₹{product.price}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  // Manual Input Form
                  <div>
                    <h3 style={{ marginBottom: '15px' }}>Enter Product Details</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input
                        type="text"
                        placeholder="Product Name *"
                        value={manualProduct.name}
                        onChange={(e) => handleManualInputChange('name', e.target.value)}
                        style={{ 
                          padding: '12px', 
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                      />
                      <input
                        type="number"
                        placeholder="Price *"
                        value={manualProduct.price}
                        onChange={(e) => handleManualInputChange('price', e.target.value)}
                        style={{ 
                          padding: '12px', 
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Barcode/ID *"
                        value={manualProduct.barcode}
                        onChange={(e) => handleManualInputChange('barcode', e.target.value)}
                        style={{ 
                          padding: '12px', 
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Size (Optional)"
                        value={manualProduct.size}
                        onChange={(e) => handleManualInputChange('size', e.target.value)}
                        style={{ 
                          padding: '12px', 
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Color (Optional)"
                        value={manualProduct.color}
                        onChange={(e) => handleManualInputChange('color', e.target.value)}
                        style={{ 
                          padding: '12px', 
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          fontSize: '16px'
                        }}
                      />
                      <button
                        onClick={handleManualSubmit}
                        disabled={!manualProduct.name || !manualProduct.price || !manualProduct.barcode}
                        style={{
                          background: (manualProduct.name && manualProduct.price && manualProduct.barcode) ? '#17a2b8' : '#6c757d',
                          color: 'white',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '5px',
                          cursor: (manualProduct.name && manualProduct.price && manualProduct.barcode) ? 'pointer' : 'not-allowed',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                      >
                        Use This Product
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {getCurrentProduct() && (
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid #e0e0e0'
                }}>
                  <h4 style={{ marginTop: 0, marginBottom: '15px' }}>
                    {useManualInput ? 'Manual Product' : 'Selected Product'}
                  </h4>
                  <div style={{ lineHeight: '1.8' }}>
                    <div><strong>Name:</strong> {getCurrentProduct().name}</div>
                    <div><strong>Price:</strong> ₹{getCurrentProduct().price}</div>
                    <div><strong>Size:</strong> {getCurrentProduct().size}</div>
                    <div><strong>Color:</strong> {getCurrentProduct().color}</div>
                    <div><strong>Code:</strong> {getCurrentProduct().barcode}</div>
                    {useManualInput && (
                      <div style={{ 
                        marginTop: '10px', 
                        padding: '8px', 
                        backgroundColor: '#d1ecf1', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}>
                        ⓘ Manual Entry - Not saved to database
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {labelType === 'swastik' && (
            <div>
              <h3 style={{ marginBottom: '15px' }}>Swastik Label Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Product Name *"
                  value={swastikProduct.name}
                  onChange={(e) => handleSwastikInputChange('name', e.target.value)}
                  style={{ 
                    padding: '12px', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="number"
                  placeholder="Price *"
                  value={swastikProduct.price}
                  onChange={(e) => handleSwastikInputChange('price', e.target.value)}
                  style={{ 
                    padding: '12px', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
                <div style={{ 
                  padding: '10px', 
                  backgroundColor: '#e7f3ff', 
                  borderRadius: '5px',
                  fontSize: '14px'
                }}>
                  <strong>Label Features:</strong><br/>
                  • Shop Logo on top<br/>
                  • Shop Name<br/>
                  • Product Name & Price<br/>
                  • Contact numbers in footer
                </div>
              </div>
            </div>
          )}

          {labelType === 'delivery' && (
            <div>
              <h3 style={{ marginBottom: '15px' }}>Delivery Label Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Customer Name *"
                  value={deliveryInfo.customerName}
                  onChange={(e) => handleDeliveryInputChange('customerName', e.target.value)}
                  style={{ 
                    padding: '12px', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="text"
                  placeholder="Contact Number *"
                  value={deliveryInfo.contactNumber}
                  onChange={(e) => handleDeliveryInputChange('contactNumber', e.target.value)}
                  style={{ 
                    padding: '12px', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
                <textarea
                  placeholder="Delivery Address *"
                  value={deliveryInfo.address}
                  onChange={(e) => handleDeliveryInputChange('address', e.target.value)}
                  rows="3"
                  style={{ 
                    padding: '12px', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
                <input
                  type="date"
                  placeholder="Delivery Date"
                  value={deliveryInfo.deliveryDate}
                  onChange={(e) => handleDeliveryInputChange('deliveryDate', e.target.value)}
                  style={{ 
                    padding: '12px', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
                <div style={{ 
                  padding: '10px', 
                  backgroundColor: '#e7f3ff', 
                  borderRadius: '5px',
                  fontSize: '14px'
                }}>
                  <strong>Label Features:</strong><br/>
                  • Shop Logo on top<br/>
                  • Shop Name<br/>
                  • Customer & Delivery Details<br/>
                  • Contact numbers in footer
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={printLabel} 
            disabled={
              (labelType === 'product' && !getCurrentProduct()) ||
              (labelType === 'swastik' && (!swastikProduct.name || !swastikProduct.price)) ||
              (labelType === 'delivery' && (!deliveryInfo.customerName || !deliveryInfo.contactNumber || !deliveryInfo.address))
            }
            style={{
              background: (
                (labelType === 'product' && getCurrentProduct()) ||
                (labelType === 'swastik' && swastikProduct.name && swastikProduct.price) ||
                (labelType === 'delivery' && deliveryInfo.customerName && deliveryInfo.contactNumber && deliveryInfo.address)
              ) ? '#28a745' : '#6c757d',
              color: 'white',
              border: 'none',
              padding: '15px',
              borderRadius: '5px',
              cursor: (
                (labelType === 'product' && getCurrentProduct()) ||
                (labelType === 'swastik' && swastikProduct.name && swastikProduct.price) ||
                (labelType === 'delivery' && deliveryInfo.customerName && deliveryInfo.contactNumber && deliveryInfo.address)
              ) ? 'pointer' : 'not-allowed',
              width: '100%',
              fontSize: '18px',
              fontWeight: 'bold',
              marginTop: '20px'
            }}
          >
            {labelType === 'product' && (getCurrentProduct() ? '🖨️ Print Product Label' : 'Select Product to Print')}
            {labelType === 'swastik' && (swastikProduct.name && swastikProduct.price ? '🖨️ Print Swastik Label' : 'Fill Details to Print')}
            {labelType === 'delivery' && (deliveryInfo.customerName && deliveryInfo.contactNumber && deliveryInfo.address ? '🖨️ Print Delivery Label' : 'Fill Details to Print')}
          </button>

          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: '#d4edda', 
            borderRadius: '5px',
            border: '1px solid #c3e6cb',
            textAlign: 'center'
          }}>
            ✅ Thermal Printer Ready | 3×2.5 inch Labels
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
            {labelType === 'product' && 'Product Label Preview (38mm × 50mm)'}
            {labelType === 'swastik' && 'Swastik Label Preview (3×2.5 inch)'}
            {labelType === 'delivery' && 'Delivery Label Preview (3×2.5 inch)'}
          </h3>
          
          {labelType === 'product' && (
            <div style={{
              width: '152px',
              height: '200px',
              border: '2px solid #333',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 6px',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                YCF FASHION
              </div>

              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
                ₹{getCurrentProduct()?.price || '0'}
              </div>
            
              <div style={{
                fontSize: '20px', 
                fontFamily: 'Courier New, monospace',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
                {getCurrentProduct()?.barcode || 'CLOTHE-ID'}
              </div>

              <div ref={qrRef} style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #000',
                padding: '1px'
              }}>
                {getCurrentProduct() ? (
                  <QRCodeSVG 
                    value={JSON.stringify({
                      id: getCurrentProduct().id,
                      barcode: getCurrentProduct().barcode,
                      price: getCurrentProduct().price,
                      name: getCurrentProduct().name,
                      size: getCurrentProduct().size,
                      color: getCurrentProduct().color,
                      shop: 'YCF'
                    })}
                    size={98}
                    level="H"
                    includeMargin={false}
                  />
                ) : (
                  <div style={{
                    width: '98px',
                    height: '98px',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8px',
                    color: '#666',
                    textAlign: 'center'
                  }}>
                    QR CODE PREVIEW
                  </div>
                )}
              </div>
            </div>
          )}

          {labelType === 'swastik' && (
            <div style={{
              width: '228px', // 3 inches approx
              height: '190px', // 2.5 inches approx
              border: '2px solid #333',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '40px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '5px'
                }}>
                  <img 
    src={swastikLogo} 
    alt="Swastik Logo" 
    style={{ 
      maxWidth: '80%', 
      maxHeight: '40px',
      height: 'auto'
    }}
  />
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  Swastik Furniture and Electronics Unhel
                </div>
              </div>
              
              <div style={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  margin: '5px 0',
                  lineHeight: '1.2'
                }}>
                  {swastikProduct.name || 'Product Name'}
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#e74c3c',
                  textAlign: 'center',
                  margin: '5px 0',
                  lineHeight: '1.2'
                }}>
                  {swastikProduct.price ? `₹${swastikProduct.price}` : 'Price'}
                </div>
              </div>
              
              <div style={{
                fontSize: '10px',
                textAlign: 'center',
                color: '#333',
                lineHeight: '1.2'
              }}>
                Contact: 9893610807, 8982023226
              </div>
            </div>
          )}

          {labelType === 'delivery' && (
            <div style={{
              width: '228px', // 3 inches approx
              height: '190px', // 2.5 inches approx
              border: '2px solid #333',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '40px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '5px'
                }}>
                   <img 
    src={swastikLogo} 
    alt="Swastik Logo" 
    style={{ 
      maxWidth: '80%', 
      maxHeight: '40px',
      height: 'auto'
    }}
  />
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  Swastik Furniture and Electronics Unhel
                </div>
              </div>
              
              <div style={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3px' }}>
                <div style={{ fontSize: '12px', lineHeight: '1.2' }}>
                  <strong>Customer:</strong> {deliveryInfo.customerName || 'Customer Name'}
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.2' }}>
                  <strong>Contact:</strong> {deliveryInfo.contactNumber || 'Contact Number'}
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.2' }}>
                  <strong>Address:</strong> {deliveryInfo.address || 'Delivery Address'}
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.2' }}>
                  <strong>Delivery Date:</strong> {deliveryInfo.deliveryDate || 'Date'}
                </div>
              </div>
              
              <div style={{
                fontSize: '10px',
                textAlign: 'center',
                color: '#333',
                lineHeight: '1.2'
              }}>
                Contact: 9893610807, 8982023226
              </div>
            </div>
          )}

          <div style={{ 
            textAlign: 'center', 
            marginTop: '15px',
            color: '#28a745',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            ✅ Perfect for Thermal Printers
          </div>
        </div>
      </div>

      {/* Products Grid - Only show when in product mode and not in manual mode */}
      {labelType === 'product' && !useManualInput && (
        <div>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Available Products</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '15px'
          }}>
            {products.map(product => (
              <div 
                key={product.id} 
                onClick={() => handleProductSelect(product)}
                style={{
                  border: '1px solid #e0e0e0',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: selectedProduct?.id === product.id ? '#e3f2fd' : 'white',
                  transition: 'all 0.2s ease',
                  border: selectedProduct?.id === product.id ? '2px solid #2196f3' : '1px solid #e0e0e0'
                }}
              >
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  {product.name}
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#28a745',
                  marginBottom: '8px'
                }}>
                  ₹{product.price}
                </div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>
                  {product.size} • {product.color}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#999', 
                  fontFamily: 'monospace',
                  backgroundColor: '#f8f9fa',
                  padding: '3px',
                  borderRadius: '3px'
                }}>
                  {product.barcode}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelDesigner;