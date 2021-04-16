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

  getOrders() {
    return this.http.get(environment.order_microservice_url + '/order');
  }

  getOrderByCustomer(customer) {
    return this.http.get(environment.order_microservice_url + `/order/get_order/${customer}`);
  }
}
