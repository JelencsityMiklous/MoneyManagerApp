import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name=''; email=''; password=''; confirm='';
  constructor(private router: Router, private auth: AuthService) {}
  onSubmit(){
    if(!this.name||!this.email||!this.password){ alert('Töltsd ki az összes mezőt!'); return; }
    if(this.password !== this.confirm){ alert('A jelszavak nem egyeznek.'); return; }
    const res = this.auth.register(this.name, this.email, this.password);
    alert(res.message);
    if(!res.success){
      // ha már regisztrált, irány a bejelentkezés
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/']);
  }
}