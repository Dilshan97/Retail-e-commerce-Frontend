import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent
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