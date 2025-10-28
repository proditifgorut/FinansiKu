import React from 'react';
import { LayoutDashboard, Receipt, CreditCard, FileText, TrendingUp } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transaksi', icon: TrendingUp },
    { id: 'bills', label: 'Tagihan', icon: Receipt },
    { id: 'payments', label: 'Bayar', icon: CreditCard },
    { id: 'reports', label: 'Laporan', icon: FileText },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === item.id
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <Icon size={22} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
