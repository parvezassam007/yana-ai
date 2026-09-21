import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

import { 
  getStoredProducts, saveProducts, 
  getStoredCart, saveCart, 
  getStoredWishlist, saveWishlist, 
  getStoredUser, saveUser, 
  getStoredOrders, saveOrders 
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState(getStoredProducts());
  const [cart, setCart] = useState(getStoredCart());
  const [wishlist, setWishlist] = useState(getStoredWishlist());
  const [user, setUser] = useState(getStoredUser());
  const [orders, setOrders] = useState(getStoredOrders());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  useEffect(() => { saveProducts(products); }, [products]);
  useEffect(() => { saveCart(cart); }, [cart]);
  useEffect(() => { saveWishlist(wishlist); }, [wishlist]);
  useEffect(() => { saveUser(user); }, [user]);
  useEffect(() => { saveOrders(orders); }, [orders]);

  const handleAddToCart = (product, qty = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item));
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
  };

  const handleUpdateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const handleRemoveCartItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleAddToWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const handlePlaceOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setCart([]);
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
        wishlistCount={wishlist.length}
        user={user}
        products={products}
        onSearch={(query) => {
          setSelectedCategoryFilter('All');
          setActiveTab('products');
        }}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
          setActiveTab('details');
        }}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <Home 
            products={products}
            onSelectProduct={(product) => { setSelectedProduct(product); setActiveTab('details'); }}
            onSelectCategory={(cat) => { setSelectedCategoryFilter(cat); setActiveTab('products'); }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'products' && (
          <ProductListing 
            products={products}
            selectedCategoryFilter={selectedCategoryFilter}
            onSelectCategory={setSelectedCategoryFilter}
            onSelectProduct={(product) => { setSelectedProduct(product); setActiveTab('details'); }}
          />
        )}

        {activeTab === 'details' && (
          <ProductDetails 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            isWishlisted={wishlist.some(w => w.id === selectedProduct?.id)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'cart' && (
          <Cart 
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'wishlist' && (
          <Wishlist 
            wishlist={wishlist}
            onRemoveWishlist={(id) => setWishlist(wishlist.filter(w => w.id !== id))}
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'auth' && (
          <Auth 
            onLogin={(userData) => setUser(userData)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'checkout' && (
          <Checkout 
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'orders' && (
          <Orders 
            orders={orders}
            onCancelOrder={handleCancelOrder}
          />
        )}

        {activeTab === 'profile' && (
          <Profile 
            user={user}
            onLogout={() => { setUser(null); setActiveTab('home'); }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard 
            products={products}
            setProducts={setProducts}
            orders={orders}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
