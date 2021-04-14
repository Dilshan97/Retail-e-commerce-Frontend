import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  item_count;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.item_count = JSON.parse(localStorage.getItem('cart'));
  }


  logout() {
    this.authService.logout().subscribe(res => {
      if(res) {
        console.log('successfully logout');
      }
    });
  }

  navbarToggle() {
    var aside2 = document.getElementById('navbarNav');
    aside2.classList.toggle("dis-block");
  }

  profileToggle() {
    var aside2 = document.getElementById('profile');
    aside2.classList.toggle("dis-block");
  }
}
