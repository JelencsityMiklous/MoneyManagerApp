import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AppUser {
  isAdmin?: boolean;
  id: number;
  name: string;
  email: string;
  password: string;
  wallet: { balance: number; income: number; expense: number; };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  [x: string]: any;
  constructor(private router: Router) { this.ensureAdminExists(); }

  private ensureAdminExists() {
    const users = this.readUsers();
    if (!users.find(u => u.email === 'admin@admin')) {
      const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const admin = { id, name: 'Admin', email: 'admin@admin', password: 'admin123', isAdmin: true, wallet: { balance: 0, income: 0, expense: 0 } };
      users.push(admin);
      this.writeUsers(users);
    }
  }


  private usersKey = 'mm_users';
  private currentKey = 'mm_current_user';

  private readUsers(): AppUser[] {
    const raw = localStorage.getItem(this.usersKey);
    return raw ? JSON.parse(raw) : [];
  }
  private writeUsers(u: AppUser[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(u));
  }

  register(name: string, email: string, password: string): { success: boolean, message: string } {
    const users = this.readUsers();
    if (users.find(x => x.email === email)) {
      return { success: false, message: 'Ez az email már regisztrálva van.' };
    }
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const user: AppUser = { id, name, email, password, isAdmin: false, wallet: { balance: 0, income: 0, expense: 0 } };
    users.push(user);
    this.writeUsers(users);
    localStorage.setItem(this.currentKey, JSON.stringify(user));
    return { success: true, message: 'Sikeres regisztráció.' };
  }

  login(email: string, password: string): { success: boolean, message: string } {
    const users = this.readUsers();
    const user = users.find(x => x.email === email && x.password === password);
    if (!user) return { success: false, message: 'Hibás email vagy jelszó.' };
    localStorage.setItem(this.currentKey, JSON.stringify(user));
    return { success: true, message: 'Bejelentkezés sikeres.' };
  }

  logout() {
    localStorage.removeItem(this.currentKey);
    this.router.navigate(['/']);
  }
  
  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.currentKey);
  }

  getCurrentUser(): AppUser | null {
    const raw = localStorage.getItem(this.currentKey);
    return raw ? JSON.parse(raw) as AppUser : null;
  }

  updateCurrent(updated: AppUser) {
    // update both current and stored users
    localStorage.setItem(this.currentKey, JSON.stringify(updated));
    const users = this.readUsers();
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx >= 0) {
      users[idx] = updated;
      this.writeUsers(users);
    }
  }
}