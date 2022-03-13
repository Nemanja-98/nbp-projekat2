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
}
