import { Injectable } from "@angular/core";

interface IBook{
    CName:string;
    BTitle:string;
    BISBN:string;
    BYEAR:string;
    BPrice:number;
    BDescription:string;
    BImage:string;
}

@Injectable({
    providedIn:'root'
})

export class Book implements IBook {
    CName:string='';
    BTitle:string='';
    BISBN:string='';
    BYEAR:string='';
    BPrice:number=0;
    BDescription:string='';
    BImage:string='';
}
