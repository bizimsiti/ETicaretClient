import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct } from '../../../contracts/create_product';
import { GetAllProducts, List_Product } from '../../../contracts/list_products';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClientService) { }

  create(product: CreateProduct, callback?: any, errorCallback?: (errors: Array<{ key: string, value: Array<string> }>) => void) {
    this.http.post<CreateProduct>({
      controller: "products",

    }, product).subscribe(result => {
      callback();
    }, (errors: HttpErrorResponse) => {
      const errorArrays: Array<{ key: string, value: Array<string> }>=[];
      const _errors: Array<{ key: string, value: Array<string> }> = errors.error;
      _errors.forEach(error => {
        errorArrays.push(error)
      })
      console.log(errorArrays)
      errorCallback?.(errorArrays)
    })
  }

  read(page: number, size: number, successCallback?: (data: GetAllProducts) => void, errorCallback?: (errors: Array<{ key: string, value: Array<string> }>)=>void ) {
    this.http.get<GetAllProducts>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).subscribe((data) => {
      console.log(data);
      successCallback(data)
    }, (errors: HttpErrorResponse) => {
      const errorArrays: Array<{ key: string, value: Array<string> }> = [];
      const _errors: Array<{ key: string, value: Array<string> }> = errors.error;
      _errors.forEach(error => {
        errorArrays.push(error)
      })
      console.log(errorArrays)
      errorCallback?.(errorArrays)
    })
  }

  delete(id: string) {
    this.http.delete({
      controller: "products"
    }, id).subscribe(data => {
      console.log(data)
    })
  }
}
