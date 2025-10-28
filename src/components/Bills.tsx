import React, { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import { Bill } from '../types';

interface BillsProps {
  bills: Bill[];
}

const Bills: React.FC<BillsProps> = ({ bills }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>('all');

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

  const filteredBills = bills.filter(bill => 
    filterStatus === 'all' || bill.status === filterStatus
  );

  const totalUnpaid = bills.filter(b => b.status === 'unpaid' || b.status === 'overdue')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Tagihan</h2>
          <p className="text-gray-600 mt-1">Kelola semua tagihan Anda</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors shadow-md">
          <Plus size={20} />
          <span>Tambah Tagihan</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Total Tagihan Belum Lunas</p>
            <h3 className="text-3xl font-bold mt-2">{formatCurrency(totalUnpaid)}</h3>
            <p className="text-orange-100 text-sm mt-2">
              {bills.filter(b => b.status === 'unpaid' || b.status === 'overdue').length} tagihan menunggu pembayaran
            </p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <AlertCircle size={32} />
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilterStatus('unpaid')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filterStatus === 'unpaid' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Belum Bayar
        </button>
        <button
          onClick={() => setFilterStatus('overdue')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filterStatus === 'overdue' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Terlambat
        </button>
        <button
          onClick={() => setFilterStatus('paid')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filterStatus === 'paid' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Lunas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBills.map((bill) => (
          <div key={bill.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{bill.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{bill.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                bill.status === 'paid' ? 'bg-green-100 text-green-700' :
                bill.status === 'overdue' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {bill.status === 'paid' ? 'Lunas' : bill.status === 'overdue' ? 'Terlambat' : 'Belum Bayar'}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(bill.amount)}</p>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Calendar size={16} className="mr-2" />
              <span>Jatuh tempo: {formatDate(bill.dueDate)}</span>
            </div>

            {bill.recurring && (
              <div className="flex items-center text-sm text-blue-600 mb-4">
                <Clock size={16} className="mr-2" />
                <span>Tagihan berulang</span>
              </div>
            )}

            <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
              bill.status === 'paid' 
                ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`} disabled={bill.status === 'paid'}>
              {bill.status === 'paid' ? 'Sudah Dibayar' : 'Bayar Sekarang'}
            </button>
          </div>
        ))}
      </div>

      {filteredBills.length === 0 && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
          <p className="text-gray-500">Tidak ada tagihan ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default Bills;
