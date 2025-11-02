import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email='';
  ngOnInit(){ this.email = localStorage.getItem('mm_user') || 'Vendég'; }
}
