import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ProductsListComponent }    from './Products-list.component';
import { ProductsEditComponent }  from './Products-edit.component';
//import { ProductsAddComponent }  from './Products-add.component';
import { ProductsService } from './products.service';

import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsEditComponent,
    //ProductsAddComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule {}
