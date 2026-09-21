import { initialProducts } from '../data/mockData';

export const getStoredProducts = () => {
  const data = localStorage.getItem('yana_products');
  if (!data) {
    localStorage.setItem('yana_products', JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(data);
};

export const saveProducts = (products) => {
  localStorage.setItem('yana_products', JSON.stringify(products));
};

export const getStoredCart = () => {
  return JSON.parse(localStorage.getItem('yana_cart')) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem('yana_cart', JSON.stringify(cart));
};

export const getStoredWishlist = () => {
  return JSON.parse(localStorage.getItem('yana_wishlist')) || [];
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem('yana_wishlist', JSON.stringify(wishlist));
};

export const getStoredUser = () => {
  return JSON.parse(localStorage.getItem('yana_user')) || null;
};

export const saveUser = (user) => {
  localStorage.setItem('yana_user', JSON.stringify(user));
};

export const getStoredOrders = () => {
  return JSON.parse(localStorage.getItem('yana_orders')) || [
    {
      id: "YB-98421",
      date: "2026-06-10",
      total: 1499,
      status: "Out for Delivery",
      items: [{ title: "boAt Rockerz 450 Bluetooth On-Ear Headphones", price: 1499, quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" }],
      address: "Flat 402, Sunshine Apartments, MG Road, Bangalore - 560001",
      paymentMethod: "UPI / Google Pay"
    }
  ];
};

export const saveOrders = (orders) => {
  localStorage.setItem('yana_orders', JSON.stringify(orders));
};
