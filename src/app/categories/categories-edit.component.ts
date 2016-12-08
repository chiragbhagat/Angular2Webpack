import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CategoriesData, CategoriesService }  from './categories.service';

@Component({
  templateUrl: './categories-edit.component.html',
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class CategoriesEditComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  //@HostBinding('style.position') get position() {
  //  return 'absolute';
  //}

  objCategories: CategoriesData;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CategoriesService
  ) {}

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.service.getByID(+params['id']))
      .subscribe((item: CategoriesData) => this.objCategories = item);
  }

  	updateCategories() {
		this.service.updateCategoriesData(this.objCategories)
			.subscribe(record => this.router.navigate(['/categories']), 
				error =>  this.errorMessage = "There was an error while updating record. Error: " + <any>error,
				() => { console.log("Categories record updated successfully..."); }
			);
	}
  
	deleteCategories(id: number) {
		if (window.confirm("Are you sure you want to delete this Categories?") == true) 
		{
			this.service.deleteCategories(this.objCategories.CategoryID)
			.subscribe(record => this.router.navigate(['/categories']),
				error =>  this.errorMessage = "There was an error while deleting record. Error: " + <any>error,
				() => { console.log("Categories record deleted successfully..."); }
			);
		}
	}

  gotoCategories() {
    let Id = this.objCategories ? this.objCategories.CategoryID : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    this.router.navigate(['/categories']);
  }
}
