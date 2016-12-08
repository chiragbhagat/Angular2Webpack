/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/8/2016
 * Component	: OrdersEditComponent
 * Purpose		: This component retrieves data for the specified record id and allows to edit and save changes.
 * Dependency	: OrdersService
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
import { OrdersData, OrdersService }  from './Orders.service';

import { ShippersData, ShippersService } from '../Shippers/Shippers.service';
import { EmployeesData, EmployeesService } from '../Employees/Employees.service';


@Component({
  templateUrl: './OrdersEdit.component.html',
  providers: [OrdersService
	, ShippersService, EmployeesService
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

export class OrdersEditComponent implements OnInit {
	@HostBinding('@routeAnimation') get routeAnimation() {
		return true;
	}

	@HostBinding('style.display') get display() {
		return 'block';
	}

	// @HostBinding('style.position') get position() {
	//  return 'absolute';
	// }
 
	objOrders: OrdersData;
	errorMessage: string;
	messages: string[];

	// Lookup Arrays
	
	ShippersList: ShippersData[];
	EmployeesList: EmployeesData[];

	constructor(private route: ActivatedRoute, private router: Router, private OrdersService: OrdersService
			, private  ShippersService:  ShippersService
			, private  EmployeesService:  EmployeesService

	) {
		// this.id = parseInt(params.get('id'));
		this.objOrders = new OrdersData();
	}

	ngOnInit() {
		this.route.params
		// (+) converts string 'id' to a number
		// .switchMap((params: Params) => this.OrdersService.getByID(+params['id']))
		.switchMap((params: Params) => this.OrdersService.getByID(params['id']))
		.subscribe((item: OrdersData) => this.objOrders = item);
		this.getLookups();
	}

	updateOrders() {
		this.OrdersService.updateOrdersData(this.objOrders)
			.subscribe(record => this.router.navigate(['/Orders']),
				error =>  this.errorMessage = 'There was an error while updating record. Error: ' + <any>error,
				() => { console.log('Orders record updated successfully...'); }
			);
	}
  
	deleteOrders(id: string) {
		if (window.confirm('Are you sure you want to delete this Orders?') == true) 
		{
			this.OrdersService.deleteOrders(this.objOrders.OrderID.toString())
			.subscribe(record => this.router.navigate(['/Orders']),
				error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error,
				() => { console.log('Orders record deleted successfully...'); }
			);
		}
	}

	gotoOrders() {
		let Id = this.objOrders ? this.objOrders.OrderID : null;
		this.router.navigate(['/Orders']);
	}

	// Get Lookup List for Shippers
    getShippers() {
		this.ShippersService.getAll().subscribe(records => this.ShippersList=records);
    }
	// Get Lookup List for Employees
    getEmployees() {
		this.EmployeesService.getAll().subscribe(records => this.EmployeesList=records);
    }

	getLookups() {

        this.getShippers();
        this.getEmployees();
	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
