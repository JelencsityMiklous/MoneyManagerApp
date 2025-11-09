import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  newPassword: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  updateProfile() {
    if (this.newPassword.trim()) {
      this.authService.updatePassword(this.newPassword);
      this.newPassword = '';
      alert('✅ Jelszó frissítve!');
    }
    this.authService.updateName(this.user.name);
    alert('✅ Név frissítve!');
  }
}
