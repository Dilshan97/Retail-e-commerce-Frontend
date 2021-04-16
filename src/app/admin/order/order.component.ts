import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders = [];
  
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(res => {
      if(res) {
        this.orders = res['order_list'];
      }
    });
  }

  getTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += item.item_qty * item.price
    });
    return total;
  }
}
