import React from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

export default function Wishlist({ wishlist, onRemoveWishlist, onAddToCart, setActiveTab }) {
  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Your Wishlist is Empty</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">Save items you love so you can easily find and buy them later.</p>
        <button 
          onClick={() => setActiveTab('products')}
          className="bg-yana-500 hover:bg-yana-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-2xl font-black text-gray-900">My Wishlist ({wishlist.length} items)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between group">
            <div>
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => onRemoveWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full text-rose-500 shadow hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] font-bold text-gray-400 uppercase">{product.brand}</p>
              <h3 className="font-bold text-sm text-gray-800 line-clamp-2 mt-1">{product.title}</h3>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-gray-900">₹{product.price}</span>
                <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
              </div>
              <button 
                onClick={() => { onAddToCart(product, 1); onRemoveWishlist(product.id); }}
                className="w-full bg-yana-500 hover:bg-yana-600 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow transition"
              >
                <ShoppingCart className="w-4 h-4" /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
