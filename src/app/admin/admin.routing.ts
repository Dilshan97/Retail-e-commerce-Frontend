import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: AdminComponent
    },
    {
        path: 'customers',
        component: CustomerComponent
    },
    {
        path: 'orders',
        component: OrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class adminRoutingModule { }