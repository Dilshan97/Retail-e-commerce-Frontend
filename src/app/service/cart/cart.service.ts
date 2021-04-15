import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCart() {
    return new BehaviorSubject(JSON.parse(localStorage.getItem('cart')));
  }
}
