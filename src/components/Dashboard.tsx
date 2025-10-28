import React from 'react';
import { Wallet, TrendingUp, TrendingDown, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { FinancialSummary, Transaction, Bill } from '../types';

interface DashboardProps {
  summary: FinancialSummary;
  recentTransactions: Transaction[];
  upcomingBills: Bill[];
}

const Dashboard: React.FC<DashboardProps> = ({ summary, recentTransactions, upcomingBills }) => {
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
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mt-1">Ringkasan keuangan Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Saldo Total</p>
              <h3 className="text-2xl font-bold mt-2">{formatCurrency(summary.balance)}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Wallet size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pemasukan</p>
              <h3 className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(summary.totalIncome)}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pengeluaran</p>
              <h3 className="text-2xl font-bold text-red-600 mt-2">{formatCurrency(summary.totalExpense)}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingDown size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tagihan Tertunda</p>
              <h3 className="text-2xl font-bold text-orange-600 mt-2">{summary.pendingBills}</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertCircle size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Transaksi Terbaru</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight size={20} className="text-green-600" />
                      ) : (
                        <ArrowDownRight size={20} className="text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Tagihan Mendatang</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingBills.slice(0, 5).map((bill) => (
                <div key={bill.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{bill.name}</p>
                    <p className="text-sm text-gray-500">Jatuh tempo: {formatDate(bill.dueDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{formatCurrency(bill.amount)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      bill.status === 'paid' ? 'bg-green-100 text-green-700' :
                      bill.status === 'overdue' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {bill.status === 'paid' ? 'Lunas' : bill.status === 'overdue' ? 'Terlambat' : 'Belum Bayar'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
