import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart_items;

  constructor() { }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    return this.cart_items = Cart.getCartItems(); 
  }

  remove_product(item) {
    Cart.removeCartItem(item);
  }

  value = 0;

  handleMinus() {
    if(this.value != 0) {
      this.value--;
    }  
  }
  handlePlus() {
    this.value++;    
  }

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
