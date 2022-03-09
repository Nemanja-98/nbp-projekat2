import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

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
      data: {name: this.productInfo?.name, amount: this.productInfo?.amount},
      disableClose: true
    });

    
  }

  isOwner(): boolean {
    return this.productInfo?.owner === localStorage.getItem('username') ? true : false;
  }
}