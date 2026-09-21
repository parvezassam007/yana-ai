import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800 rounded-2xl text-yana-500"><Truck className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-white text-sm">Express Delivery</h4>
              <p className="text-xs text-gray-400">Next-day delivery across 100+ cities</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800 rounded-2xl text-yana-500"><ShieldCheck className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Secure Payments</h4>
              <p className="text-xs text-gray-400">Razorpay & UPI encrypted security</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800 rounded-2xl text-yana-500"><RefreshCw className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-white text-sm">Easy 7-Day Returns</h4>
              <p className="text-xs text-gray-400">Hassle-free doorstep pickup & refunds</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800 rounded-2xl text-yana-500"><Headphones className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Support</h4>
              <p className="text-xs text-gray-400">Dedicated assistance anytime you need</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-gray-800 text-sm">
          <div>
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">About Yana Bazar</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Who We Are</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press & News</a></li>
              <li><a href="#" className="hover:text-white">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Help & Support</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Payments & UPI</a></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Consumer Policy</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white">Security & Fraud</a></li>
              <li><a href="#" className="hover:text-white">EPR Compliance</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Top Categories</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Electronics & Audio</a></li>
              <li><a href="#" className="hover:text-white">Mobiles & Laptops</a></li>
              <li><a href="#" className="hover:text-white">Fashion & Apparel</a></li>
              <li><a href="#" className="hover:text-white">Home & Kitchen</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Experience Yana Bazar App</h5>
            <p className="text-xs text-gray-400 mb-4">Get real-time deal alerts and fast checkout on Android & iOS.</p>
            <div className="bg-yana-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl text-center cursor-pointer hover:bg-yana-600 transition shadow">
              Download Mobile App
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Yana Bazar India Private Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
