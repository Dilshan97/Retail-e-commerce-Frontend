import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';

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
    let local_storage;
    let itemsInCart = []
    this.items = {
      product: product,
      quantity: 1,
    }
    if (localStorage.getItem('cart') == null) {
      local_storage = [];
      itemsInCart.push(this.items);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
    }
    else {
      local_storage = JSON.parse(localStorage.getItem('cart'));
      for (var i in local_storage) {
        if (this.items.product.id == local_storage[i].product.id) {
          local_storage[i].quantity += 1;
          this.items = null;
          break;
        }
      }
      if (this.items) {
        itemsInCart.push(this.items);
      }
      local_storage.forEach(function (item) {
        itemsInCart.push(item);
      })
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
    }
  }
}
