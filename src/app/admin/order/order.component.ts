import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  customers = [];
  
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(res => {
      if(res) {
        this.customers = res['customer_list'];
      }
    }, err => {
      console.log(err);
    });
  }

}
