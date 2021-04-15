import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaymentCardModule } from 'ngx-payment-card';
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
        CommonModule,
        FormsModule,
        NgxPaymentCardModule
    ],
    exports: components
})

export class cartModule { }