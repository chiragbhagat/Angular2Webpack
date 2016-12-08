import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent }    from './Products-list.component';
import { ProductsEditComponent }  from './Products-edit.component';
//import { ProductsAddComponent }  from './Products-add.component';

const ProductsRoutes: Routes = [
  { path: 'products',  component: ProductsListComponent },
  //{ path: 'Products/add', component: ProductsAddComponent },
  { path: 'products/:id', component: ProductsEditComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ProductsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
