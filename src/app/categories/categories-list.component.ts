// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CategoriesData, CategoriesService }  from './categories.service';

@Component({
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
  CategoriesList: CategoriesData[];
  errorMessage: string;

  private selectedId: number;

  constructor(
    private service: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getAll()
    .subscribe(data => this.CategoriesList = data,
        error =>  this.errorMessage = "There was an error while retrieving records. Error: " + <any>error);
    /*this.CategoriesList = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getAll();
      });*/
  }

  public getCategories() {
     this.service.getAll()
         .subscribe(data => this.CategoriesList = data,
        error =>  this.errorMessage = "There was an error while retrieving records. Error: " + <any>error);
  }

  deleteCategories(id: number) {
    if (window.confirm("Are you sure you want to delete this Categories?") == true) 
    {
        this.service.deleteCategories(id)
          .subscribe(data => this.getCategories(), 
          error =>  this.errorMessage = "There was an error while deleting record. Error: " + <any>error);

    }
  }

  isSelected(item: CategoriesData) { 
    return item.CategoryID === this.selectedId; 
  }

  onSelect(item: CategoriesData) {
    this.router.navigate(['/categories', item.CategoryID]);
  }
}
