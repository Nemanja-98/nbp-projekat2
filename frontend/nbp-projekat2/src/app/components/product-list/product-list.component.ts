import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';


const mockProductList : Array<Product> = [ 
  {
    name: "apple",
    type: "non-GMO red apple",
    description: "home grown pesticide free apple",
  },
  {
    name: "pear",
    type: "non-GMO yellow Pear",
    description: "home grown pesticide free Pear",
  },
  {
    name: "A.Pineapple",
    type: "A.PineApple",
    description: "Natural African PineApple",
  },
  {
    name: "PineApple",
    type: "Peruan PineApple",
    description: "Latino-America grown PineApple",
  },
  {
    name: "strawberry",
    type: "non-GMO red Strawberry",
    description: "home grown pesticide free Strawberry",
  },
]
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor() { }
  public productList = mockProductList;
  ngOnInit(): void {
  }

}
