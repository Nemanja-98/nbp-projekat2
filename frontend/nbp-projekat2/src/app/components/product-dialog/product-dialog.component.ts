import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, } from '@angular/material/dialog';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, amount: number}) { }

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
    //ovde radimo
  }

}
