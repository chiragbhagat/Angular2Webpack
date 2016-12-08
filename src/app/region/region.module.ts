import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { RegionListComponent }    from './region-list.component';
import { RegionEditComponent }  from './region-edit.component';
import { RegionAddComponent }  from './region-add.component';
import { RegionService } from './region.service';

import { RegionRoutingModule } from './region-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegionRoutingModule
  ],
  declarations: [
    RegionListComponent,
    RegionEditComponent,
    RegionAddComponent
  ],
  providers: [
    RegionService
  ]
})
export class RegionModule {}
