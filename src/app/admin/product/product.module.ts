import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ProductComponent } from './product.component';
import { adminProductRoutingModule } from './product.routing';

const components = [
  ProductComponent,
  CreateComponent,
  EditComponent
];

@NgModule({
    declarations: components,
    imports: [
        adminProductRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: components
})

export class adminProductModule { }