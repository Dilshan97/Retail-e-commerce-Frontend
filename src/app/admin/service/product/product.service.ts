import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get(environment.product_microservice_url + '/product');
  }

  getProduct(id) {
    return this.http.get(environment.product_microservice_url + `/product/${id}`);
  }

  createProduct(product) {
    return this.http.post(environment.product_microservice_url + '/product/create', product);
  }

  updateProduct(id, product) {
    return this.http.put(environment.product_microservice_url + `/product/update/${id}`, product);
  }

  deleteProduct(id) {
    return this.http.delete(environment.product_microservice_url + `/product/${id}`);
  }
}
