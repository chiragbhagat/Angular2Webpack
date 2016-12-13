/* ------------------------------------------------------------
 * Created By	: CodeBhagat v1.0
 * Created Date	: 12/13/2016
 * Service Name	: ProductsService
 * Purpose		: This service contains methods to perform Data Access Layer operations using Http/Web API calls
 * Instructions	: You may modify code inside code generation template and re-generate the code.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';

import myGlobals = require('../globals');

export class ProductsData {
	
			public ProductID: number;
			public ProductName: string;
			public SupplierID: number;
			public CategoryID: number;
			public QuantityPerUnit: string;
			public UnitPrice: number;
			public UnitsInStock: number;
			public UnitsOnOrder: number;
			public ReorderLevel: number;
			public Discontinued: boolean;
}

@Injectable()
export class ProductsService {
    baseUrl: string;

    constructor(private _http: Http) {
	    this.baseUrl = myGlobals.baseApiUrl;
    }

    getAll() : Observable<ProductsData[]> {
		let url = this.baseUrl + 'api/Products';

		return this._http
			.get(url, { headers: this.getHeaders() })
			.map(response => response.json())
			.do(data => console.log(data))
			.catch(this.handleError);
    }

    getAllBy(filterExpression: string) : Observable<ProductsData[]> {
		let url = this.baseUrl + 'api/Products?filterExpression=${filterExpression}';

        return this._http
			.get(url, {headers: this.getHeaders()})
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getAllByPaging(filterExpression: string, pageIndex: number, pageSize: number) : Observable<any> {
		let url = this.baseUrl + `api/Products?filterExpression=&sortExpression=ProductID&pageIndex=${pageIndex}&pageSize=${pageSize}`;

        return this._http
            .get(url, {headers: this.getHeaders()})
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

	getByID(id: string): Observable<ProductsData> {
		let url = `${this.baseUrl}api/Products/${id}`;

        return this._http
			.get(url, {headers: this.getHeaders()})
            .map(response => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    addProductsData(body:ProductsData) : Observable<ProductsData> {
		let bodyString = JSON.stringify(body); // Stringify payload
        let options = new RequestOptions({ headers: this.getHeaders(), method: "post" });
		let url = this.baseUrl + 'api/Products';
 
		return this._http.post(url, bodyString, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateProductsData(body:ProductsData) : Observable<ProductsData> {
		let bodyString = JSON.stringify(body); // Stringify payload
		let options = new RequestOptions({ headers: this.getHeaders(), method: "put" });
        let url = this.baseUrl + 'api/Products';

		return this._http.put(url, bodyString, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteProducts(id:string) : Observable<Object>{
		let url = `${this.baseUrl}api/Products/${id}`;
 
		return this._http.delete(url)
            .map(res => res)
            .catch(this.handleError);
    }

    getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET');
        // headers.append('Access-Control-Allow-Origin', '*');
        return headers;
    }

    private extractData(res: Response) {
        let body: any;

        // check if empty, before call json
        if (res.text()) {
            body = res.json();
        }
        return body || { };
    }

    handleError(error: Response | any) {
        let errMsg: string;
		if (error instanceof Response) {
		const body = error.json() || '';
		const err = body.error || JSON.stringify(body);
		errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
		errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}

/*
    function mapProducts(response:Response): ProductsData[] {
        // The response of the API has a results
        // property with the actual results
        return response.json().map(toProducts);
    }

    function toProducts(r:any): ProductsData{
        let region = <ProductsData>({
            RegionID: r.RegionID,
            RegionDescription: r.RegionDescription
        });
        console.log('Parsed region:', region);
        return region;
    }
*/
