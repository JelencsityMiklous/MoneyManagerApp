import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
@Component({
  selector: 'app-lose',
  template: `
  <div class="card p-3 shadow-sm">
    <h3>Bukni (hamis pénz)</h3>
    <div class="mb-2"><label>Összeg</label><input type="number" class="form-control" [(ngModel)]="amount"></div>
    <button class="btn btn-danger" (click)="do()">Levon</button>
  </div>
  `
})
export class LoseComponent {
  amount = 0;
  constructor(private tx: TransactionService){}
  do(){ if(this.amount>0){ this.tx.spend(this.amount); alert('Levontuk.'); this.amount=0; } }
}