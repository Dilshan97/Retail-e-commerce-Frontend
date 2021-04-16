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

  constructor(
    private fb: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private toast: ToastrService,
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

    this.productCategoryService.getProductCatgories().subscribe(res => {
      if(res) {
        this.product_categories = res['product_category_list'];
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
    this.productService.createProduct(this.createForm.value).subscribe(res => {
      if(res) {
        this.toast.success('Product Added', 'Success !');
        this.createForm.reset();
        this.router.navigate(['/admin/products']);
      }
    });
  }

}
