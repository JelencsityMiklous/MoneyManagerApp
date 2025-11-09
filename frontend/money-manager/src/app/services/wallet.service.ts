import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private balance: number = 0;
  private totalIncome: number = 0;
  private totalExpense: number = 0;

  constructor() {
    const saved = localStorage.getItem('wallet');
    if (saved) {
      const data = JSON.parse(saved);
      this.balance = data.balance || 0;
      this.totalIncome = data.totalIncome || 0;
      this.totalExpense = data.totalExpense || 0;
    }
  }

  private saveToLocalStorage() {
    const data = {
      balance: this.balance,
      totalIncome: this.totalIncome,
      totalExpense: this.totalExpense
    };
    localStorage.setItem('wallet', JSON.stringify(data));
  }

  getBalance(): number {
    return this.balance;
  }

  getTotalIncome(): number {
    return this.totalIncome;
  }

  getTotalExpense(): number {
    return this.totalExpense;
  }

  addIncome(amount: number): void {
    this.balance += amount;
    this.totalIncome += amount;
    this.saveToLocalStorage();
  }

  addExpense(amount: number): void {
    this.balance -= amount;
    this.totalExpense += amount;
    this.saveToLocalStorage();
  }

  reset(): void {
    this.balance = 0;
    this.totalIncome = 0;
    this.totalExpense = 0;
    this.saveToLocalStorage();
  }
}
