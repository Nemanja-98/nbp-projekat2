export class Product {
    name: string;
    category: string;
    price: number;
    amount :number;
    owner: string;
    constructor(name :string, category :string, price: number ,amount :number, owner: string) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.amount = amount;
        this.owner = owner;
    }
}