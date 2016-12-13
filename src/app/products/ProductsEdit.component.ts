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
import { ToastsManager }  from 'ng2-toastr';

import { ProductsData, ProductsService }  from './Products.service';

import { SuppliersData, SuppliersService } from '../Suppliers/Suppliers.service';
import { CategoriesData, CategoriesService } from '../Categories/Categories.service';


@Component({
  templateUrl: './ProductsEdit.component.html',
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

export class ProductsEditComponent implements OnInit {
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

	// Lookup Arrays
	
	SuppliersList: SuppliersData[];
	CategoriesList: CategoriesData[];

	constructor(private route: ActivatedRoute, 
		private router: Router,
		private toastr: ToastsManager,
		private ProductsService: ProductsService
			, private  SuppliersService:  SuppliersService
			, private  CategoriesService:  CategoriesService

	) {
		// this.id = parseInt(params.get('id'));
		this.objProducts = new ProductsData();
	}

	ngOnInit() {
		this.route.params
		// (+) converts string 'id' to a number
		// .switchMap((params: Params) => this.ProductsService.getByID(+params['id']))
		.switchMap((params: Params) => this.ProductsService.getByID(params['id']))
		.subscribe((item: ProductsData) => this.objProducts = item);
		this.getLookups();
	}

	updateProducts() {
		this.ProductsService.updateProductsData(this.objProducts)
			.subscribe(record => this.router.navigate(['/Products']),
				error =>  this.errorMessage = 'There was an error while updating record. Error: ' + <any>error,
				() => { 
					this.toastr.success('Products record updated successfully...');
					console.log('Products record updated successfully...'); 
				}
			);
	}
  
	deleteProducts(id: string) {
		if (window.confirm('Are you sure you want to delete this Products?') == true) 
		{
			this.ProductsService.deleteProducts(this.objProducts.ProductID.toString())
			.subscribe(record => this.router.navigate(['/Products']),
				error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error,
				() => { 
					this.toastr.success('Products record deleted successfully...');
					console.log('Products record deleted successfully...'); 
				}
			);
		}
	}

	gotoProducts() {
		let Id = this.objProducts ? this.objProducts.ProductID : null;
		this.toastr.success('Back to Products List...');
		this.router.navigate(['/Products']);
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
