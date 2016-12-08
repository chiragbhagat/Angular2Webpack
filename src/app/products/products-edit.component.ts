import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsData, ProductsService }  from './products.service';

@Component({
  templateUrl: './Products-edit.html',
  providers: [ProductsService],
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

  //@HostBinding('style.position') get position() {
  //  return 'absolute';
  //}

  objProducts: ProductsData;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService
  ) {}

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.service.getByID(+params['id']))
      .subscribe((item: ProductsData) => this.objProducts = item);
  }

  updateProducts() {
		this.service.updateProductsData(this.objProducts)
			.subscribe(record => this.router.navigate(['/products']), 
				error =>  this.errorMessage = "There was an error while updating record. Error: " + <any>error,
				() => { console.log("Products record updated successfully..."); }
			);
	}
  
	deleteProducts(id: number) {
		if (window.confirm("Are you sure you want to delete this Products?") == true) 
		{
			this.service.deleteProducts(this.objProducts.ProductID)
			.subscribe(record => this.router.navigate(['/products']),
				error =>  this.errorMessage = "There was an error while deleting record. Error: " + <any>error,
				() => { console.log("Products record deleted successfully..."); }
			);
		}
	}

  gotoProducts() {
    let Id = this.objProducts ? this.objProducts.ProductID : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    this.router.navigate(['/products']);
  }
}
