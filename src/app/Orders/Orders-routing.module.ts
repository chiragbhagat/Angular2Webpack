/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/8/2016
 * Component	: OrdersRoutingModule
 * Purpose		: Routing module for Orders.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersListComponent } from './OrdersList.component';
import { OrdersAddComponent }  from './OrdersAdd.component';
import { OrdersEditComponent } from './OrdersEdit.component';
import { OrdersDetailsComponent } from './OrdersDetails.component';

const OrdersRoutes: Routes = [
	{ path: 'Orders',  component: OrdersListComponent },
	{ path: 'Orders/add', component: OrdersAddComponent },
	{ path: 'Orders/:id', component: OrdersEditComponent },
	{ path: 'Orders/Details/:id', component: OrdersDetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(OrdersRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class OrdersRoutingModule { }
