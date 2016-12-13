/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: RegionModule
 * Purpose		: Module for Region.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { RegionService } from './Region.service';
import { RegionListComponent } from './RegionList.component';
import { RegionAddComponent } from './RegionAdd.component';
import { RegionEditComponent } from './RegionEdit.component';
import { RegionDetailsComponent } from './RegionDetails.component';

import { RegionRoutingModule } from './Region-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegionRoutingModule
  ],
  declarations: [
    RegionListComponent,
    RegionEditComponent,
    RegionAddComponent,
	RegionDetailsComponent
  ],
  providers: [
    RegionService
  ]
})

export class RegionModule { }
