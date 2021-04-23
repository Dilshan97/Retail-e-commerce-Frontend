import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductCategoryService } from '../../service/product-category/product-category.service';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  product_categories = [];
  product_image;
  loading;

  constructor(
    private fb: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      product_category_id: ['', Validators.required],
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      product_image: ['', Validators.required],
      product_image_source: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    });

    this.loading = true;
    this.productCategoryService.getProductCatgories().subscribe(res => {
      if(res) {
        this.product_categories = res['product_category_list'];
        this.loading = false;
      }
    })
  }

  getImage(event) {
    const control = this.createForm.controls['product_image'];
     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.createForm.patchValue({
          product_image_source: event.target.result
        });
        this.product_image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submit() {
    this.loading = true;
    this.productService.createProduct(this.createForm.value).subscribe(res => {
      if(res) {
        this.toastr.success('Product Added', 'Success !');
        this.createForm.reset();
        this.router.navigate(['/admin/products']);
        this.loading = false;
      }
    }, err => {
      this.loading = false;
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
    });
  }

}
