import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  wallet: {
    balance: number;
    income: number;
    expense: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly usersKey = 'users';
  private readonly currentKey = 'currentUser';

  constructor(private router: Router) {
    this.ensureAdmin();
  }

  // ✅ Ha nincs admin, automatikusan létrehozza
  private ensureAdmin() {
    const users = this.getAllUsers();
    if (!users.find(u => u.email === 'admin@admin.com')) {
      users.push({
        id: 1,
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin123',
        isAdmin: true,
        wallet: { balance: 100000, income: 0, expense: 0 }
      });
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }

  getAllUsers(): User[] {
    const raw = localStorage.getItem(this.usersKey);
    return raw ? JSON.parse(raw) : [];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.currentKey);
    return raw ? JSON.parse(raw) : null;
  }

  // ✅ bejelentkezés
  login(email: string, password: string) {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.currentKey, JSON.stringify(user));
      return { success: true, message: 'Sikeres bejelentkezés!' };
    }
    return { success: false, message: 'Hibás email vagy jelszó!' };
  }

  // ✅ regisztráció random kezdő pénzzel
  register(name: string, email: string, password: string) {
    const users = this.getAllUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Ez az email már regisztrálva van.' };
    }

    const randomBalance = Math.floor(Math.random() * 20000) + 1000;
    const user: User = {
      id: users.length + 1,
      name,
      email,
      password,
      isAdmin: false,
      wallet: {
        balance: randomBalance,
        income: randomBalance / 2,
        expense: randomBalance / 3
      }
    };
    users.push(user);
    this.saveUsers(users);
    localStorage.setItem(this.currentKey, JSON.stringify(user));
    return { success: true, message: 'Sikeres regisztráció!' };
  }

  logout() {
    localStorage.removeItem(this.currentKey);
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.currentKey);
  }

  // ✅ név és jelszó frissítése
  updateName(newName: string) {
    const user = this.getCurrentUser();
    if (user) {
      user.name = newName;
      this.saveUser(user);
    }
  }

  updatePassword(newPass: string) {
    const user = this.getCurrentUser();
    if (user) {
      user.password = newPass;
      this.saveUser(user);
    }
  }

  saveUser(user: User) {
    localStorage.setItem(this.currentKey, JSON.stringify(user));
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.saveUsers(users);
    }
  }
}
