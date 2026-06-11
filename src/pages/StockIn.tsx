import React from 'react';
import { ArrowDownLeft, Save, Search } from 'lucide-react';
import { mockProducts } from '../utils/mockData';

const StockIn = () => {
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [reason, setReason] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Stock In Recorded: ${quantity} units added to ${selectedProduct}`);
    // In a real app, this would update the state or call an API
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
            <ArrowDownLeft size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Stock Inbound</h1>
            <p className="text-gray-500 text-sm">Record new items arriving at the warehouse</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Product</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  required
                >
                  <option value="">Choose a product...</option>
                  {mockProducts.map(p => (
                    <option key={p.id} value={p.name}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source/Reference</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="PO #12345 or Vendor Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Additional details about this movement..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                <Save size={20} />
                Record Stock In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockIn;
