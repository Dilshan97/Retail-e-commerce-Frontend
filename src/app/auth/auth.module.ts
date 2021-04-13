import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { authRoutingModule } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const components = [
    AuthComponent,
    LoginComponent,
    RegisterComponent
];

@NgModule({
    declarations: components,
    imports: [
        authRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: components
})

export class authModule { }