import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTime: string = '';
  balance: number = 0;
  income: number = 0;
  expense: number = 0;

  constructor(private walletService: WalletService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateData();
    setInterval(() => this.updateData(), 1000);
  }

  updateData() {
    this.currentTime = new Date().toLocaleTimeString();
    this.balance = this.walletService.getBalance();
    this.income = this.walletService.getTotalIncome();
    this.expense = this.walletService.getTotalExpense();
  }
}
