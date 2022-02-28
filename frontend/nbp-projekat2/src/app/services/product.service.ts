import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string = environment.connectionString + "Product/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Allow': '*'
    })
  }

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.url + "GetAllProducts", this.httpOptions)
  }
}
