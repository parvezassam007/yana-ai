import React, { useState } from 'react';
import { Plus, Trash2, Edit, Package, DollarSign, Users, ShoppingBag } from 'lucide-react';

export default function AdminDashboard({ products, setProducts, orders }) {
  const [activeTab, setActiveTab] = useState('products');
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newMrp, setNewMrp] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState('Electronics');
  const [newImage, setNewImage] = useState('');

  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProd = {
      id: `p-${Date.now()}`,
      title: newTitle,
      price: Number(newPrice),
      mrp: Number(newMrp),
      discount: Math.round(((Number(newMrp) - Number(newPrice)) / Number(newMrp)) * 100),
      brand: newBrand,
      category: newCategory,
      rating: 4.5,
      reviewsCount: 12,
      stock: 50,
      images: [newImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'],
      description: "Admin added professional product listing.",
      specifications: { "Warranty": "1 Year" }
    };
    setProducts([newProd, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewMrp('');
    setNewBrand('');
    setNewImage('');
    alert('Product added successfully!');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Yana Bazar Admin Panel</h1>
          <p className="text-xs text-gray-500">Manage products, inventory, and customer orders</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('products')} 
            className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'products' ? 'bg-yana-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'orders' ? 'bg-yana-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-yana-50 text-yana-600 rounded-2xl"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400">Total Sales</p>
            <h3 className="text-xl font-black text-gray-900">₹{totalSales}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><ShoppingBag className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400">Total Orders</p>
            <h3 className="text-xl font-black text-gray-900">{orders.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Package className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400">Active Products</p>
            <h3 className="text-xl font-black text-gray-900">{products.length}</h3>
          </div>
        </div>
      </div>

      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Product Form */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit space-y-4">
            <h3 className="font-black text-gray-900 text-base">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <input 
                type="text" placeholder="Product Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" required 
              />
              <input 
                type="text" placeholder="Brand Name" value={newBrand} onChange={(e) => setNewBrand(e.target.value)}
                className="w-full bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" required 
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" placeholder="Price (₹)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)}
                  className="bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" required 
                />
                <input 
                  type="number" placeholder="MRP (₹)" value={newMrp} onChange={(e) => setNewMrp(e.target.value)}
                  className="bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" required 
                />
              </div>
              <input 
                type="text" placeholder="Image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)}
                className="w-full bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" 
              />
              <button type="submit" className="w-full bg-yana-500 text-white font-bold text-xs py-3.5 rounded-xl shadow">
                Add Product
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-black text-gray-900 text-base">Inventory Management</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {products.map(product => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-cover rounded-xl" />
                    <div>
                      <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{product.title}</h4>
                      <p className="text-[11px] text-gray-500">₹{product.price} • Stock: {product.stock}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-black text-gray-900 text-base">Customer Orders</h3>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{order.id} • {order.date}</h4>
                  <p className="text-[11px] text-gray-500">{order.address}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-sm text-gray-900 block">₹{order.total}</span>
                  <span className="text-[10px] font-extrabold text-yana-600 bg-yana-50 px-2 py-0.5 rounded-lg">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
