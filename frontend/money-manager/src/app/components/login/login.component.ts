import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email=''; password='';
  constructor(private router: Router, private auth: AuthService) {}
  onLogin(){
    if(this.email && this.password){
      const res = this.auth.login(this.email, this.password);
      if(res.success){
        alert(res.message);
        this.router.navigate(['/']);
      } else {
        alert(res.message);
      }
    } else alert('Add meg a mezőket!');
  }
}