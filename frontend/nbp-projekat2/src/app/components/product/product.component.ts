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
      if(typeof(result) === "number"){
        // console.log('The dialog was closed', result);
        if(this.productInfo)
          if((this.productInfo.amount - result) >= 0)
            this.productInfo.amount = this.productInfo.amount - result;
          else
            alert("You have entered a quantity greater than the maximum offered. Please try again.");
      }
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
  selectedAmount : number = 0;
  constructor(
    public dialogRef: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}



  onConfirmClicked(){
    console.log("is",this.selectedAmount);
    this.dialogRef.close(this.selectedAmount);
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
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
    // console.log(key)
    // if(key === "46")
    // console.log(key)
    //   // this.selectedAmount = this.selectedAmount / 10
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
    const input = document.querySelector('input')?.innerHTML;
    this.selectedAmount = (this.selectedAmount*10) + Number(key); 
    console.log(this.selectedAmount, key, input);
  }
}