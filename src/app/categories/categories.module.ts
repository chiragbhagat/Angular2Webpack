import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { CategoriesListComponent }    from './categories-list.component';
import { CategoriesEditComponent }  from './categories-edit.component';
import { CategoriesService } from './categories.service';

import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoriesListComponent,
    CategoriesEditComponent
  ],
  providers: [
    CategoriesService
  ]
})
export class CategoriesModule {}
