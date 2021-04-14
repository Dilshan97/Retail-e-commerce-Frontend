import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ProductCategoryService } from 'src/app/service/product_category/product-category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  item_count;
  product_categories = [];

  constructor(
    public authService: AuthService,
    public productCategoryService: ProductCategoryService
  ) { }

  ngOnInit() {
    this.item_count = JSON.parse(localStorage.getItem('cart'));

    this.productCategoryService.getProductCatgories().subscribe(res => {
      if(res) {
        this.product_categories = res['product_category_list'];
      }
    }, err => {
      console.log(err);
    });
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
