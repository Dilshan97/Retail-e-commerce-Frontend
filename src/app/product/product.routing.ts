import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent
    },
    {
        path: 'product/category/:slug',
        component: ViewProductComponent
    },
    {
        path: 'product/:slug',
        component: SingleProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class productRoutingModule { }