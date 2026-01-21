// src/components/QRGenerator.jsx
import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import productDB from '../data/productDB';

const QRGenerator = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customData, setCustomData] = useState('');
  const qrRef = useRef();

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCustomData(JSON.stringify(product));
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `qrcode-${selectedProduct.barcode}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <div className="qr-generator">
      <h2>QR Code Generator</h2>
      
      <div className="qr-container">
        <div className="product-selection">
          <h3>Select Product</h3>
          <select 
            onChange={(e) => handleProductSelect(JSON.parse(e.target.value))}
            value={selectedProduct ? JSON.stringify(selectedProduct) : ''}
          >
            <option value="">Choose a product</option>
            {productDB.getAllProducts().map(product => (
              <option key={product.id} value={JSON.stringify(product)}>
                {product.name} - {product.barcode}
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && (
          <div className="qr-display">
            <div className="qr-code" ref={qrRef}>
              <QRCodeCanvas
                value={customData}
                size={200}
                level="H"
                includeMargin
              />
            </div>
            
            <div className="product-info">
              <h4>{selectedProduct.name}</h4>
              <p>Price: ₹{selectedProduct.price}</p>
              <p>Size: {selectedProduct.size}</p>
              <p>Color: {selectedProduct.color}</p>
              <p>Barcode: {selectedProduct.barcode}</p>
            </div>

            <div className="qr-actions">
              <button onClick={downloadQRCode} className="download-btn">
                Download QR Code
              </button>
            </div>
          </div>
        )}

        <div className="custom-data">
          <h3>Custom QR Data</h3>
          <textarea
            value={customData}
            onChange={(e) => setCustomData(e.target.value)}
            placeholder="Enter custom data for QR code"
            rows="4"
          />
          {customData && (
            <div className="custom-qr">
              <QRCodeCanvas value={customData} size={150} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;