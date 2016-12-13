/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: RegionListComponent
 * Purpose		: This component retrieve paged data and performs paging operations
 * Dependency	: RegionService
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager }  from 'ng2-toastr';

import myGlobals = require('../globals');
import { RegionData, RegionService } from './Region.service';

@Component({
	selector: 'my-Region',
	templateUrl: './RegionList.component.html',
	providers: [RegionService]
})

export class RegionListComponent implements OnInit {
	RegionList: RegionData[];
	newRegion: RegionData;
	selectedRegion: RegionData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;

	sortExpression: string = "RegionID";
	filterExpression: string = "";
	pageIndex: number = 1;
	pageSize: number = 10;
	endRowIndex: number;
	rowsCount: number;
	pageCount: number;
	isFirstPage: boolean;

    private selectedId: string;

	constructor(
		private RegionService: RegionService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastsManager
	) {
		this.newRegion = new RegionData();
		this.pageSize = myGlobals.pageSize;
	}

	ngOnInit() {
		//this.RegionService.getAll().subscribe(record => this.RegionList=record);
		this.getRegionByPaging();
		this.isFirstPage = true;

		/*
		this.RegionList = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				return this.service.getAll();
			});
		*/
	}

	// Get all records
	public getRegion() {
		this.RegionService.getAll()
			.subscribe(data => this.RegionList = data,
		error =>  this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error);
	}

	// Get records by paging
	getRegionByPaging() {
		this.RegionService.getAllByPaging(this.filterExpression, this.pageIndex, this.pageSize)
			.subscribe(data => {
				this.RegionList=data.RegionList;
				this.rowsCount=data.RowsCount;
				this.pageCount= Math.ceil(this.rowsCount / this.pageSize);
				if (this.pageIndex == 1)
					this.isFirstPage = true;
				else
					this.isFirstPage = false;
				if (this.pageIndex == this.pageCount)
					this.endRowIndex = this.rowsCount;
				else
					this.endRowIndex = this.pageIndex * this.pageSize;
			},
			error =>  this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error
		);
	}

	// Adds new record
	addRegion() {
		this.RegionService.addRegionData(this.newRegion).subscribe(record => console.log(record));
		this.getRegion();
	}

	// Updates existing record
	updateRegion() {
		this.RegionService.updateRegionData(this.selectedRegion).subscribe(record => console.log(record));
		this.getRegion();
	}

	// Deletes record with specified id
	deleteRegion(id: string) {
		if (window.confirm('Are you sure you want to delete this Region?') == true)
		{
			this.RegionService.deleteRegion(id)
			.subscribe(data => this.getRegion(),
			error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error);
		}
	}

	// Go to First Page
	onFirstPage() {
		this.pageIndex = 1;
		this.getRegionByPaging();
	}

	// Go to Previous Page
	onPreviousPage() {
		if (this.pageIndex > 1) {
			this.pageIndex = this.pageIndex - 1;
			this.getRegionByPaging();
		}
	}

	// Refresh - Go to First Page
	onRefresh() {
		this.onFirstPage();
	}

	// Go to Next Page
	onNextPage() {
		if (this.pageIndex < this.pageCount) {
			this.pageIndex = this.pageIndex + 1;
			this.getRegionByPaging();
		}
	}

	// Go to Last Page
	onLastPage() {
		this.pageIndex = this.pageCount;
		this.getRegionByPaging();
	}

	// On Edit - Go to Edit page
	onSelect(item: RegionData) {
		this.router.navigate(['/Region', item.RegionID]);
	}

	// On Details - Go to Details page
	onSelectDetails(item: RegionData) {
		this.router.navigate(['/Region/Details', item.RegionID]);
	}

	// Set record as selected
	SelectRegion(item: RegionData) {
		this.selectedRegion = item;
	}

	// Submits form
	submitForm(data: Object) {
		console.log(data);
	}

	// Logs message onto Console
	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
