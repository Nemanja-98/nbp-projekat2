import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  
  @Input()
  public productInfo :Product | undefined;
  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDialog, {
      width: '350px',
      data: {name: this.productInfo?.name, type: this.productInfo?.type, amount: this.productInfo?.amount},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(this.productInfo)
        this.productInfo.amount = String(Number(this.productInfo.amount) - Number(result));
    });
  }

  

}


export interface DialogData {
  type: string;
  name: string;
  amount: string;
}

@Component({
  selector: 'product-dialog',
  templateUrl: 'product-dialog.html',
  styleUrls: ['./product.component.css']
})
export class ProductDialog {
  public selectedAmount : any = 0;
  constructor(
    public dialogRef: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onConfirmClicked(){
    console.log("is",this.selectedAmount);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validate(evt :any) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = theEvent.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
    this.selectedAmount = Number(evt.target.innerHTML); 
    const input = document.querySelector('input')?.innerHTML;
    console.log(Number(evt.target.innerHTML),key, input);
  }
}