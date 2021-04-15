import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart_items;
  total_bill;
  cardForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      iban: ['', Validators.required],
      cNumber: ['', Validators.required],
      sc: ['', Validators.required],
      name: ['', Validators.required],
      expire_date: ['', Validators.required]
    });

    this.getItems();
    this.getBill();
  }

  onSubmit(){
    console.log(this.cardForm.value)
  }

  getItems() {
    return this.cart_items = Cart.getCartItems();
  }

  getBill() {
    this.total_bill = Cart.getCartTotal();
  }

  remove_product(item) {
    Cart.removeCartItem(item);
    this.getBill();
    this.getItems();
  }

  value = 0;

  handleMinus() {
    if (this.value != 0) {
      this.value--;
    }
  }
  handlePlus() {
    this.value++;
  }

  transform(value: string, limit = 50, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

  flip() {
      var aside2 = document.getElementsByClassName('creditcard');
      aside2[0].classList.add('flipped');
  }

  unflip() {
    var aside2 = document.getElementsByClassName('creditcard');
    aside2[0].classList.remove('flipped');
  }

}
