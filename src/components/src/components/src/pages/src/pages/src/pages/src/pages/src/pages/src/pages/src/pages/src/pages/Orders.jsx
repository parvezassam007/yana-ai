import React from 'react';
import { Package, Truck, CheckCircle2 } from 'lucide-react';

export default function Orders({ orders, onCancelOrder }) {
  const statuses = ["Ordered", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
          <Package className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">No Orders Placed Yet</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-2xl font-black text-gray-900">My Orders ({orders.length})</h1>

      <div className="space-y-6">
        {orders.map(order => {
          const currentStatusIndex = statuses.indexOf(order.status);

          return (
            <div key={order.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-2">
                <div>
                  <span className="text-xs font-bold text-gray-400">Order ID: <strong className="text-gray-900">{order.id}</strong></span>
                  <p className="text-xs text-gray-400">Placed on {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-black text-gray-900">₹{order.total}</span>
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <button 
                      onClick={() => onCancelOrder(order.id)}
                      className="bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img src={item.image || item.images?.[0]} alt={item.title} className="w-16 h-16 object-cover rounded-xl bg-gray-50" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} • ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Tracking Timeline */}
              <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Tracking Status: <span className="text-yana-600 font-black">{order.status}</span></h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {statuses.map((status, sIdx) => {
                    const isCompleted = sIdx <= currentStatusIndex;
                    return (
                      <div key={sIdx} className="space-y-1">
                        <div className={`h-1.5 rounded-full ${isCompleted ? 'bg-yana-500' : 'bg-gray-200'}`}></div>
                        <span className={`text-[10px] font-bold block ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>{status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
