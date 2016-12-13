/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: RegionRoutingModule
 * Purpose		: Routing module for Region.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegionListComponent } from './RegionList.component';
import { RegionAddComponent }  from './RegionAdd.component';
import { RegionEditComponent } from './RegionEdit.component';
import { RegionDetailsComponent } from './RegionDetails.component';

const RegionRoutes: Routes = [
	{ path: 'Region',  component: RegionListComponent },
	{ path: 'Region/add', component: RegionAddComponent },
	{ path: 'Region/:id', component: RegionEditComponent },
	{ path: 'Region/Details/:id', component: RegionDetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(RegionRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RegionRoutingModule { }
