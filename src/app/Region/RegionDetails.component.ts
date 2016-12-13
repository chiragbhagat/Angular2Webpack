import { Component, OnInit, HostBinding, EventEmitter, Input, Output,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ToastsManager }  from 'ng2-toastr';

import { RegionData, RegionService }  from './Region.service';


@Component({
  templateUrl: './RegionDetails.component.html',
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

export class RegionDetailsComponent implements OnInit {
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

	deleteRegion(id: number) {
		if (window.confirm('Are you sure you want to delete this Region?') == true)
		{
			this.RegionService.deleteRegion(this.objRegion.RegionID.toString())
			.subscribe(record => this.router.navigate(['/Region']),
				error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error,
				() => { console.log('Region record deleted successfully...'); }
			);
		}
	}
	gotoRegionEdit() {
		this.router.navigate(['/Region', this.objRegion.RegionID]);
	}

	gotoRegion() {
		this.router.navigate(['/Region']);
	}


	getLookups() {

	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
