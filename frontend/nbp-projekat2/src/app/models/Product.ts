export class Product {
    name: string;
    type: string;
    amount :number;
    owner: string;
    constructor(name :string, type :string, amount :number, owner: string) {
        this.name = name;
        this.type = type;
        this.amount = amount;
        this.owner = owner;
    }
}