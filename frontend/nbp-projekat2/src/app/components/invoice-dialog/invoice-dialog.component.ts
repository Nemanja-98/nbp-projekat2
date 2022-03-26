import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Invoice } from 'src/app/models/Invoice';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})
export class InvoiceDialogComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {invoice: Invoice}, 
  private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

  deleteInovice(){
    //username, buyername, productname
    this.invoiceService.deleteInvoice(localStorage.getItem("username"), this.data.invoice.buyerName, this.data.invoice.productName)
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      window.location.reload();
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
