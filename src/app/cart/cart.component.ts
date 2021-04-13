import { Component, OnInit } from '@angular/core';

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
    return this.cart_items = JSON.parse(localStorage.getItem('cart')); 
  }

  remove_product(item) {
    let shopping_cart;
    let index;

    shopping_cart = JSON.parse(localStorage.getItem('cart'));

    for(let i in shopping_cart){
      if (item.product.product_name == shopping_cart[i].product.product_name){
        index = i;
      }
    }

    console.log(index);
    
    shopping_cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    this.getItems();
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
}
