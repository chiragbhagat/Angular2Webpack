// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RegionData, RegionService }  from './region.service';

@Component({
  templateUrl: './region-list.html'
})
export class RegionListComponent implements OnInit {
  RegionList: RegionData[];
  errorMessage: string;

  private selectedId: number;

  constructor(
    private service: RegionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getAll()
    .subscribe(data => this.RegionList = data,
        error =>  this.errorMessage = "There was an error while retrieving records. Error: " + <any>error);
    /*this.RegionList = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getAll();
      });*/
  }

  public getRegion() {
     this.service.getAll()
         .subscribe(data => this.RegionList = data,
        error =>  this.errorMessage = "There was an error while retrieving records. Error: " + <any>error);
  }

  deleteRegion(id: number) {
    if (window.confirm("Are you sure you want to delete this Region?") == true) 
    {
        this.service.deleteRegion(id)
          .subscribe(data => this.getRegion(), 
          error =>  this.errorMessage = "There was an error while deleting record. Error: " + <any>error);

    }
  }

  isSelected(item: RegionData) { 
    return item.RegionID === this.selectedId; 
  }

  onSelect(item: RegionData) {
    this.router.navigate(['/region', item.RegionID]);
  }
}
