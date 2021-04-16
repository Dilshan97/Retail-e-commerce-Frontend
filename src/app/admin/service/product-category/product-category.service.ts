import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getProductCatgories() {
    return this.http.get(environment.product_microservice_url + '/category');
  }
}
