import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}, private productService: ProductService) { }

  ngOnInit(): void {
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.data.product)
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      window.location.reload()
      console.log(response)
    }, (err) => console.log(err))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
