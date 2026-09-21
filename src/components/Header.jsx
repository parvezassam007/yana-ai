import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Package, Menu, X, ShieldCheck } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  wishlistCount, 
  user, 
  onSearch, 
  products, 
  onSelectProduct 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const suggestions = searchQuery.trim() === '' ? [] : products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearching(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Top promotional bar */}
      <div className="bg-yana-900 text-white text-xs py-1.5 px-4 text-center font-medium flex justify-center items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-yana-500" />
        <span>India's Most Trusted Marketplace • Free Delivery on Orders above ₹499 • 100% Genuine Products</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-gray-700 hover:text-yana-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div 
              onClick={() => setActiveTab('home')} 
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="bg-gradient-to-tr from-yana-600 to-yana-500 text-white font-black text-2xl px-3 py-1.5 rounded-xl shadow-md tracking-wider">
                YANA
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold tracking-tight text-gray-900 block leading-none">BAZAR</span>
                <span className="text-[10px] uppercase tracking-widest text-yana-600 font-semibold">Desh Ki Dukaan</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input 
                type="text"
                placeholder="Search for products, brands, categories & more..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setIsSearching(true); }}
                className="w-full bg-gray-100 text-gray-800 pl-11 pr-24 py-3 rounded-full text-sm font-medium border border-transparent focus:border-yana-500 focus:bg-white focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4" />
              <button 
                type="submit"
                className="absolute right-1.5 bg-yana-500 hover:bg-yana-600 text-white px-5 py-2 rounded-full text-xs font-bold transition shadow"
              >
                Search
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {isSearching && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {suggestions.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      setIsSearching(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none"
                  >
                    <img src={item.images[0]} alt={item.title} className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.brand} • <span className="text-yana-600 font-bold">₹{item.price}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-4">
            <button 
              onClick={() => setActiveTab(user ? 'profile' : 'auth')}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition text-gray-700 font-medium text-sm"
            >
              <User className="w-5 h-5 text-yana-600" />
              <span className="hidden lg:inline">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
            </button>

            <button 
              onClick={() => setActiveTab('orders')}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition text-gray-700 flex items-center gap-1.5"
              title="Orders"
            >
              <Package className="w-5 h-5 text-gray-700" />
              <span className="hidden lg:inline text-sm font-medium">Orders</span>
            </button>

            <button 
              onClick={() => setActiveTab('wishlist')}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition text-gray-700"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('cart')}
              className="relative bg-yana-500 hover:bg-yana-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-md transition"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-yana-600 text-xs px-2 py-0.5 rounded-full font-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 text-gray-800 pl-10 pr-20 py-2.5 rounded-xl text-sm border focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
            <button type="submit" className="absolute right-1 bg-yana-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-6 md:hidden">
          <nav className="flex flex-col gap-3 font-semibold text-gray-700">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="text-left py-2 hover:text-yana-500">Home</button>
            <button onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }} className="text-left py-2 hover:text-yana-500">All Products</button>
            <button onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }} className="text-left py-2 hover:text-yana-500">My Orders</button>
            <button onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }} className="text-left py-2 text-yana-600">Admin Dashboard</button>
          </nav>
        </div>
      )}
    </header>
  );
          }
