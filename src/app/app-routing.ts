import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./product/product.module').then(m => m.productModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.cartModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.authModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }