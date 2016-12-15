/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: ProductsListComponent
 * Purpose		: This component retrieve paged data and performs paging operations
 * Dependency	: ProductsService
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
import { ProductsData, ProductsService } from './Products.service';
import { ProductsSearchComponent } from './ProductsSearch.component';

@Component({
	selector: 'my-Products',
	templateUrl: './ProductsList.component.html',
	providers: [ProductsService]
})

export class ProductsListComponent implements OnInit {
	ProductsList: ProductsData[];
	newProducts: ProductsData;
	selectedProducts: ProductsData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;

	sortExpression: string = "ProductID";
	filterExpression: string = "";
	pageIndex: number = 1;
	pageSize: number = 10;
	endRowIndex: number;
	rowsCount: number;
	pageCount: number;
	isFirstPage: boolean;

    private selectedId: string;

	constructor(
		private ProductsService: ProductsService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastsManager
	) {
		this.newProducts = new ProductsData();
		this.pageSize = myGlobals.pageSize;
	}

	ngOnInit() {
		//this.ProductsService.getAll().subscribe(record => this.ProductsList=record);
		this.getProductsByPaging();
		this.isFirstPage = true;

		/*
		this.ProductsList = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				return this.service.getAll();
			});
		*/
	}

	// Get all records
	public getProducts() {
		this.ProductsService.getAll()
			.subscribe(data => this.ProductsList = data,
		error =>  this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error);
	}

	// On Search CLick on ProductsSearch Component
	onSearch() {
	// 1. Update this.filterExpression
	// this.filterExpression = productSearchComponent.filterExpression;

	// 2. call getProductsByPaging method that will refresh the data
	this.pageIndex = 1;
	this.getProductsByPaging();
	}

	// Get records by paging
	getProductsByPaging() {
		this.ProductsService.getAllByPaging(this.filterExpression, this.pageIndex, this.pageSize)
			.subscribe(data => {
				this.ProductsList=data.ProductsList;
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
	addProducts() {
		this.ProductsService.addProductsData(this.newProducts).subscribe(record => console.log(record));
		this.getProducts();
	}

	// Updates existing record
	updateProducts() {
		this.ProductsService.updateProductsData(this.selectedProducts).subscribe(record => console.log(record));
		this.getProducts();
	}

	// Deletes record with specified id
	deleteProducts(id: string) {
		if (window.confirm('Are you sure you want to delete this Products?') == true)
		{
			this.ProductsService.deleteProducts(id)
			.subscribe(data => this.getProducts(),
			error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error);
		}
	}

	// Go to First Page
	onFirstPage() {
		this.pageIndex = 1;
		this.getProductsByPaging();
	}

	// Go to Previous Page
	onPreviousPage() {
		if (this.pageIndex > 1) {
			this.pageIndex = this.pageIndex - 1;
			this.getProductsByPaging();
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
			this.getProductsByPaging();
		}
	}

	// Go to Last Page
	onLastPage() {
		this.pageIndex = this.pageCount;
		this.getProductsByPaging();
	}

	// On Edit - Go to Edit page
	onSelect(item: ProductsData) {
		this.router.navigate(['/Products', item.ProductID]);
	}

	// On Details - Go to Details page
	onSelectDetails(item: ProductsData) {
		this.router.navigate(['/Products/Details', item.ProductID]);
	}

	// Set record as selected
	SelectProducts(item: ProductsData) {
		this.selectedProducts = item;
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
