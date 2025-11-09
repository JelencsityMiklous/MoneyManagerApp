import { Component, OnInit } from '@angular/core';
import { AuthService, AppUser } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: AppUser[] = [];
  constructor(private auth: AuthService) {}
  ngOnInit(){
    const raw = localStorage.getItem('mm_users');
    this.users = raw ? JSON.parse(raw) : [];
  }

  refresh(){ const raw = localStorage.getItem('mm_users'); this.users = raw ? JSON.parse(raw) : []; }

  deleteUser(u: AppUser){
    if (!confirm('Tényleg törlöd a felhasználót?')) return;
    let users = this.users.filter(x=> x.id !== u.id);
    localStorage.setItem('mm_users', JSON.stringify(users));

    const cur = this.auth.getCurrentUser();
    if (cur && cur.id === u.id) this.auth.logout();
    this.refresh();
  }

  resetWallet(u: AppUser){
    if (!confirm('Alaphelyzetbe állítod a pénztárcát?')) return;
    u.wallet = { balance:0, income:0, expense:0 };
    const users = JSON.parse(localStorage.getItem('mm_users') || '[]');
    const idx = users.findIndex(x=>x.id===u.id);
    if (idx>=0){ users[idx] = u; localStorage.setItem('mm_users', JSON.stringify(users)); }
    this.refresh();
  }

  toggleAdmin(u: AppUser){
    if (!confirm('Jogosultság módosítása?')) return;
    u.isAdmin = !u.isAdmin;
    const users = JSON.parse(localStorage.getItem('mm_users') || '[]');
    const idx = users.findIndex(x=>x.id===u.id);
    if (idx>=0){ users[idx] = u; localStorage.setItem('mm_users', JSON.stringify(users)); }

    const cur = this.auth.getCurrentUser();
    if (cur && cur.id === u.id) this.auth.updateCurrent(u);
    this.refresh();
  }
}