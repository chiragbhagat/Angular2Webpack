/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/8/2016
 * Component	: OrdersModule
 * Purpose		: Module for Orders.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { OrdersService } from './Orders.service';
import { OrdersListComponent } from './OrdersList.component';
import { OrdersAddComponent } from './OrdersAdd.component';
import { OrdersEditComponent } from './OrdersEdit.component';
import { OrdersDetailsComponent } from './OrdersDetails.component';

import { OrdersRoutingModule } from './Orders-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrdersListComponent,
    OrdersEditComponent,
    OrdersAddComponent,
	OrdersDetailsComponent
  ],
  providers: [
    OrdersService
  ]
})

export class OrdersModule { }
