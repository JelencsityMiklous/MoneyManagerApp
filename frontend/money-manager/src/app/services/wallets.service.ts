import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WalletsService {
  private apiUrl = 'http://localhost:3000/wallets';

  constructor(private http: HttpClient) {}

  getWallets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
