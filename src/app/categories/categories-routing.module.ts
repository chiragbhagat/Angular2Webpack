/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: CategoriesRoutingModule
 * Purpose		: Routing module for Categories.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesListComponent } from './CategoriesList.component';
import { CategoriesAddComponent }  from './CategoriesAdd.component';
import { CategoriesEditComponent } from './CategoriesEdit.component';
import { CategoriesDetailsComponent } from './CategoriesDetails.component';

const CategoriesRoutes: Routes = [
	{ path: 'Categories',  component: CategoriesListComponent },
	{ path: 'Categories/add', component: CategoriesAddComponent },
	{ path: 'Categories/:id', component: CategoriesEditComponent },
	{ path: 'Categories/Details/:id', component: CategoriesDetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(CategoriesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class CategoriesRoutingModule { }
