import React from 'react';
import { categoriesList } from '../data/mockData';
import { ArrowRight, Star, Tag, Zap } from 'lucide-react';

export default function Home({ products, onSelectProduct, onSelectCategory, setActiveTab }) {
  const dealsOfDay = products.filter(p => p.isDealOfDay);
  const trending = products.filter(p => p.isTrending);
  const bestSellers = products.filter(p => p.isBestSeller);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Category Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto py-3 gap-6 no-scrollbar">
          {categoriesList.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => onSelectCategory(cat.name)}
              className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-yana-500 whitespace-nowrap transition cursor-pointer"
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Large Promotional Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-yana-900 via-gray-900 to-yana-700 text-white p-8 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="bg-yana-500 text-white font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow">
              Mega Summer Fest 2026
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Unbeatable Deals on Top Indian Brands
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Upgrade your lifestyle with up to <span className="text-yana-500 font-bold">80% OFF</span> on Electronics, Fashion, Home Appliances, and Daily Groceries.
            </p>
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                onClick={() => setActiveTab('products')}
                className="bg-yana-500 hover:bg-yana-600 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition shadow-lg"
              >
                Explore All Deals <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative w-full md:w-96 h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&auto=format&fit=crop&q=80" 
              alt="Promo Banner" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Category Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {categoriesList.slice(0, 6).map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => onSelectCategory(cat.name)}
                className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center text-center cursor-pointer transition group"
              >
                <div className="w-14 h-14 bg-yana-50 rounded-2xl flex items-center justify-center text-yana-600 group-hover:bg-yana-500 group-hover:text-white transition mb-3">
                  <Tag className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-gray-800">{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Deals of the Day */}
        <div className="space-y-6 bg-yana-50 p-6 sm:p-8 rounded-3xl border border-yana-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yana-500 text-white rounded-xl"><Zap className="w-5 h-5" /></div>
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Deals of the Day</h2>
                <p className="text-xs text-gray-500">Limited time offers, grab them fast!</p>
              </div>
            </div>
            <button onClick={() => setActiveTab('products')} className="text-xs font-bold text-yana-600 hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {dealsOfDay.map(product => (
              <div 
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all p-4 cursor-pointer border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <span className="absolute top-2 left-2 bg-rose-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase">{product.brand}</p>
                  <h3 className="font-bold text-sm text-gray-800 line-clamp-2 mt-1">{product.title}</h3>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">₹{product.mrp}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Trending Right Now</h2>
            <button onClick={() => setActiveTab('products')} className="text-xs font-bold text-yana-600 hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trending.map(product => (
              <div 
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all p-4 cursor-pointer border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase">{product.brand}</p>
                  <h3 className="font-bold text-sm text-gray-800 line-clamp-2 mt-1">{product.title}</h3>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">₹{product.mrp}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
