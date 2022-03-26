import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';


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
   this.productService.getAllProducts().subscribe( response => {
     this.allProducts = response
     this.productList = this.allProducts;
     console.log(response)
   });
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
          if( y.category === x )
            this.productList.push(y)
        })
      })
    }
  }
}
