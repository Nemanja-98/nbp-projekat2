import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getAllProducts() {
    const mockProductList : Array<Product> = [ 
      {
        name: "himalajska jabuka",
        type: "apple",
        amount: 20000 + " kg",
        owner: "dragan"
      },
      {
        name: "babusnicka kruska",
        type: "pear",
        amount: 20000 + " kg",
        owner: "milan"
      },
      {
        name: "lagani persisjski kruska",
        type: "pear",
        amount: 20000 + " kg",
        owner: "jelena"
      },
      {
        name: "indonezija jabuka",
        type: "apple",
        amount: 20000 + " kg",
        owner: "momir"
      },
      {
        name: "jagoda u supermarketu",
        type: "strawberry",
        amount: 20000 + " kg",
        owner: "dragica"
      },
    ]
    return mockProductList
  }
}
