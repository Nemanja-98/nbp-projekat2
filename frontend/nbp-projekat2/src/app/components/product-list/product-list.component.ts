import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  allProducts: Product[] = [];
  @Input() selectedFilters: string[] = [];

  constructor(private productService: ProductService) { }
  
  ngOnChanges(){
    this.updateFilters();
  }

  ngOnInit(): void {
   this.allProducts = this.productService.getAllProducts();
   this.productList = this.allProducts;
  }

  updateFilters() {
    if(this.selectedFilters.length === 0)
    {
      this.productList = this.allProducts
    }
    else
    {
      this.productList = [];
      this.selectedFilters.map( (x: string) => {
        this.allProducts.map( (y: Product) => {
          if( y.type === x )
            this.productList.push(y)
        })
      })
    }
  }
}
