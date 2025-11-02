import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email=''; password='';
  constructor(private router: Router) {}
  onLogin(){ if(this.email && this.password){ localStorage.setItem('mm_user', this.email); this.router.navigate(['/']); } else alert('Add meg a mezőket!'); }
}
