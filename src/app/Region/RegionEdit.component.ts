/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: RegionEditComponent
 * Purpose		: This component retrieves data for the specified record id and allows to edit and save changes.
 * Dependency	: RegionService
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

import { RegionData, RegionService }  from './Region.service';



@Component({
  templateUrl: './RegionEdit.component.html',
  providers: [RegionService
	
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

export class RegionEditComponent implements OnInit {
	@HostBinding('@routeAnimation') get routeAnimation() {
		return true;
	}

	@HostBinding('style.display') get display() {
		return 'block';
	}

	// @HostBinding('style.position') get position() {
	//  return 'absolute';
	// }
 
	objRegion: RegionData;
	errorMessage: string;
	messages: string[];

	// Lookup Arrays
	

	constructor(private route: ActivatedRoute, 
		private router: Router,
		private toastr: ToastsManager,
		private RegionService: RegionService

	) {
		// this.id = parseInt(params.get('id'));
		this.objRegion = new RegionData();
	}

	ngOnInit() {
		this.route.params
		// (+) converts string 'id' to a number
		// .switchMap((params: Params) => this.RegionService.getByID(+params['id']))
		.switchMap((params: Params) => this.RegionService.getByID(params['id']))
		.subscribe((item: RegionData) => this.objRegion = item);
		this.getLookups();
	}

	updateRegion() {
		this.RegionService.updateRegionData(this.objRegion)
			.subscribe(record => this.router.navigate(['/Region']),
				error =>  this.errorMessage = 'There was an error while updating record. Error: ' + <any>error,
				() => { console.log('Region record updated successfully...'); }
			);
	}
  
	deleteRegion(id: string) {
		if (window.confirm('Are you sure you want to delete this Region?') == true) 
		{
			this.RegionService.deleteRegion(this.objRegion.RegionID.toString())
			.subscribe(record => this.router.navigate(['/Region']),
				error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error,
				() => { console.log('Region record deleted successfully...'); }
			);
		}
	}

	gotoRegion() {
		let Id = this.objRegion ? this.objRegion.RegionID : null;
		this.router.navigate(['/Region']);
	}


	getLookups() {

	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
