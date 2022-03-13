export class Product {
    name: string;
    category: string;
    price: number;
    amount :number;
    owner: string;
    username: string;
    constructor(name :string, category :string, price: number ,amount :number, owner: string, username: string) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.amount = amount;
        this.owner = owner;
        this.username = username;
    }
}