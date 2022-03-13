export class Invoice{

    buyerName: string;
    phoneNumber: string;
    address: string;
    productName: string;
    amount: number;
    productPrice: number;

    constructor(buyerName: string, phoneNumber: string, address: string, productName: string, amount: number, productPrice: number ){
        this.buyerName = buyerName;
        this.phoneNumber = phoneNumber;
        this.address= address;
        this.productName = productName;
        this.amount = amount;
        this.productPrice = productPrice;
    }
}