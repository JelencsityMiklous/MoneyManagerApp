import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { TransactionService } from './services/transaction.service';
import { GainComponent } from './components/gain/gain.component';
import { LoseComponent } from './components/lose/lose.component';
import { AdminComponent } from './components/admin/admin.component';
import { GameComponent } from './components/game/game.component';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WalletComponent } from './components/wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    GainComponent,
    LoseComponent,
    AdminComponent,
    GameComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
