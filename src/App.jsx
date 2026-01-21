// src/App.js
import React, { useState } from 'react';
import ProductManagement from './components/ProductManagement';
import Billing from './components/Billing';
import QRGenerator from './components/QRGenerator';
import LabelDesigner from './components/LabelDesigner';

import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('billing');

  return (
    <div className="App">
      <header className="app-header">
        <h1>Clothes Shop Billing System</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'billing' ? 'active' : ''}
            onClick={() => setActiveTab('billing')}
          >
            Billing
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={activeTab === 'qr' ? 'active' : ''}
            onClick={() => setActiveTab('qr')}
          >
            QR Generator
          </button>
          <button 
            className={activeTab === 'labels' ? 'active' : ''}
            onClick={() => setActiveTab('labels')}
          >
            Label Designer
          </button>
          
        </nav>
      </header>

      <main className="main-content">
        {activeTab === 'billing' && <Billing />}
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'qr' && <QRGenerator />}
        {activeTab === 'labels' && <LabelDesigner />}
      
      </main>
    </div>
  );
}

export default App;