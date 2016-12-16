/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: ProductsModule
 * Purpose		: Module for Products.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ProductsService } from './Products.service';
import { ProductsListComponent } from './ProductsList.component';
import { ProductsAddComponent } from './ProductsAdd.component';
import { ProductsEditComponent } from './ProductsEdit.component';
import { ProductsDetailsComponent } from './ProductsDetails.component';
import { ProductsSearchComponent } from './ProductsSearch.component';

import { ProductsRoutingModule } from './Products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsEditComponent,
    ProductsAddComponent,
	  ProductsDetailsComponent,
    ProductsSearchComponent,
  ],
  providers: [
    ProductsService
  ]
})

export class ProductsModule { }
