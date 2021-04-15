import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { ProductCategoryService } from 'src/app/service/product_category/product-category.service';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customers = [];
  products = [];
  categories = [];

  constructor(
    private customerService: CustomerService,
    private producService: ProductService,
    private categoryService: ProductCategoryService
  ) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(res => {
      if(res) {
        this.customers = res['customer_list'];
      }
    }, err => {
      console.log(err);
    });

    this.producService.getProducts().subscribe(res => {
      if(res) {
        this.products = res['product_list'];
      }
    });
    
    this.categoryService.getProductCatgories().subscribe(res => {
      if(res) {
        this.categories = res['product_category_list'];
      }
    });
  }

}
