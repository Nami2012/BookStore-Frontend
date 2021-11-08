import { Book } from "../../book/components/book-details/model/book.model";

export class CartItem{
    constructor(book:Book){
        this.book = book;
        this.price;  //whats the purpose of this?
    }
    book:Book;
    quantity: number = 1;

    get price():number{
        return this.book.BPrice * this.quantity;
    }
}