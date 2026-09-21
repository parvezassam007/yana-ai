import React, { useState } from 'react';
import { Filter, Star, SlidersHorizontal, Grid, List } from 'lucide-react';
import { categoriesList } from '../data/mockData';

export default function ProductListing({ products, onSelectProduct, selectedCategoryFilter, onSelectCategory }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(70000);
  const [minRating, setMinRating] = useState(0);

  const brands = ['All', ...Array.from(new Set(products.map(p => p.brand)))];

  let filtered = products.filter(p => {
    if (selectedCategoryFilter && selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) return false;
    if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
    if (p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    return true;
  });

  if (sortBy === 'price-low') filtered.sort((a,b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a,b) => b.price - a.price);
  if (sortBy === 'rating') filtered.sort((a,b) => b.rating - a.rating);
  if (sortBy === 'newest') filtered.sort((a,b) => b.id.localeCompare(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {selectedCategoryFilter || 'All Products'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">Showing {filtered.length} products available for quick delivery</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Sort By:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 text-xs font-bold px-4 py-2.5 rounded-xl border border-transparent focus:outline-none focus:border-yana-500"
            >
              <option value="popular">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="font-black text-gray-900 flex items-center gap-2"><Filter className="w-4 h-4 text-yana-500" /> Filters</h3>
            <button 
              onClick={() => { onSelectCategory('All'); setSelectedBrand('All'); setMaxPrice(70000); setMinRating(0); }}
              className="text-xs font-bold text-yana-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Categories</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              <button 
                onClick={() => onSelectCategory('All')} 
                className={`block text-xs font-semibold w-full text-left py-1.5 px-3 rounded-lg ${!selectedCategoryFilter || selectedCategoryFilter === 'All' ? 'bg-yana-50 text-yana-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                All Categories
              </button>
              {categoriesList.map((c, i) => (
                <button 
                  key={i}
                  onClick={() => onSelectCategory(c.name)}
                  className={`block text-xs font-semibold w-full text-left py-1.5 px-3 rounded-lg ${selectedCategoryFilter === c.name ? 'bg-yana-50 text-yana-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="space-y-3 border-t border-gray-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Brand</h4>
            <select 
              value={selectedBrand} 
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none"
            >
              {brands.map((b, i) => <option key={i} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-3 border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Max Price</h4>
              <span className="text-xs font-black text-yana-600">₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="200" 
              max="70000" 
              step="500"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-yana-500 cursor-pointer"
            />
          </div>

          {/* Rating */}
          <div className="space-y-3 border-t border-gray-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Minimum Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2].map((rating) => (
                <button 
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex items-center gap-2 text-xs font-bold w-full py-2 px-3 rounded-xl ${minRating === rating ? 'bg-yana-50 text-yana-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{rating} Star & above</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center space-y-4 shadow-sm">
              <p className="text-lg font-bold text-gray-700">No products found matching your criteria.</p>
              <button 
                onClick={() => { onSelectCategory('All'); setSelectedBrand('All'); setMaxPrice(70000); setMinRating(0); }}
                className="bg-yana-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map(product => (
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
          )}
        </div>

      </div>
    </div>
  );
}
