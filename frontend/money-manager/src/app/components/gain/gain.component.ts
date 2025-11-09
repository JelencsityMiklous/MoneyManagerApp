import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
@Component({
  selector: 'app-gain',
  template: `
  <div class="card p-3 shadow-sm">
    <h3>Szerezni (hamis pénz)</h3>
    <div class="mb-2"><label>Összeg</label><input type="number" class="form-control" [(ngModel)]="amount"></div>
    <button class="btn btn-success" (click)="do()">Hozzáad</button>
  </div>
  `
})
export class GainComponent {
  amount = 0;
  constructor(private tx: TransactionService){}
  do(){ if(this.amount>0){ this.tx.add(this.amount); alert('Hozzáadva.'); this.amount=0; } }
}