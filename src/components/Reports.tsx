import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction } from '../types';

interface ReportsProps {
  transactions: Transaction[];
}

const Reports: React.FC<ReportsProps> = ({ transactions }) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const monthlyData = [
    { bulan: 'Jan', pemasukan: 15000000, pengeluaran: 8000000 },
    { bulan: 'Feb', pemasukan: 18000000, pengeluaran: 9500000 },
    { bulan: 'Mar', pemasukan: 22000000, pengeluaran: 11000000 },
    { bulan: 'Apr', pemasukan: 19000000, pengeluaran: 10500000 },
    { bulan: 'Mei', pemasukan: 25000000, pengeluaran: 12000000 },
    { bulan: 'Jun', pemasukan: 28000000, pengeluaran: 13500000 },
  ];

  const categoryData = [
    { name: 'Gaji', value: 45000000, color: '#3b82f6' },
    { name: 'Freelance', value: 15000000, color: '#8b5cf6' },
    { name: 'Investasi', value: 8000000, color: '#10b981' },
    { name: 'Belanja', value: 12000000, color: '#ef4444' },
    { name: 'Makan', value: 8500000, color: '#f59e0b' },
    { name: 'Transport', value: 5000000, color: '#06b6d4' },
    { name: 'Hiburan', value: 4000000, color: '#ec4899' },
  ];

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Laporan Keuangan</h2>
          <p className="text-gray-600 mt-1">Analisis dan statistik keuangan Anda</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Calendar size={20} />
            <span>Pilih Periode</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Download size={20} />
            <span>Ekspor</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Total Pemasukan</p>
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp size={20} className="text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalIncome)}</h3>
          <p className="text-sm text-green-600 mt-2">+12% dari bulan lalu</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Total Pengeluaran</p>
            <div className="bg-red-100 p-2 rounded-lg">
              <TrendingDown size={20} className="text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalExpense)}</h3>
          <p className="text-sm text-red-600 mt-2">+8% dari bulan lalu</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Tingkat Tabungan</p>
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{savingsRate}%</h3>
          <p className="text-sm text-blue-600 mt-2">Target: 20%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Tren Pemasukan & Pengeluaran</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="bulan" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="pemasukan" fill="#10b981" name="Pemasukan" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pengeluaran" fill="#ef4444" name="Pengeluaran" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Distribusi Kategori</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 lg:col-span-2">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Grafik Saldo Bulanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="bulan" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="pemasukan" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Pemasukan"
                dot={{ fill: '#10b981', r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="pengeluaran" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Pengeluaran"
                dot={{ fill: '#ef4444', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Ringkasan Kategori</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Kategori</th>
                <th className="text-right py-3 px-4 text-gray-600 font-semibold">Jumlah</th>
                <th className="text-right py-3 px-4 text-gray-600 font-semibold">Persentase</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((category, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="font-medium text-gray-800">{category.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-800">
                    {formatCurrency(category.value)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {((category.value / categoryData.reduce((sum, c) => sum + c.value, 0)) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
