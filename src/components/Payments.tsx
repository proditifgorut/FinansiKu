import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, Wallet, QrCode, CheckCircle } from 'lucide-react';

const Payments: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const paymentMethods = [
    { id: 'card', name: 'Kartu Kredit/Debit', icon: CreditCard, color: 'blue' },
    { id: 'ewallet', name: 'E-Wallet', icon: Smartphone, color: 'purple' },
    { id: 'bank', name: 'Transfer Bank', icon: Building2, color: 'green' },
    { id: 'cash', name: 'Saldo FinansiKu', icon: Wallet, color: 'orange' },
    { id: 'qris', name: 'QRIS', icon: QrCode, color: 'red' },
  ];

  const handlePayment = () => {
    if (selectedMethod && amount) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAmount('');
        setSelectedMethod('');
      }, 3000);
    }
  };

  const formatCurrency = (value: string) => {
    const number = parseInt(value.replace(/\D/g, ''));
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('id-ID').format(number);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Pembayaran</h2>
        <p className="text-gray-600 mt-1">Pilih metode pembayaran Anda</p>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center space-x-4">
          <div className="bg-green-500 p-3 rounded-full">
            <CheckCircle size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-green-800">Pembayaran Berhasil!</h3>
            <p className="text-green-700">Transaksi Anda telah diproses</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Metode Pembayaran</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
                      selectedMethod === method.id
                        ? `border-${method.color}-500 bg-${method.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`p-3 rounded-lg bg-${method.color}-100`}>
                      <Icon size={24} className={`text-${method.color}-600`} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">{method.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedMethod === 'card' && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Detail Kartu</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Kartu</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kadaluarsa</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'ewallet' && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Pilih E-Wallet</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['GoPay', 'OVO', 'DANA', 'ShopeePay'].map((wallet) => (
                  <button key={wallet} className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
                    <p className="font-semibold text-gray-800">{wallet}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedMethod === 'bank' && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Pilih Bank</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga', 'Permata'].map((bank) => (
                  <button key={bank} className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                    <p className="font-semibold text-gray-800">{bank}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Ringkasan Pembayaran</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Pembayaran</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(formatCurrency(e.target.value))}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">Rp {amount || '0'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Biaya Admin</span>
                  <span className="font-semibold">Rp 0</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">Rp {amount || '0'}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedMethod || !amount}
                className={`w-full py-4 rounded-lg font-bold transition-colors ${
                  selectedMethod && amount
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Bayar Sekarang
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Aman & Terpercaya</strong><br />
                Semua transaksi dilindungi dengan enkripsi SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
