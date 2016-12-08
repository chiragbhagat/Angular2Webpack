// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsData, ProductsService }  from './products.service';

@Component({
  templateUrl: './Products-list.html',
  providers: [ProductsService]
})
export class ProductsListComponent implements OnInit {
  ProductsList: ProductsData[];
  errorMessage: string;

  sortExpression: string = "ProductID";
	filterExpression: string = "";
	pageIndex: number = 1;
	pageSize: number = 10;
  endRowIndex: number;
	rowsCount: number;
  pageCount: number;
  isFirstPage: boolean;

  private selectedId: number;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductsByPaging();
    this.isFirstPage = true;
    /*this.ProductsList = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getAll();
      });*/
  }

  public getProducts() {
     this.service.getAll()
         .subscribe(data => this.ProductsList = data,
        error =>  this.errorMessage = "There was an error while retrieving records. Error: " + <any>error);
  }

	getProductsByPaging() {
		this.service.getAllByPaging(this.filterExpression, this.pageIndex, this.pageSize)
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
      error =>  this.errorMessage = "There was an error while retrieving records. Error: " + <any>error
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

  deleteProducts(id: number) {
    if (window.confirm("Are you sure you want to delete this Products?") == true) 
    {
        this.service.deleteProducts(id)
          .subscribe(data => this.getProducts(), 
          error =>  this.errorMessage = "There was an error while deleting record. Error: " + <any>error);

    }
  }

  isSelected(item: ProductsData) { 
    return item.ProductID === this.selectedId; 
  }

  onSelect(item: ProductsData) {
    this.router.navigate(['/products', item.ProductID]);
  }
}
