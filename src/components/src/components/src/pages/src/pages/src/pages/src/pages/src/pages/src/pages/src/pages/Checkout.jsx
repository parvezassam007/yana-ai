import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, CreditCard, Truck } from 'lucide-react';

export default function Checkout({ cart, onPlaceOrder, setActiveTab }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: "Ramesh Kumar",
    phone: "+91 98765 43210",
    street: "Flat 402, Sunshine Apartments, MG Road",
    city: "Bangalore",
    pincode: "560001",
    state: "Karnataka"
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryCharge;

  const handleCompleteOrder = () => {
    const newOrder = {
      id: `YB-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      total: total,
      status: "Ordered",
      items: cart,
      address: `${address.street}, ${address.city} - ${address.pincode}`,
      paymentMethod: paymentMethod
    };
    onPlaceOrder(newOrder);
    setActiveTab('orders');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Stepper Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm">
        {['1. Address', '2. Delivery', '3. Summary', '4. Payment'].map((s, idx) => (
          <div key={idx} className={`text-xs font-bold ${step === idx + 1 ? 'text-yana-600' : 'text-gray-400'}`}>
            {s}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-gray-900">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={address.name} 
                onChange={(e) => setAddress({...address, name: e.target.value})}
                className="bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" 
              />
              <input 
                type="text" 
                placeholder="Phone Number" 
                value={address.phone} 
                onChange={(e) => setAddress({...address, phone: e.target.value})}
                className="bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" 
              />
              <input 
                type="text" 
                placeholder="Street Address" 
                value={address.street} 
                onChange={(e) => setAddress({...address, street: e.target.value})}
                className="md:col-span-2 bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" 
              />
              <input 
                type="text" 
                placeholder="City" 
                value={address.city} 
                onChange={(e) => setAddress({...address, city: e.target.value})}
                className="bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" 
              />
              <input 
                type="text" 
                placeholder="Pincode" 
                value={address.pincode} 
                onChange={(e) => setAddress({...address, pincode: e.target.value})}
                className="bg-gray-100 text-xs font-bold p-3 rounded-xl border border-transparent focus:outline-none" 
              />
            </div>
            <button 
              onClick={() => setStep(2)}
              className="bg-yana-500 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow"
            >
              Save & Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-gray-900">Delivery Speed</h2>
            <div className="p-4 rounded-2xl border-2 border-yana-500 bg-yana-50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-gray-900">Express Delivery (Next Day)</h4>
                <p className="text-xs text-gray-500">Guaranteed delivery by tomorrow, 2:00 PM</p>
              </div>
              <span className="font-black text-yana-600">FREE</span>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="bg-gray-100 font-bold text-xs px-6 py-3 rounded-xl">Back</button>
              <button onClick={() => setStep(3)} className="bg-yana-500 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-gray-900">Order Summary</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-xs font-semibold py-2 border-b border-gray-100">
                  <span>{item.title} (x{item.quantity})</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-between font-black text-gray-900">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="bg-gray-100 font-bold text-xs px-6 py-3 rounded-xl">Back</button>
              <button onClick={() => setStep(4)} className="bg-yana-500 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow">Proceed to Payment</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900">Payment Method (Secure Demo)</h2>
            <div className="space-y-3">
              {['UPI (Google Pay / PhonePe / Paytm)', 'Credit / Debit Card (Razorpay)', 'Cash on Delivery (COD)'].map((method, idx) => (
                <label key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer border border-gray-200">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === method} 
                    onChange={() => setPaymentMethod(method)}
                    className="accent-yana-500"
                  />
                  <span className="text-xs font-bold text-gray-800">{method}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(3)} className="bg-gray-100 font-bold text-xs px-6 py-3 rounded-xl">Back</button>
              <button 
                onClick={handleCompleteOrder}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg"
              >
                Place Order (₹{total})
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
