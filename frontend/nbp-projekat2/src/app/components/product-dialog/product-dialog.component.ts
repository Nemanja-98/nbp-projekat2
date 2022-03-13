import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Invoice } from 'src/app/models/Invoice';
import { Product } from 'src/app/models/Product';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  fullName?: string;
  phoneNumber?: string;
  address?: string;
  amount: number = 1;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}, 
  private invoiceService: InvoiceService, private productService: ProductService) { }

  ngOnInit(): void {
  }

  placeInovice(){

    if(!this.fullName){
      alert("Please enter your full name!");
      return;
    }
    else if(!this.phoneNumber){
      alert("Please enter your phone number!");
      return;
    }
    else if(!this.address){
      alert("Please enter your address!");
      return;
    }
    else if((this.data.product.amount-this.amount) < 0){
      alert("You cannot order more than the displayed amount!");
      return;
    }

    let totalPrice = this.amount * this.data.product.price
    let invoice = new Invoice(this.fullName, this.phoneNumber, this.address, this.data.product.name, this.amount, this.data.product.price)
    this.invoiceService.postInvoice(invoice, this.data.product.username)
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      this.data.product.amount -= this.amount;
      this.productService.updateProduct(this.data.product)
      .pipe(takeUntil(this.destroy$))
      .subscribe( response2 => {
        window.location.reload()
      }, error => console.log("Doslo je do greske u drugi call: " + error))
    }, error => console.log("Doslo je do greske u prvi call: " + error))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
