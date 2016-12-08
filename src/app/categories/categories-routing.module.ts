import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesListComponent }    from './categories-list.component';
import { CategoriesEditComponent }  from './categories-edit.component';

const categoriesRoutes: Routes = [
  { path: 'categories',  component: CategoriesListComponent },
  { path: 'categories/:id', component: CategoriesEditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(categoriesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoriesRoutingModule { }
