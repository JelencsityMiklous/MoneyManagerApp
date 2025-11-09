import { Component } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  lastResult: string = '';

  constructor(
    private walletService: WalletService,
    private authService: AuthService
  ) { }

  play(): void {
    // Csak bejelentkezett user játszhat
    if (!this.authService.isLoggedIn) {
      this.lastResult = '⚠️ Jelentkezz be, hogy játszhass!';
      return;
    }


    // Véletlenszerű összeg 100–1000 Ft között
    const randomAmount = Math.floor(Math.random() * 901) + 100;
    const win = Math.random() < 0.5;

    if (win) {
      this.walletService.addIncome(randomAmount);
      this.lastResult = `🎉 Nyertél ${randomAmount} Ft-ot!`;
    } else {
      this.walletService.addExpense(randomAmount);
      this.lastResult = `😢 Elbuktál ${randomAmount} Ft-ot!`;
    }
  }
}
