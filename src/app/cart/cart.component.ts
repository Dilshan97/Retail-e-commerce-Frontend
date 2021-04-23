import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth/auth.service';
import { OrderService } from '../service/order/order.service';
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
  cart_validity;
  loading;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      iban: ['', Validators.required],
      cNumber: ['', Validators.required],
      sc: ['', Validators.required],
      name: ['', Validators.required],
      expire_date: ['', Validators.required]
    });

    this.loading = true;
    this.getItems();
    this.getBill();
    this.loading = false;
  }

  getItems() {
    return this.cart_items = Cart.getCartItems();
  }

  getBill() {
    this.total_bill = Cart.getCartTotal();
  }

  remove_product(item) {
    Cart.removeCartItem(item);
    this.toastr.success('Removed the item from cart', 'Success !');
    this.getBill();
    this.getItems();
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

  changeQty(index, event) {
    let array = JSON.parse(localStorage.getItem('cart'));
    array[index].quantity = Number(event.target.value);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(array));
    this.getItems();
    this.getBill();
  }

  ngDoCheck() {
    if (this.cart_items.length == 0) {
      if (this.cardForm.invalid) {
        this.cart_validity = true;
      }
      else {
        this.cart_validity = false;
      }
    } else {
      this.cart_validity = false;
    }
  }

  checkout() {
    this.loading = true;
    const result = Object.assign({}, { cart_id: Cart.getCartId() }, { card_dtails: this.cardForm.value }, { items: this.cart_items }, { auth: this.authService.authDetails() });

    if(this.authService.isLogged()) {
      this.orderService.createOrder(result).subscribe(res => {
        if (res) {
          this.cardForm.reset();
          localStorage.setItem('cart', JSON.stringify([]));
          localStorage.removeItem('cart_id');
          this.toastr.success('Order Placed', 'Success !');
          this.router.navigate(['/']);
          this.loading = false;
        }
      }, err => {
        console.log(err);
      });
    } else {
      this.toastr.warning('Please signin first', 'Warning !');
      this.router.navigate(['auth/login']);
      this.loading = false;
    }
    
  }
}
