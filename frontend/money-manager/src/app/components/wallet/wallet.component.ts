import { Component, OnInit } from '@angular/core';

interface Wallet { id:number; name:string; balance:number; }

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallets: Wallet[] = [];
  name=''; balance=0;
  ngOnInit(){ this.load(); }
  load(){ const raw=localStorage.getItem('mm_wallets'); this.wallets = raw? JSON.parse(raw): []; }
  save(){ localStorage.setItem('mm_wallets', JSON.stringify(this.wallets)); }
  add(){ if(!this.name) return; const id = this.wallets.length? Math.max(...this.wallets.map(w=>w.id))+1:1; this.wallets.push({id, name:this.name, balance:+this.balance}); this.name=''; this.balance=0; this.save(); }
  remove(id:number){ this.wallets = this.wallets.filter(w=>w.id!==id); this.save(); }
}
