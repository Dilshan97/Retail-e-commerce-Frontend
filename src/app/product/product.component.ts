import { Component, OnInit } from '@angular/core';
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

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      if (res) {
        this.products = res['product_list'];
      }
    }, err => {
      console.log(err);
    });
  }


  addToCart(product) {
    Cart.addToCart(product);
  }

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
