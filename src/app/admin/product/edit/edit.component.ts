import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductCategoryService } from '../../service/product-category/product-category.service';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  updateForm: FormGroup;
  product_categories = [];
  product_image;
  product_id;

  constructor(
    private fb: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      product_category_id: ['', Validators.required],
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      product_image: [''],
      product_image_source: [''],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      product_image_removed: ['']
    });

    this.productCategoryService.getProductCatgories().subscribe(res => {
      if (res) {
        this.product_categories = res['product_category_list'];
      }
    })

    this.route.params.subscribe(params => {
      const postId = params['id'];
      this.product_id = postId;
      this.productService.getProduct(this.product_id).subscribe(res => {
        if (res) {
          this.editProduct(res['product']);
        }
      });
    });
  }

  editProduct(product) {
    this.updateForm.patchValue({
      product_category_id: product?.product_category_id,
      product_name: product?.product_name,
      product_description: product?.product_description,
      stock: product?.stock,
      price: product?.price
    });

    this.product_image = product?.product_image;
  }

  getImage(event) {
    const control = this.updateForm.controls['product_image'];

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.updateForm.patchValue({
          product_image_source: event.target.result,
          product_image_removed: false
        });
        this.product_image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submit() {
    this.productService.updateProduct(this.product_id, this.updateForm.value).subscribe(res => {
      if(res) {
        this.toastr.success('Product Updated', 'Success !');
        this.updateForm.reset();
        this.router.navigate(['/admin/products']);
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
    });
  }
}
