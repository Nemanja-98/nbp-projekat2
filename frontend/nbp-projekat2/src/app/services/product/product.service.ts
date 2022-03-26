import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string = environment.connectionString + "Product/";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{

    const urlGetAllProducts = this.url + "GetAllProducts"
    return this.http.get<Product[]>(urlGetAllProducts, environment.httpOptions)
  }

  updateProduct(product: Product): Observable<Product>{

    const bodyUpdateProduct = {
      "owner": product.username,
      "product": {
        "name": product.name,
        "category": product.category,
        "amount": product.amount,
        "price": product.price
      }
    }

    const urlUpdateProduct = this.url + "UpdateProduct"
    console.log(bodyUpdateProduct)
    return this.http.put<Product>(urlUpdateProduct, bodyUpdateProduct, environment.httpOptions);
  }

  deleteProduct(product: Product): Observable<any> {
    const urlDeleteProduct = this.url + "DeleteProduct/" + product.username + "/" + product.category + "/" + product.name;
    return this.http.delete(urlDeleteProduct, {headers: environment.httpOptions.headers, responseType: "text"});
  }

  createProduct(product: Product): Observable<any> {
    const urlCreateProduct = this.url + "AddProduct";

    const bodyCreateProduct = {
      "owner": product.username,
      "product": {
        "name": product.name,
        "category": product.category,
        "amount": product.amount,
        "price": product.price
      }
    }

    return this.http.post(urlCreateProduct, bodyCreateProduct, {headers: environment.httpOptions.headers, responseType: "text"})
  }
}
