import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegionListComponent }    from './region-list.component';
import { RegionEditComponent }  from './region-edit.component';
import { RegionAddComponent }  from './region-add.component';

const RegionRoutes: Routes = [
  { path: 'region',  component: RegionListComponent },
  { path: 'region/add', component: RegionAddComponent },
  { path: 'region/:id', component: RegionEditComponent },
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
