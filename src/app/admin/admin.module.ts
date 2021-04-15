import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { adminRoutingModule } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';

const components = [
    AdminComponent,
    DashboardComponent,
    OrderComponent,
];

@NgModule({
    declarations: [
        components   
    ],
    imports: [
        adminRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: components
})

export class adminModule { }