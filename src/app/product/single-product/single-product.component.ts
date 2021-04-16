import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product/product.service';
import { Cart } from 'src/app/shared/cart';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product_slug;
  product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const postSlug = params['slug'];
      this.product_slug = postSlug;
      this.productService.getProductsBySlug(this.product_slug ).subscribe(res => {
        if (res) {
          this.product = res['product'];
        }
      }, err => {
        console.log(err);
      });
    });
  }

  addToCart(product) {
    Cart.addToCart(product);
    this.toastr.success('Item added to the cart', 'Success !');
  }

  transformText(slug) {
    return slug.replace('-', ' ');
  }

}
