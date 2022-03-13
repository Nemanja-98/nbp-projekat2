import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Invoice } from 'src/app/models/Invoice';
import { Product } from 'src/app/models/Product';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showInfo: boolean = false
  myInvoices: Invoice[] = [];
  showInvoices: boolean = true;
  myProducts: Product[] = [];
  showProducts: boolean = true;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

  getMyInvoices(): void{
    this.invoiceService.getMyInvoices("marko")
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      this.showInvoices = false;
      this.showInfo = true;
      this.showProducts = true;
      console.log(response)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
