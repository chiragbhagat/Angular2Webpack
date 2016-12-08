import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RegionData, RegionService }  from './region.service';

@Component({
  templateUrl: './region-edit.html',
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

  //@HostBinding('style.position') get position() {
  //  return 'absolute';
  //}

  objRegion: RegionData;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RegionService
  ) {}

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.service.getByID(+params['id']))
      .subscribe((item: RegionData) => this.objRegion = item);
  }

  updateRegion() {
		this.service.updateRegionData(this.objRegion)
			.subscribe(record => this.router.navigate(['/region']), 
				error =>  this.errorMessage = "There was an error while updating record. Error: " + <any>error,
				() => { console.log("Region record updated successfully..."); }
			);
	}
  
	deleteRegion(id: number) {
		if (window.confirm("Are you sure you want to delete this Region?") == true) 
		{
			this.service.deleteRegion(this.objRegion.RegionID)
			.subscribe(record => this.router.navigate(['/region']),
				error =>  this.errorMessage = "There was an error while deleting record. Error: " + <any>error,
				() => { console.log("Region record deleted successfully..."); }
			);
		}
	}

  gotoRegion() {
    let Id = this.objRegion ? this.objRegion.RegionID : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    this.router.navigate(['/region']);
  }
}
