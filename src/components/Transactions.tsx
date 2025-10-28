import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Transaksi</h2>
          <p className="text-gray-600 mt-1">Riwayat semua transaksi Anda</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors shadow-md">
          <Plus size={20} />
          <span>Tambah Transaksi</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterType === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pemasukan
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterType === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pengeluaran
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight size={24} className="text-green-600" />
                  ) : (
                    <ArrowDownRight size={24} className="text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{transaction.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{transaction.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                  transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {transaction.status === 'completed' ? 'Selesai' : 
                   transaction.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada transaksi ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
