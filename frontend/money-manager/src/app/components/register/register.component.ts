import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name=''; email=''; password=''; confirm='';
  constructor(private router: Router) {}
  onSubmit(){ if(!this.name||!this.email||!this.password){ alert('Tölts ki minden mezőt.'); return;} if(this.password!==this.confirm){ alert('A jelszavak nem egyeznek.'); return;} localStorage.setItem('mm_user', this.email); alert('Sikeres regisztráció'); this.router.navigate(['/']); }
}
