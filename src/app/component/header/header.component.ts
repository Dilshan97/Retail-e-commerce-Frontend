import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';
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
    public productCategoryService: ProductCategoryService,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.cartService.getCart().subscribe(res => {
      if(res) {
        this.item_count = res;
      }
    });

    this.productCategoryService.getProductCatgories().subscribe(res => {
      if(res) {
        this.product_categories = res['product_category_list'];
      }
    }, err => {
      console.log(err);
    });

  }

  ngDoCheck() {
    this.cartService.getCart().subscribe(res => {
      if(res) {
        this.item_count = res;
      }
    });
  }


  logout() {
    this.authService.logout().subscribe(res => {
      if(res) {
        localStorage.removeItem('auth');
        this.router.navigate(['/']);
        this.toastr.success('Successfuly Logout', 'Success!');
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

  categoryToggle() {
    var aside3 = document.getElementById('category');
    aside3.classList.toggle("dis-block");
  }
}
