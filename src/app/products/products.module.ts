import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ProductsService } from './Products.service';
import { ProductsListComponent } from './ProductsList.component';
import { ProductsAddComponent } from './ProductsAdd.component';
import { ProductsEditComponent } from './ProductsEdit.component';
import { ProductsDetailsComponent } from './ProductsDetails.component';

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
	ProductsDetailsComponent
  ],
  providers: [
    ProductsService
  ]
})

export class ProductsModule { }
