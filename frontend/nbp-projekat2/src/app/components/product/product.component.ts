import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  @Input() productInfo: Product | undefined;
  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {product: this.productInfo},
      disableClose: true
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: {product: this.productInfo}
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      data: {product: this.productInfo}
    });
  }

  isLogedIn(): boolean {
    return localStorage.getItem("username") ? true : false
  }

  isOwner(): boolean {
    return this.productInfo?.username === localStorage.getItem('username') ? true : false;
  }
}