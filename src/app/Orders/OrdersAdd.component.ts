/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Component	: OrdersAddComponent
 * Purpose		: This component allows to create new Orders record and save changes.
 * Dependency	: OrdersService
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Component, EventEmitter, Input, Output, OnInit,
	HostBinding, trigger, transition, animate,
	style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ToastsManager }  from 'ng2-toastr';

import { OrdersData, OrdersService } from './Orders.service';
import { ShippersData, ShippersService } from '../Shippers/Shippers.service';
import { EmployeesData, EmployeesService } from '../Employees/Employees.service';


@Component({
	selector: 'my-Orders-add',
	templateUrl: './OrdersAdd.component.html',
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

export class OrdersAddComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
	private toastr: ToastsManager,
    private OrdersService: OrdersService
			, private  ShippersService:  ShippersService
			, private  EmployeesService:  EmployeesService

	) {
		this.objOrders = new OrdersData();
	}

	ngOnInit() {
		this.objOrders = new OrdersData();
		this.getLookups();
	}

	addOrders() {
		this.OrdersService.addOrdersData(this.objOrders)
			.subscribe(record => this.router.navigate(['/Orders']),
			error =>  this.errorMessage = 'There was an error while adding record. Error: ' + <any>error,
			() => { console.log('Orders record added successfully...'); }
		);
	}

	gotoOrders() {
		let Id = this.objOrders ? this.objOrders.OrderID : null;
		this.toastr.success('Back to Orders List...');
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
	