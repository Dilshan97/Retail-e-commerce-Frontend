import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getProductsByCategory(slug) {
    return this.http.get(environment.product_microservice_url + `/product/category/${slug}`);
  }

  getProductsBySlug(slug) {
    return this.http.get(environment.product_microservice_url + `/product/get-product/${slug}`);
  }
}
