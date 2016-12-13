/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: CategoriesAddComponent
 * Purpose		: This component allows to create new Categories record and save changes.
 * Dependency	: CategoriesService
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Component, EventEmitter, Input, Output, OnInit,
	HostBinding, trigger, transition, animate,
	style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ToastsManager }  from 'ng2-toastr';

import { CategoriesData, CategoriesService } from './Categories.service';


@Component({
	selector: 'my-Categories-add',
	templateUrl: './CategoriesAdd.component.html',
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

export class CategoriesAddComponent implements OnInit {
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
	

  constructor(
    private route: ActivatedRoute,
    private router: Router,
	private toastr: ToastsManager,
    private CategoriesService: CategoriesService

	) {
		this.objCategories = new CategoriesData();
	}

	ngOnInit() {
		this.objCategories = new CategoriesData();
		this.getLookups();
	}

	addCategories() {
		this.CategoriesService.addCategoriesData(this.objCategories)
			.subscribe(record => this.router.navigate(['/Categories']),
			error =>  this.errorMessage = 'There was an error while adding record. Error: ' + <any>error,
			() => { console.log('Categories record added successfully...'); }
		);
	}

	gotoCategories() {
		let Id = this.objCategories ? this.objCategories.CategoryID : null;
		this.toastr.success('Back to Categories List...');
		this.router.navigate(['/Categories']);
	}


	getLookups() {

	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
	