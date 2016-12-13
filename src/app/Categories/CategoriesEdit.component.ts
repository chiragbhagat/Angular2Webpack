/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: CategoriesEditComponent
 * Purpose		: This component retrieves data for the specified record id and allows to edit and save changes.
 * Dependency	: CategoriesService
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Component, OnInit, HostBinding, EventEmitter, Input, Output,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ToastsManager }  from 'ng2-toastr';

import { CategoriesData, CategoriesService }  from './Categories.service';



@Component({
  templateUrl: './CategoriesEdit.component.html',
  providers: [CategoriesService
	
	],
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

	// @HostBinding('style.position') get position() {
	//  return 'absolute';
	// }
 
	objCategories: CategoriesData;
	errorMessage: string;
	messages: string[];

	// Lookup Arrays
	

	constructor(private route: ActivatedRoute, 
		private router: Router,
		private toastr: ToastsManager,
		private CategoriesService: CategoriesService

	) {
		// this.id = parseInt(params.get('id'));
		this.objCategories = new CategoriesData();
	}

	ngOnInit() {
		this.route.params
		// (+) converts string 'id' to a number
		// .switchMap((params: Params) => this.CategoriesService.getByID(+params['id']))
		.switchMap((params: Params) => this.CategoriesService.getByID(params['id']))
		.subscribe((item: CategoriesData) => this.objCategories = item);
		this.getLookups();
	}

	updateCategories() {
		this.CategoriesService.updateCategoriesData(this.objCategories)
			.subscribe(record => this.router.navigate(['/Categories']),
				error =>  this.errorMessage = 'There was an error while updating record. Error: ' + <any>error,
				() => { console.log('Categories record updated successfully...'); }
			);
	}
  
	deleteCategories(id: string) {
		if (window.confirm('Are you sure you want to delete this Categories?') == true) 
		{
			this.CategoriesService.deleteCategories(this.objCategories.CategoryID.toString())
			.subscribe(record => this.router.navigate(['/Categories']),
				error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error,
				() => { console.log('Categories record deleted successfully...'); }
			);
		}
	}

	gotoCategories() {
		let Id = this.objCategories ? this.objCategories.CategoryID : null;
		this.router.navigate(['/Categories']);
	}


	getLookups() {

	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
