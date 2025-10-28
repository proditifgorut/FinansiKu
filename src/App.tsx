import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Bills from './components/Bills';
import Payments from './components/Payments';
import Reports from './components/Reports';
import { generateTransactions, generateBills } from './data/mockData';
import { Transaction, Bill, FinancialSummary } from './types';
import { Menu, X, Bell, User } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    pendingBills: 0,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mockTransactions = generateTransactions();
    const mockBills = generateBills();
    
    setTransactions(mockTransactions);
    setBills(mockBills);

    const totalIncome = mockTransactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = mockTransactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingBills = mockBills.filter(b => b.status !== 'paid').length;

    setSummary({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      pendingBills,
    });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            summary={summary}
            recentTransactions={transactions.slice(0, 5)}
            upcomingBills={bills.filter(b => b.status !== 'paid').slice(0, 5)}
          />
        );
      case 'transactions':
        return <Transactions transactions={transactions} />;
      case 'bills':
        return <Bills bills={bills} />;
      case 'payments':
        return <Payments />;
      case 'reports':
        return <Reports transactions={transactions} />;
      default:
        return <Dashboard summary={summary} recentTransactions={transactions} upcomingBills={bills} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-600 hover:text-gray-800"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-bold text-gray-800 md:hidden">FinansiKu</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <span className="hidden md:block font-medium text-gray-800">Pengguna</span>
              </button>
            </div>
          </div>
        </header>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 p-4">
            <nav className="space-y-2">
              {['dashboard', 'transactions', 'bills', 'payments', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
