import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallet:any = { balance:0, income:0, expense:0 };
  amount=0;
  constructor(private tx: TransactionService, public auth: AuthService,
      
  ) {}
  ngOnInit(){ this.wallet = this.tx.getWallet(); }
  add(){ if(this.amount>0){ this.tx.add(this.amount); this.wallet = this.tx.getWallet(); this.amount=0; } }
  spend(){ if(this.amount>0){ this.tx.spend(this.amount); this.wallet = this.tx.getWallet(); this.amount=0; } }
}