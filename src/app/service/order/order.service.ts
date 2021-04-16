import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  createOrder(order) {
    return this.http.post(environment.order_microservice_url + '/order/create_order', order);
  }

  getOrderByCustomer(customer) {
    return this.http.get(environment.order_microservice_url + `/order/get_order/${customer}`);
  }
}
