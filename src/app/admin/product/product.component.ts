import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products = [];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      if(res) {
        this.products = res['product_list'];
      }
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(res => {
      if(res) {
        this.toastr.success('Product Removed', 'Sucess!');
        this.getProducts();
      }
    }, err => {
      let fields = err.error.errors;
      if (fields) {
        if (Object.keys(fields).length > 0) {
          let list = new String("");
          Object.keys(fields).map(
            key => {
              let message = fields[key];
              Object.keys(message).map(
                msg_index => {
                  list = list.concat(new String(`${message[msg_index]} <br>`).toString());
                }
              );
            }
          );
          this.toastr.error(`${list}`, 'Error !', { enableHtml: true, progressBar: true });
        } else {
          this.toastr.error('common error', 'Error !', { progressBar: true });
        }
      } else {
        this.toastr.error('common error', 'Error !', { progressBar: true });
      }
    })
  }

}
