import React from 'react';
import { User, MapPin, ShieldCheck, LogOut } from 'lucide-react';

export default function Profile({ user, onLogout, setActiveTab }) {
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-16 h-16 bg-yana-50 text-yana-600 font-black text-2xl rounded-2xl flex items-center justify-center shadow-inner">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">{user.name}</h1>
            <p className="text-xs text-gray-500">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setActiveTab('orders')}
            className="p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition flex items-center gap-4"
          >
            <div className="p-3 bg-white rounded-xl shadow-sm text-yana-500"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">My Orders</h4>
              <p className="text-xs text-gray-400">Track, return or buy things again</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('wishlist')}
            className="p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition flex items-center gap-4"
          >
            <div className="p-3 bg-white rounded-xl shadow-sm text-rose-500"><MapPin className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Saved Addresses</h4>
              <p className="text-xs text-gray-400">Manage delivery locations</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            onClick={onLogout}
            className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
