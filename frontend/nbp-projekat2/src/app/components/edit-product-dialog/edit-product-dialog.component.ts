import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {

  productForUpdate: Product = new Product("", "", 0, 0, "", "");
  private destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}, private productService: ProductService) { }

  ngOnInit(): void {
      
  }

  editProduct(): void {
    if(this.productForUpdate.amount === 0){
      alert("Please enter the new amount of the product!")
      return;
    }

    if(this.productForUpdate.price === 0){
      alert("Please enter the new price of the product!")
      return;
    }

    this.productForUpdate.name = this.data.product.name;
    this.productForUpdate.username = this.data.product.username;
    this.productForUpdate.owner = this.data.product.owner;
    this.productForUpdate.category = this.data.product.category;

    this.productService.updateProduct(this.productForUpdate)
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
