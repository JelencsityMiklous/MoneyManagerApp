import { Component, OnInit } from '@angular/core';
import { WalletService, Transaction } from '../../services/wallet.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.transactions = this.walletService.getTransactions();
  }
}
