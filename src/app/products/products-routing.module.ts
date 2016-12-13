import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './ProductsList.component';
import { ProductsAddComponent }  from './ProductsAdd.component';
import { ProductsEditComponent } from './ProductsEdit.component';
import { ProductsDetailsComponent } from './ProductsDetails.component';

const ProductsRoutes: Routes = [
	{ path: 'Products',  component: ProductsListComponent },
	{ path: 'Products/add', component: ProductsAddComponent },
	{ path: 'Products/:id', component: ProductsEditComponent },
	{ path: 'Products/Details/:id', component: ProductsDetailsComponent },
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
