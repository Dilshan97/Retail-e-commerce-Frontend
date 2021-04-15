import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { productRoutingModule } from './product.routing';
import { ViewProductComponent } from './view-product/view-product.component';
import { SingleProductComponent } from './single-product/single-product.component';

const components = [
    ProductComponent,
    ViewProductComponent,
    SingleProductComponent
];

@NgModule({
    declarations: [
        components   
    ],
    imports: [
        productRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: components
})

export class productModule { }