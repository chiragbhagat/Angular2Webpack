import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
//import { Observable }     from 'rxjs/Observable';
//import 'rxjs/add/operator/catch';

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
			.map(res => this.extractData(res))
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

	getByID(id: number): Observable<ProductsData> {
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

    deleteProducts(id:number) : Observable<Object>{
		let url = `${this.baseUrl}api/Products/${id}`;
 
		return this._http.delete(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
        //headers.append('Access-Control-Allow-Headers', 'Content-Type');
        //headers.append('Access-Control-Allow-Methods', 'GET');
        //headers.append('Access-Control-Allow-Origin', '*');
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
        //console.error(error);
        //return Observable.throw(error.json().error || 'Server error.');

		// In a real world app, we might use a remote logging infrastructure
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
        let Products = <ProductsData>({
            ProductsID: r.ProductsID,
            ProductsDescription: r.ProductsDescription
        });
        console.log('Parsed Products:', Products);
        return Products;
    }
*/
	