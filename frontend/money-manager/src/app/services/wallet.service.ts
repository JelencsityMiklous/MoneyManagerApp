import { Injectable } from '@angular/core';

export interface Transaction {
  type: 'income' | 'expense';
  amount: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private balance = 0;
  private transactions: Transaction[] = [];

  constructor() {
    this.loadFromStorage(); // Betöltjük induláskor az adatokat
  }

  // Bevétel hozzáadása
  addIncome(amount: number): void {
    this.balance += amount;
    this.transactions.push({
      type: 'income',
      amount,
      date: new Date().toLocaleString()
    });
    this.saveToStorage();
  }

  // Kiadás hozzáadása
  addExpense(amount: number): void {
    this.balance -= amount;
    this.transactions.push({
      type: 'expense',
      amount,
      date: new Date().toLocaleString()
    });
    this.saveToStorage();
  }

  // Összeg lekérése
  getBalance(): number {
    return this.balance;
  }

  // Bevétel összesen
  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Kiadás összesen
  getTotalExpense(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Tranzakciók lekérése
  getTransactions(): Transaction[] {
    return this.transactions;
  }

  // ===========================
  //  LocalStorage kezelés
  // ===========================

  private saveToStorage(): void {
    const data = {
      balance: this.balance,
      transactions: this.transactions
    };
    localStorage.setItem('walletData', JSON.stringify(data));
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem('walletData');
    if (data) {
      const parsed = JSON.parse(data);
      this.balance = parsed.balance || 0;
      this.transactions = parsed.transactions || [];
    }
  }

  clearWallet(): void {
    this.balance = 0;
    this.transactions = [];
    localStorage.removeItem('walletData');
  }
}
