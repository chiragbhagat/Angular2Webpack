/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: ProductsEditComponent
 * Purpose		: This component retrieves data for the specified record id and allows to edit and save changes.
 * Dependency	: ProductsService
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

import { ProductsData, ProductsService }  from './Products.service';
import { SuppliersData, SuppliersService } from '../Suppliers/Suppliers.service';
import { CategoriesData, CategoriesService } from '../Categories/Categories.service';

@Component({
  templateUrl: './ProductsSearch.component.html',
  providers: [ProductsService
	, SuppliersService, CategoriesService
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

export class ProductsSearchComponent implements OnInit {
	@HostBinding('@routeAnimation') get routeAnimation() {
		return true;
	}

	@HostBinding('style.display') get display() {
		return 'block';
	}

	// @HostBinding('style.position') get position() {
	//  return 'absolute';
	// }
 
	objProducts: ProductsData;
	errorMessage: string;
	messages: string[];
	filterExpression: string;

	// Lookup Arrays
	SuppliersList: SuppliersData[];
	CategoriesList: CategoriesData[];

	constructor(private route: ActivatedRoute, 
		private router: Router,
		private ProductsService: ProductsService
			, private  SuppliersService:  SuppliersService
			, private  CategoriesService:  CategoriesService

	) {
		this.objProducts = new ProductsData();
	}

	ngOnInit() {
		// Getting lookup data for Categories and Suppliers
		this.getLookups();
	}

	searchProducts() {
		// Updating filterExpression on Search button click
		if (this.objProducts.ProductName)
		{
			this.filterExpression += "ProductName like '%" + this.objProducts.ProductName + "%'";
		}
		if (this.objProducts.CategoryID)
		{
			this.filterExpression += "CategoryID = " + this.objProducts.CategoryID;
		}
		if (this.objProducts.SupplierID)
		{
			this.filterExpression += "SupplierID = " + this.objProducts.SupplierID;
		}
	}
  
	// Get Lookup List for Suppliers
    getSuppliers() {
		this.SuppliersService.getAll().subscribe(records => this.SuppliersList=records);
    }
	// Get Lookup List for Categories
    getCategories() {
		this.CategoriesService.getAll().subscribe(records => this.CategoriesList=records);
    }

	getLookups() {
        this.getSuppliers();
        this.getCategories();
	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
