/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: CategoriesListComponent
 * Purpose		: This component retrieve paged data and performs paging operations
 * Dependency	: CategoriesService
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
import { CategoriesData, CategoriesService } from './Categories.service';

@Component({
	selector: 'my-Categories',
	templateUrl: './CategoriesList.component.html',
	providers: [CategoriesService]
})

export class CategoriesListComponent implements OnInit {
	CategoriesList: CategoriesData[];
	newCategories: CategoriesData;
	selectedCategories: CategoriesData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;

	sortExpression: string = "CategoryID";
	filterExpression: string = "";
	pageIndex: number = 1;
	pageSize: number = 10;
	endRowIndex: number;
	rowsCount: number;
	pageCount: number;
	isFirstPage: boolean;

    private selectedId: string;

	constructor(
		private CategoriesService: CategoriesService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastsManager
	) {
		this.newCategories = new CategoriesData();
		this.pageSize = myGlobals.pageSize;
	}

	ngOnInit() {
		//this.CategoriesService.getAll().subscribe(record => this.CategoriesList=record);
		this.getCategoriesByPaging();
		this.isFirstPage = true;

		/*
		this.CategoriesList = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				return this.service.getAll();
			});
		*/
	}

	// Get all records
	public getCategories() {
		this.CategoriesService.getAll()
			.subscribe(data => this.CategoriesList = data,
		error =>  this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error);
	}

	// Get records by paging
	getCategoriesByPaging() {
		this.CategoriesService.getAllByPaging(this.filterExpression, this.pageIndex, this.pageSize)
			.subscribe(data => {
				this.CategoriesList=data.CategoriesList;
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
	addCategories() {
		this.CategoriesService.addCategoriesData(this.newCategories).subscribe(record => console.log(record));
		this.getCategories();
	}

	// Updates existing record
	updateCategories() {
		this.CategoriesService.updateCategoriesData(this.selectedCategories).subscribe(record => console.log(record));
		this.getCategories();
	}

	// Deletes record with specified id
	deleteCategories(id: string) {
		if (window.confirm('Are you sure you want to delete this Categories?') == true)
		{
			this.CategoriesService.deleteCategories(id)
			.subscribe(data => this.getCategories(),
			error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error);
		}
	}

	// Go to First Page
	onFirstPage() {
		this.pageIndex = 1;
		this.getCategoriesByPaging();
	}

	// Go to Previous Page
	onPreviousPage() {
		if (this.pageIndex > 1) {
			this.pageIndex = this.pageIndex - 1;
			this.getCategoriesByPaging();
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
			this.getCategoriesByPaging();
		}
	}

	// Go to Last Page
	onLastPage() {
		this.pageIndex = this.pageCount;
		this.getCategoriesByPaging();
	}

	// On Edit - Go to Edit page
	onSelect(item: CategoriesData) {
		this.router.navigate(['/Categories', item.CategoryID]);
	}

	// On Details - Go to Details page
	onSelectDetails(item: CategoriesData) {
		this.router.navigate(['/Categories/Details', item.CategoryID]);
	}

	// Set record as selected
	SelectCategories(item: CategoriesData) {
		this.selectedCategories = item;
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
