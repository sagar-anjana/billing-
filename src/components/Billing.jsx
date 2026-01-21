// src/components/Billing.jsx
import React, { useState, useRef, useEffect } from 'react';
import productDB from '../data/productDB';
import BillPreview from './BillPreview.jsx';

const Billing = () => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scanMode, setScanMode] = useState('barcode'); // 'barcode' or 'qr'
  const [autoAddStatus, setAutoAddStatus] = useState('');
  const billPreviewRef = useRef();

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  // Handle QR code scanning - AUTO ADD
  const handleQRScan = (scannedData) => {
    try {
      console.log('QR Data received:', scannedData);
      
      // Try to parse as JSON first (QR code data)
      if (scannedData.trim().startsWith('{') && scannedData.trim().endsWith('}')) {
        const productData = JSON.parse(scannedData);
        
        // Check if it's a product QR code from our system
        if (productData.type === 'product' || productData.id) {
          // Try to find product by ID first
          let product = productDB.getProductById(productData.id);
          
          // If not found by ID, try by barcode
          if (!product && productData.barcode) {
            product = productDB.getProductByBarcode(productData.barcode);
          }
          
          // If found in database, use that
          if (product) {
            addToCart(product);
            setAutoAddStatus(`✅ Auto-added: ${product.name} - ₹${product.price}`);
            setTimeout(() => setAutoAddStatus(''), 3000);
            return true;
          }
          // If not in database but has required fields, use QR data
          else if (productData.name && productData.price) {
            const productFromQR = {
              id: productData.id || Date.now(),
              name: productData.name,
              price: productData.price,
              size: productData.size || 'N/A',
              color: productData.color || 'N/A',
              barcode: productData.barcode || `QR${Date.now()}`,
              category: productData.category || 'QR Scanned'
            };
            addToCart(productFromQR);
            setAutoAddStatus(`✅ Auto-added from QR: ${productData.name} - ₹${productData.price}`);
            setTimeout(() => setAutoAddStatus(''), 3000);
            return true;
          }
        }
      }
      
      // If not JSON or not our format, try as direct barcode
      const product = productDB.getProductByBarcode(scannedData);
      if (product) {
        addToCart(product);
        setAutoAddStatus(`✅ Auto-added: ${product.name} - ₹${product.price}`);
        setTimeout(() => setAutoAddStatus(''), 3000);
        return true;
      }
      
      setAutoAddStatus('❌ Product not found in database');
      setTimeout(() => setAutoAddStatus(''), 3000);
      return false;
    } catch (error) {
      console.error('QR scan error:', error);
      setAutoAddStatus('❌ Invalid QR code format');
      setTimeout(() => setAutoAddStatus(''), 3000);
      return false;
    }
  };

  // Auto-detect and process QR data when input changes
  useEffect(() => {
    if (scanMode === 'qr' && barcodeInput.trim()) {
      // Check if it looks like JSON data (QR code)
      if (barcodeInput.trim().startsWith('{') && barcodeInput.trim().endsWith('}')) {
        const timer = setTimeout(() => {
          handleQRScan(barcodeInput);
          setBarcodeInput(''); // Clear input after auto-adding
        }, 500); // Small delay to ensure complete scan
        
        return () => clearTimeout(timer);
      }
    }
  }, [barcodeInput, scanMode]);

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    if (scanMode === 'barcode') {
      // Barcode mode - direct lookup
      const product = productDB.getProductByBarcode(barcodeInput);
      if (product) {
        addToCart(product);
        setBarcodeInput('');
        setAutoAddStatus(`✅ Added: ${product.name} - ₹${product.price}`);
        setTimeout(() => setAutoAddStatus(''), 3000);
      } else {
        setAutoAddStatus('❌ Product not found! Please check the barcode.');
        setTimeout(() => setAutoAddStatus(''), 3000);
      }
    }
    // For QR mode, we don't need submit as it auto-adds
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return calculateTotal() * 0.10; // 10% discount
  };

  const calculateGrandTotal = () => {
    return calculateTotal() - calculateDiscount();
  };

  const resetBill = () => {
    setCart([]);
    setCustomerInfo({ name: '', phone: '', email: '' });
    setBarcodeInput('');
    setAutoAddStatus('');
  };

  const printBill = () => {
    if (billPreviewRef.current) {
      billPreviewRef.current.printBill();
    }
  };

  // Quick add sample QR data for testing
  const addSampleQRData = () => {
    const sampleProduct = productDB.getAllProducts()[0];
    if (sampleProduct) {
      const qrData = JSON.stringify({
        type: 'product',
        id: sampleProduct.id,
        barcode: sampleProduct.barcode,
        name: sampleProduct.name,
        price: sampleProduct.price,
        size: sampleProduct.size,
        color: sampleProduct.color,
        category: sampleProduct.category
      });
      setBarcodeInput(qrData);
      setScanMode('qr');
    }
  };

  return (
    <div className="billing-container">
      <div className="billing-left">
        {/* Customer Information */}
        <div className="customer-info">
          <h3>Customer Information</h3>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
          />
        </div>

        {/* Scan Input Section */}
        <div className="scan-section">
          <h3>Scan Products</h3>
          
          {/* Mode Toggle */}
          <div className="mode-toggle" style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => {
                setScanMode('barcode');
                setBarcodeInput('');
                setAutoAddStatus('');
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: scanMode === 'barcode' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px 0 0 5px',
                cursor: 'pointer'
              }}
            >
              Barcode
            </button>
            <button
              onClick={() => {
                setScanMode('qr');
                setBarcodeInput('');
                setAutoAddStatus('');
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: scanMode === 'qr' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '0 5px 5px 0',
                cursor: 'pointer'
              }}
            >
              QR Code
            </button>
          </div>

          {/* Auto-add Status */}
          {autoAddStatus && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: autoAddStatus.includes('✅') ? '#d4edda' : '#f8d7da',
              color: autoAddStatus.includes('✅') ? '#155724' : '#721c24',
              border: `1px solid ${autoAddStatus.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '5px',
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              {autoAddStatus}
            </div>
          )}

          <form onSubmit={handleBarcodeSubmit}>
            {scanMode === 'qr' ? (
              <div>
                <textarea
                  placeholder="Scan QR code with 2D scanner - product will auto-add..."
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #28a745',
                    borderRadius: '5px',
                    fontSize: '14px',
                    resize: 'vertical',
                    backgroundColor: '#f8fff8'
                  }}
                />
                <div style={{
                  fontSize: '12px',
                  color: '#28a745',
                  marginTop: '0.25rem',
                  textAlign: 'center'
                }}>
                  ⚡ Auto-add enabled - just scan and go!
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Enter barcode and press Enter or click Add Product"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
                autoFocus
              />
            )}
            {scanMode === 'barcode' && (
              <button 
                type="submit" 
                disabled={!barcodeInput.trim()}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: barcodeInput.trim() ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: barcodeInput.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  width: '100%'
                }}
              >
                Add Product
              </button>
            )}
          </form>

          {/* QR Scan Help */}
          {scanMode === 'qr' && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#e7f3ff',
              borderRadius: '5px',
              border: '1px solid #b3d9ff'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0066cc' }}>QR Auto-Scan Mode</h4>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '14px', color: '#0066cc' }}>
                <li>🔹 Point 2D scanner at QR code</li>
                <li>🔹 Product auto-adds to bill instantly</li>
                <li>🔹 No button click required</li>
                <li>🔹 Input clears automatically</li>
              </ul>
              <button 
                onClick={addSampleQRData}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Test with Sample QR Data
              </button>
            </div>
          )}
        </div>

        {/* Product List */}
        <div className="product-list">
          <h3>Available Products</h3>
          <div className="products-grid">
            {productDB.getAllProducts().map(product => (
              <div key={product.id} className="product-card">
                <h4>{product.name}</h4>
                <p className="price">₹{product.price}</p>
                <p className="details">Size: {product.size} | Color: {product.color}</p>
                <p className="barcode">{product.barcode}</p>
                <button 
                  onClick={() => addToCart(product)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Add to Bill
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="billing-right">
        <div className="cart-section">
          <h3>Current Bill ({cart.length} items)</h3>
          
          {/* Cart Items */}
          <div className="cart-items">
            {cart.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: '#6c757d',
                backgroundColor: '#f8f9fa',
                borderRadius: '5px'
              }}>
                No items in bill. Scan or add products to start.
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Size: {item.size} | Color: {item.color}</p>
                    <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                    {item.barcode && <p className="barcode-small">Code: {item.barcode}</p>}
                  </div>
                  <div className="item-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      padding: '0 1rem', 
                      fontWeight: 'bold',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        marginLeft: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bill Summary */}
          {cart.length > 0 && (
            <div className="bill-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row discount">
                <span>Discount (10%):</span>
                <span>- ₹{calculateDiscount().toFixed(2)}</span>
              </div>
              <div className="summary-row grand-total">
                <span>Final Amount to Pay:</span>
                <span>₹{calculateGrandTotal().toFixed(2)}</span>
              </div>
              <div style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: '#e7f3ff',
                borderRadius: '3px',
                textAlign: 'center',
                fontSize: '12px',
                color: '#0066cc'
              }}>
                🎉 You saved ₹{calculateDiscount().toFixed(2)}!
              </div>
            </div>
          )}

          {/* Bill Actions */}
          <div className="bill-actions">
            <button 
              onClick={resetBill}
              disabled={cart.length === 0}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: cart.length === 0 ? '#6c757d' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '16px'
              }}
            >
              Reset Bill
            </button>
            <button 
              onClick={printBill}
              disabled={cart.length === 0}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: cart.length === 0 ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              🖨️ Print Bill
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Bill Preview for Printing */}
      <BillPreview
        ref={billPreviewRef}
        cart={cart}
        customerInfo={customerInfo}
        total={calculateTotal()}
        discount={calculateDiscount()}
        grandTotal={calculateGrandTotal()}
      />
    </div>
  );
};

export default Billing;
