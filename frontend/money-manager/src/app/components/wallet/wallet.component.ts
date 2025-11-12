import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';

interface Wallet {
  balance: number;
  income: number;
  expense: number;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallet: Wallet = {
    balance: 0,
    income: 0,
    expense: 0
  };

  amount: number = 0;

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.loadWallet();
  }

  loadWallet() {
    this.wallet = {
      balance: this.walletService.getBalance(),
      income: this.walletService.getTotalIncome(),
      expense: this.walletService.getTotalExpense()
    };
  }

  addIncome() {
    if (this.amount > 0) {
      this.walletService.addIncome(this.amount);
      this.loadWallet();
      this.amount = 0;
    }
  }

  addExpense() {
    if (this.amount > 0) {
      this.walletService.addExpense(this.amount);
      this.loadWallet();
      this.amount = 0;
    }
  }
}
