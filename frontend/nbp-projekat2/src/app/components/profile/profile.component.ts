import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Invoice } from 'src/app/models/Invoice';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myInformations: User = new User("","","","","");
  showInfo: boolean = false
  myInvoices: Invoice[] = [];
  showInvoices: boolean = true;
  myProducts: Product[] = [];
  showProducts: boolean = true;
  userForUpdate: User= new User("","","","","");
  updateUserFlag = true;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private invoiceService: InvoiceService, 
              private userService: UserService, 
              private productService: ProductService, 
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getMyInformations();
    this.getMyInvoices();
    this.getMyProducts();
    console.log(this.updateUserFlag)
  }

  getMyInformations(): void{
    this.userService.getMyInformations(localStorage.getItem('username'))
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      this.myInformations = response;
      console.log("INFORMATIONS", this.myInformations);
    })
  }

  getMyInvoices(): void{
    this.invoiceService.getMyInvoices(localStorage.getItem('username'))
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      this.myInvoices = response;
      console.log("INVOICES", this.myInvoices);
    })
  }

  getMyProducts(): void{
    this.productService.getAllProducts().subscribe( response => {
      this.myProducts = response;
      this.myProducts = this.myProducts.filter( x=> x.username === localStorage.getItem('username'));
      console.log("PRODCUTS", this.myProducts)
    });
  }

  showMyInformations(): void{
    this.showInvoices = true;
    this.showInfo = false;
    this.showProducts = true;
  }

  showMyInvoices(): void{
    this.showInvoices = false;
    this.showInfo = true;
    this.showProducts = true;
  }

  showMyProducts(): void {
    this.showInvoices = true;
    this.showInfo = true;
    this.showProducts = false;
  }

  openDialog(invoice: Invoice): void {
    const dialogRef = this.dialog.open(InvoiceDialogComponent, {
      data: {invoice: invoice}
    });
  }

  updateUser(): void{
    if(this.userForUpdate.name === '') {
      alert("Plese enter name!")
      return
    }

    if(this.userForUpdate.surname === '') {
      alert("Plese enter surname!")
      return
    }

    if(this.userForUpdate.location === '') {
      alert("Plese enter location!")
      return
    }

    this.userForUpdate.username = this.myInformations.username;
    this.userForUpdate.password = this.myInformations.password;

    
    this.userService.updateUser(this.userForUpdate)
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      this.myInformations = response;
      this.updateUserFlag = true;
      window.location.reload();
    }, err => window.location.reload())
  }

  cancelUpdateUser(): void{
    this.userForUpdate = new User("","","","","");
    this.updateUserFlag = true;
  }

  turnOnUserForUpdate() {
    this.updateUserFlag = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}