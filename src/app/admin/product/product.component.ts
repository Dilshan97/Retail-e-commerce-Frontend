import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      if(res) {
        this.products = res['product_list'];
      }
    });
  }

  deleteProduct(id) {
    console.log(id);
    
  }

}
