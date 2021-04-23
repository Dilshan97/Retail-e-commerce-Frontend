import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../service/product/product.service';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products = [];
  items;
  loading;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.productService.getProducts().subscribe(res => {
      if (res) {
        this.products = res['product_list'];
        this.loading = false;
      }
    }, err => {
      console.log(err);
    });
  }


  addToCart(product) {
    Cart.addToCart(product);
    this.toastr.success('Item added to the cart', 'Success !');
  }

  transform(value: string, limit = 50, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

  scrollDown() {
    window.scroll({ 
      top: 500, 
      left: 0, 
      behavior: 'smooth' 
    });

  }
}
