// src/components/ProductManagement.js
import React, { useState } from 'react';
import productDB from '../data/productDB';

const ProductManagement = () => {
  const [products, setProducts] = useState(productDB.getAllProducts());
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    size: '',
    color: '',
    barcode: '',
    category: '',
    stock: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    productDB.addProduct(product);
    setProducts([...productDB.getAllProducts()]);
    setNewProduct({
      name: '', price: '', size: '', color: '', barcode: '', category: '', stock: ''
    });
  };

  const updateProduct = (e) => {
    e.preventDefault();
    productDB.updateProduct(editingProduct.id, editingProduct);
    setProducts([...productDB.getAllProducts()]);
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productDB.deleteProduct(id);
      setProducts([...productDB.getAllProducts()]);
    }
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>

      <div className="product-forms">
        {/* Add Product Form */}
        <form onSubmit={addProduct} className="product-form">
          <h3>Add New Product</h3>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <select name="size" value={newProduct.size} onChange={handleInputChange} required>
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={newProduct.color}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="barcode"
            placeholder="Barcode"
            value={newProduct.barcode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={newProduct.stock}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Product</button>
        </form>

        {/* Edit Product Form */}
        {editingProduct && (
          <form onSubmit={updateProduct} className="product-form">
            <h3>Edit Product</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={editingProduct.name}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editingProduct.price}
              onChange={handleEditInputChange}
              required
            />
            <select name="size" value={editingProduct.size} onChange={handleEditInputChange} required>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={editingProduct.color}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="text"
              name="barcode"
              placeholder="Barcode"
              value={editingProduct.barcode}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editingProduct.category}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={editingProduct.stock}
              onChange={handleEditInputChange}
              required
            />
            <button type="submit">Update Product</button>
            <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
          </form>
        )}
      </div>

      {/* Products List */}
      <div className="products-list">
        <h3>Products List</h3>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h4>{product.name}</h4>
              <p>Price: ₹{product.price}</p>
              <p>Size: {product.size} | Color: {product.color}</p>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stock}</p>
              <p>Barcode: {product.barcode}</p>
              <div className="product-actions">
                <button onClick={() => setEditingProduct({...product})}>Edit</button>
                <button onClick={() => deleteProduct(product.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;