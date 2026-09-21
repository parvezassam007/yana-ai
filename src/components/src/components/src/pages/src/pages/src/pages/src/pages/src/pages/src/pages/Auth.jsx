import React, { useState } from 'react';
import { User, Lock, Mail, Phone } from 'lucide-react';

export default function Auth({ onLogin, setActiveTab }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name || 'Ramesh Kumar',
      email: email || 'ramesh@yanabazar.in',
      phone: phone || '+91 98765 43210'
    };
    onLogin(userData);
    setActiveTab('profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="bg-gradient-to-tr from-yana-600 to-yana-500 text-white font-black text-xl px-3 py-1.5 rounded-xl inline-block shadow">
            YANA
          </div>
          <h2 className="text-xl font-black text-gray-900">{isSignup ? 'Create Account' : 'Sign in to Yana Bazar'}</h2>
          <p className="text-xs text-gray-400">Access your orders, wishlist, and recommendations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-gray-400">Full Name</label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-100 text-xs font-bold pl-10 pr-4 py-3 rounded-xl border border-transparent focus:outline-none focus:border-yana-500"
                  required
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5" />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-gray-400">Email Address</label>
            <div className="relative flex items-center">
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 text-xs font-bold pl-10 pr-4 py-3 rounded-xl border border-transparent focus:outline-none focus:border-yana-500"
                required
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-gray-400">Password</label>
            <div className="relative flex items-center">
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 text-xs font-bold pl-10 pr-4 py-3 rounded-xl border border-transparent focus:outline-none focus:border-yana-500"
                required
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-yana-500 hover:bg-yana-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button 
            onClick={() => setIsSignup(!isSignup)}
            className="text-xs font-bold text-yana-600 hover:underline"
          >
            {isSignup ? 'Already have an account? Sign In' : "New to Yana Bazar? Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}
