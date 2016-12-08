/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/8/2016
 * Component	: OrdersListComponent
 * Purpose		: This component retrieve paged data and performs paging operations
 * Dependency	: OrdersService
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import myGlobals = require('../globals');
import { OrdersData, OrdersService } from './Orders.service';

@Component({
	selector: 'my-Orders',
	templateUrl: './OrdersList.component.html',
	providers: [OrdersService]
})

export class OrdersListComponent implements OnInit {
	OrdersList: OrdersData[];
	newOrders: OrdersData;
	selectedOrders: OrdersData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;

	sortExpression: string = "OrderID";
	filterExpression: string = "";
	pageIndex: number = 1;
	pageSize: number = 10;
	endRowIndex: number;
	rowsCount: number;
	pageCount: number;
	isFirstPage: boolean;

    private selectedId: string;

	constructor(
		private OrdersService: OrdersService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.newOrders = new OrdersData();
		this.pageSize = myGlobals.pageSize;
	}

	ngOnInit() {
		//this.OrdersService.getAll().subscribe(record => this.OrdersList=record);
		this.getOrdersByPaging();
		this.isFirstPage = true;

		/*
		this.OrdersList = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				return this.service.getAll();
			});
		*/
	}

	// Get all records
	public getOrders() {
		this.OrdersService.getAll()
			.subscribe(data => this.OrdersList = data,
		error =>  this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error);
	}

	// Get records by paging
	getOrdersByPaging() {
		this.OrdersService.getAllByPaging(this.filterExpression, this.pageIndex, this.pageSize)
			.subscribe(data => {
				this.OrdersList=data.OrdersList;
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
	addOrders() {
		this.OrdersService.addOrdersData(this.newOrders).subscribe(record => console.log(record));
		this.getOrders();
	}

	// Updates existing record
	updateOrders() {
		this.OrdersService.updateOrdersData(this.selectedOrders).subscribe(record => console.log(record));
		this.getOrders();
	}

	// Deletes record with specified id
	deleteOrders(id: string) {
		if (window.confirm('Are you sure you want to delete this Orders?') == true)
		{
			this.OrdersService.deleteOrders(id)
			.subscribe(data => this.getOrders(),
			error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error);
		}
	}

	// Go to First Page
	onFirstPage() {
		this.pageIndex = 1;
		this.getOrdersByPaging();
	}

	// Go to Previous Page
	onPreviousPage() {
		if (this.pageIndex > 1) {
			this.pageIndex = this.pageIndex - 1;
			this.getOrdersByPaging();
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
			this.getOrdersByPaging();
		}
	}

	// Go to Last Page
	onLastPage() {
		this.pageIndex = this.pageCount;
		this.getOrdersByPaging();
	}

	// On Edit - Go to Edit page
	onSelect(item: OrdersData) {
		this.router.navigate(['/Orders', item.OrderID]);
	}

	// On Details - Go to Details page
	onSelectDetails(item: OrdersData) {
		this.router.navigate(['/Orders/Details', item.OrderID]);
	}

	// Set record as selected
	SelectOrders(item: OrdersData) {
		this.selectedOrders = item;
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
