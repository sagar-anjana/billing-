// // src/components/BillPreview.js
// import React, { forwardRef, useImperativeHandle } from 'react';

// const BillPreview = forwardRef(({ cart, customerInfo, total, tax, grandTotal }, ref) => {
//   useImperativeHandle(ref, () => ({
//     printBill() {
//       const printWindow = window.open('', '_blank');
//       const billContent = generateBillContent();
//       printWindow.document.write(billContent);
//       printWindow.document.close();
//       printWindow.print();
//     }
//   }));

//   const generateBillContent = () => {
//     return `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Clothes Shop Bill</title>
//           <style>
//             @media print {
//               @page {
//                 size: 80mm 297mm;
//                 margin: 0;
//               }
//               body {
//                 font-family: 'Courier New', monospace;
//                 font-size: 12px;
//                 margin: 5mm;
//                 width: 70mm;
//               }
//               .header {
//                 text-align: center;
//                 margin-bottom: 10px;
//                 border-bottom: 1px dashed #000;
//                 padding-bottom: 10px;
//               }
//               .customer-info {
//                 margin-bottom: 10px;
//                 padding-bottom: 10px;
//                 border-bottom: 1px dashed #000;
//               }
//               .items-table {
//                 width: 100%;
//                 border-collapse: collapse;
//                 margin-bottom: 10px;
//               }
//               .items-table th,
//               .items-table td {
//                 padding: 2px 0;
//                 border-bottom: 1px dashed #ccc;
//               }
//               .summary {
//                 border-top: 2px solid #000;
//                 padding-top: 10px;
//                 margin-top: 10px;
//               }
//               .summary-row {
//                 display: flex;
//                 justify-content: space-between;
//                 margin: 2px 0;
//               }
//               .grand-total {
//                 font-weight: bold;
//                 font-size: 14px;
//                 border-top: 1px solid #000;
//                 padding-top: 5px;
//               }
//               .footer {
//                 text-align: center;
//                 margin-top: 20px;
//                 font-size: 10px;
//                 border-top: 1px dashed #000;
//                 padding-top: 10px;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h2>FASHION STORE</h2>
//             <p>123 Clothing Street, Fashion City</p>
//             <p>Phone: +91-9876543210</p>
//             <p>GSTIN: 07AABCU9603R1ZM</p>
//           </div>

//           <div class="customer-info">
//             <p><strong>Customer:</strong> ${customerInfo.name || 'Walk-in Customer'}</p>
//             <p><strong>Phone:</strong> ${customerInfo.phone || 'N/A'}</p>
//             <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
//             <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
//           </div>

//           <table class="items-table">
//             <thead>
//               <tr>
//                 <th style="text-align: left;">Item</th>
//                 <th style="text-align: right;">Qty</th>
//                 <th style="text-align: right;">Price</th>
//                 <th style="text-align: right;">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${cart.map(item => `
//                 <tr>
//                   <td>${item.name} (${item.size})</td>
//                   <td style="text-align: right;">${item.quantity}</td>
//                   <td style="text-align: right;">₹${item.price}</td>
//                   <td style="text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>

//           <div class="summary">
//             <div class="summary-row">
//               <span>Subtotal:</span>
//               <span>₹${total.toFixed(2)}</span>
//             </div>
//             <div class="summary-row">
//               <span>GST (18%):</span>
//               <span>₹${tax.toFixed(2)}</span>
//             </div>
//             <div class="summary-row grand-total">
//               <span>Grand Total:</span>
//               <span>₹${grandTotal.toFixed(2)}</span>
//             </div>
//           </div>

//           <div class="footer">
//             <p>Thank you for shopping with us!</p>
//             <p>Visit Again</p>
//             <p>*** This is a computer generated bill ***</p>
//           </div>
//         </body>
//       </html>
//     `;
//   };

//   return null;
// });

// BillPreview.displayName = 'BillPreview';

// export default BillPreview;







// src/components/BillPreview.jsx
import React, { forwardRef, useImperativeHandle } from 'react';

const BillPreview = forwardRef(({ cart, customerInfo, total, discount, grandTotal }, ref) => {
  useImperativeHandle(ref, () => ({
    printBill() {
      const printWindow = window.open('', '_blank');
      const billContent = generateBillContent();
      printWindow.document.write(billContent);
      printWindow.document.close();
      printWindow.print();
    }
  }));

  const generateBillContent = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clothes Shop Bill</title>
          <style>
            @media print {
              @page {
                size: 80mm 297mm;
                margin: 0;
              }
              body {
                font-family: 'Courier New', monospace;
                font-size: 12px;
                margin: 5mm;
                width: 70mm;
              }
              .header {
                text-align: center;
                margin-bottom: 10px;
                border-bottom: 1px dashed #000;
                padding-bottom: 10px;
              }
              .customer-info {
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px dashed #000;
              }
              .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 10px;
              }
              .items-table th,
              .items-table td {
                padding: 2px 0;
                border-bottom: 1px dashed #ccc;
              }
              .summary {
                border-top: 2px solid #000;
                padding-top: 10px;
                margin-top: 10px;
              }
              .summary-row {
                display: flex;
                justify-content: space-between;
                margin: 2px 0;
              }
              .discount {
                color: #28a745;
              }
              .grand-total {
                font-weight: bold;
                font-size: 14px;
                border-top: 1px solid #000;
                padding-top: 5px;
              }
              .savings {
                text-align: center;
                margin: 5px 0;
                padding: 3px;
                background: #f8f9fa;
                border-radius: 3px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 10px;
                border-top: 1px dashed #000;
                padding-top: 10px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>YCF FASHION STORE</h2>
            <p>Address - Ujjain Road Near by Swastik Furniture , Unhel (M.P.)</p>
            <p>Phone: 8982023226 , 9131975869 </p>
          </div>

          <div class="customer-info">
            <p><strong>Customer:</strong> ${customerInfo.name || 'Walk-in Customer'}</p>
            <p><strong>Phone:</strong> ${customerInfo.phone || 'N/A'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th style="text-align: left;">Item</th>
                <th style="text-align: right;">Qty</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${cart.map(item => `
                <tr>
                  <td>${item.name} (${item.size})</td>
                  <td style="text-align: right;">${item.quantity}</td>
                  <td style="text-align: right;">₹${item.price}</td>
                  <td style="text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>₹${total.toFixed(2)}</span>
            </div>
            <div class="summary-row discount">
              <span>Discount (10%):</span>
              <span>- ₹${discount.toFixed(2)}</span>
            </div>
            <div class="summary-row grand-total">
              <span>Final Amount:</span>
              <span>₹${grandTotal.toFixed(2)}</span>
            </div>
            <div class="savings">
              You saved ₹${discount.toFixed(2)}!
            </div>
          </div>

          <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>Visit Again</p>
            <p>*** This is a computer generated bill ***</p>
          </div>
        </body>
      </html>
    `;
  };

  return null;
});

BillPreview.displayName = 'BillPreview';

export default BillPreview;