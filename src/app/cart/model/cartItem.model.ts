import { Book } from "./book.model";

export class CartItem{
    constructor(book:Book){
        this.book = book;
        this.price;
    }
    book:any;
    quantity: number = 1;

    get price():number{
        return this.book.BPrice * this.quantity;
    }
}