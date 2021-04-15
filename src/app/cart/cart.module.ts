import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart.component';
import { cartRoutingModule } from './cart.routing';

const components = [
    CartComponent
];

@NgModule({
    declarations: [
        components
    ],
    imports: [
        cartRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: components
})

export class cartModule { }