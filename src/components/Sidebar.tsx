import React from 'react';
import { LayoutDashboard, Receipt, CreditCard, FileText, TrendingUp, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transaksi', icon: TrendingUp },
    { id: 'bills', label: 'Tagihan', icon: Receipt },
    { id: 'payments', label: 'Pembayaran', icon: CreditCard },
    { id: 'reports', label: 'Laporan', icon: FileText },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">FinansiKu</h1>
        <p className="text-blue-200 text-sm mt-1">Kelola Keuangan Digital</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-blue-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all">
          <Settings size={20} />
          <span>Pengaturan</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all">
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
