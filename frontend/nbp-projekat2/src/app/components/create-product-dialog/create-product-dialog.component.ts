import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css']
})
export class CreateProductDialogComponent implements OnInit {

  productForCreation: Product = new Product("", "", 0, 0, "", "");
  category: string = "";
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    this.productForCreation.category = this.category;

    if(this.productForCreation.name === ""){
      alert("Please enter the name of the product!")
      return;
    }

    if(this.productForCreation.category === ""){
      alert("Please enter new category of the product!")
      return;
    }

    if(this.productForCreation.amount === 0){
      alert("Please enter new amount of the product!")
      return;
    }

    if(this.productForCreation.price === 0){
      alert("Please enter new price of the product!")
      return;
    }

    this.productForCreation.username = localStorage.getItem("username") || "";

    this.productService.createProduct(this.productForCreation)
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      window.location.reload()
    }, (err) => console.log(err))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
