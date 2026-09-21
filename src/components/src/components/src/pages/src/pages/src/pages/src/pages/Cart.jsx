import React from 'react';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart({ cart, onUpdateQuantity, onRemoveItem, setActiveTab }) {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountSavings = cart.reduce((acc, item) => acc + ((item.mrp - item.price) * item.quantity), 0);
  const deliveryCharge = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-yana-50 text-yana-500 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Your Yana Cart is Empty</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">Explore thousands of amazing products across categories and start filling your cart!</p>
        <button 
          onClick={() => setActiveTab('products')}
          className="bg-yana-500 hover:bg-yana-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-2xl font-black text-gray-900">Shopping Cart ({cart.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
              <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded-2xl bg-gray-50" />
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-extrabold text-yana-600 uppercase">{item.brand}</span>
                <h3 className="font-bold text-sm text-gray-800">{item.title}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                  <span className="text-base font-black text-gray-900">₹{item.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 bg-gray-50 font-bold">-</button>
                  <span className="px-3 text-xs font-bold">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 bg-gray-50 font-bold">+</button>
                </div>
                <button onClick={() => onRemoveItem(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit space-y-6">
          <h3 className="font-black text-gray-900 text-lg border-b border-gray-100 pb-4">Price Details</h3>
          
          <div className="space-y-3 text-xs font-semibold text-gray-600">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Bag Discount</span>
              <span>-₹{discountSavings}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>{deliveryCharge === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryCharge}`}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="font-black text-gray-900 text-sm">Total Amount</span>
            <span className="font-black text-gray-900 text-xl">₹{total}</span>
          </div>

          <button 
            onClick={() => setActiveTab('checkout')}
            className="w-full bg-yana-500 hover:bg-yana-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
