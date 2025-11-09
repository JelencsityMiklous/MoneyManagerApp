import { Injectable } from '@angular/core';
import { AuthService, AppUser } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private auth: AuthService) {}

  getWallet() {
    const user = this.auth.getCurrentUser();
    if (user) return user.wallet;
    // guest state
    const raw = localStorage.getItem('mm_guest_wallet');
    if (raw) return JSON.parse(raw);
    const w = { balance: 0, income: 0, expense: 0 };
    localStorage.setItem('mm_guest_wallet', JSON.stringify(w));
    return w;
  }

  add(amount:number) {
    const user = this.auth.getCurrentUser();
    if (user) {
      user.wallet.income += amount;
      user.wallet.balance += amount;
      this.auth.updateCurrent(user as AppUser);
    } else {
      const w = this.getWallet();
      w.income += amount;
      w.balance += amount;
      localStorage.setItem('mm_guest_wallet', JSON.stringify(w));
    }
  }

  spend(amount:number) {
    const user = this.auth.getCurrentUser();
    if (user) {
      user.wallet.expense += amount;
      user.wallet.balance -= amount;
      this.auth.updateCurrent(user as AppUser);
    } else {
      const w = this.getWallet();
      w.expense += amount;
      w.balance -= amount;
      localStorage.setItem('mm_guest_wallet', JSON.stringify(w));
    }
  }
}