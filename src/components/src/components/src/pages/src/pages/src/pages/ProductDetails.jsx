import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ProductDetails({ product, onAddToCart, onAddToWishlist, isWishlisted, setActiveTab }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryChecked, setDeliveryChecked] = useState(false);

  if (!product) return null;

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    setActiveTab('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="h-96 md:h-[450px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative shadow-inner">
            <img src={product.images[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
            <button 
              onClick={() => onAddToWishlist(product)}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md text-gray-700 hover:text-rose-500 transition"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${selectedImage === idx ? 'border-yana-500 scale-105' : 'border-transparent opacity-70'}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-extrabold text-yana-600 bg-yana-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {product.brand}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-3 leading-tight">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-xl text-xs font-extrabold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">({product.reviewsCount} Customer Reviews)</span>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-baseline gap-4">
            <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
            <span className="text-base text-gray-400 line-through">₹{product.mrp}</span>
            <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {product.discount}% OFF
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          {/* Offers */}
          <div className="space-y-2 border-t border-b border-gray-100 py-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Available Offers</h4>
            <div className="space-y-1.5 text-xs font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yana-500"></span>
                <span>10% Instant Discount on HDFC Bank Credit Cards</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yana-500"></span>
                <span>No Cost EMI available on orders above ₹3,000</span>
              </div>
            </div>
          </div>

          {/* Pincode Delivery Check */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Delivery Options</h4>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter Pincode (e.g. 560001)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="bg-gray-100 text-xs font-bold px-4 py-2.5 rounded-xl border border-transparent focus:outline-none focus:border-yana-500 flex-1"
              />
              <button 
                onClick={() => setDeliveryChecked(true)}
                className="bg-gray-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
              >
                Check
              </button>
            </div>
            {deliveryChecked && (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-4 h-4" /> Delivery by tomorrow, 2:00 PM (Free Shipping)
              </p>
            )}
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-500 uppercase">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 font-bold">-</button>
                <span className="px-4 text-sm font-black">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 font-bold">+</button>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-yana-500 hover:bg-yana-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition"
              >
                Buy Now
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h3 className="text-lg font-black text-gray-900">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.specifications && Object.entries(product.specifications).map(([key, value], idx) => (
            <div key={idx} className="flex justify-between py-3 border-b border-gray-100 text-xs">
              <span className="font-bold text-gray-400">{key}</span>
              <span className="font-bold text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
