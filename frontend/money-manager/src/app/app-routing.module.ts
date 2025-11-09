import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameComponent } from './components/game/game.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'wallets', component: WalletComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'game', component: GameComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}