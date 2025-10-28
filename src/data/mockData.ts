import { faker } from '@faker-js/faker/locale/id_ID';
import { Transaction, Bill } from '../types';

export const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const categories = ['Gaji', 'Freelance', 'Investasi', 'Belanja', 'Makan', 'Transport', 'Hiburan', 'Tagihan'];
  
  for (let i = 0; i < 20; i++) {
    const isIncome = Math.random() > 0.6;
    transactions.push({
      id: faker.string.uuid(),
      type: isIncome ? 'income' : 'expense',
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: parseFloat(faker.finance.amount({ min: 50000, max: 5000000, dec: 0 })),
      description: faker.commerce.productName(),
      date: faker.date.recent({ days: 30 }).toISOString(),
      status: faker.helpers.arrayElement(['completed', 'pending', 'cancelled'])
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const generateBills = (): Bill[] => {
  const bills: Bill[] = [];
  const billNames = ['Listrik PLN', 'Internet WiFi', 'Air PDAM', 'Asuransi Kesehatan', 'Cicilan Mobil', 'Kartu Kredit', 'Telepon', 'Netflix'];
  
  for (let i = 0; i < 8; i++) {
    const dueDate = faker.date.soon({ days: 30 });
    const isPaid = Math.random() > 0.5;
    const isOverdue = !isPaid && dueDate < new Date();
    
    bills.push({
      id: faker.string.uuid(),
      name: billNames[i] || faker.company.name(),
      category: faker.helpers.arrayElement(['Utilitas', 'Langganan', 'Cicilan', 'Asuransi']),
      amount: parseFloat(faker.finance.amount({ min: 100000, max: 2000000, dec: 0 })),
      dueDate: dueDate.toISOString(),
      status: isOverdue ? 'overdue' : (isPaid ? 'paid' : 'unpaid'),
      recurring: Math.random() > 0.3
    });
  }
  
  return bills;
};
