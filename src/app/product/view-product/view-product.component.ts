import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product_slug;
  products = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const postSlug = params['slug'];
      this.product_slug = postSlug;
      this.productService.getProductsByCategory(this.product_slug ).subscribe(res => {
        if (res) {
          this.products = res['product_list'];
          console.log(res);
        }
      }, err => {
        this.products = [];
        console.log(err);
      });
    });
  }

}
