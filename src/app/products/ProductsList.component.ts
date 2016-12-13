import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsData, ProductsService } from './Products.service';

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
		private router: Router
	) {
		this.newProducts = new ProductsData();
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

	public getProducts() {
		this.ProductsService.getAll()
			.subscribe(data => this.ProductsList = data,
		error =>  this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error);
	}

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

	onFirstPage() {
		this.pageIndex = 1;
		this.getProductsByPaging();
	}

	onPreviousPage() {
		if (this.pageIndex > 1) {
			this.pageIndex = this.pageIndex - 1;
			this.getProductsByPaging();
		}
	}

	onRefresh() {
		this.onFirstPage();
	}

	onNextPage() {
		if (this.pageIndex < this.pageCount) {
			this.pageIndex = this.pageIndex + 1;
			this.getProductsByPaging();
		}
	}

	onLastPage() {
		this.pageIndex = this.pageCount;
		this.getProductsByPaging();
	}

	deleteProducts(id: string) {
		if (window.confirm('Are you sure you want to delete this Products?') == true)
		{
			this.ProductsService.deleteProducts(id)
			.subscribe(data => this.getProducts(),
			error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error);
		}
	}
/*
	isSelected(item: ProductsData) {
		return item.ProductID === this.selectedId;
	}
*/
	onSelect(item: ProductsData) {
		this.router.navigate(['/Products', item.ProductID]);
	}

	onSelectDetails(item: ProductsData) {
		this.router.navigate(['/Products/Details', item.ProductID]);
	}

	addProducts() {
		this.ProductsService.addProductsData(this.newProducts).subscribe(record => console.log(record));
		this.getProducts();
	}

	updateProducts() {
		this.ProductsService.updateProductsData(this.selectedProducts).subscribe(record => console.log(record));
		this.getProducts();
	}

	SelectProducts(item: ProductsData) {
		this.selectedProducts = item;
	}

	submitForm(data: Object) {
		console.log(data);
	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
