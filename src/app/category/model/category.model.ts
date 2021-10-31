import { Injectable } from "@angular/core";

interface ICategory{

    CName: string,
    CDescription:string,
    CImage:string,
    CPosition:number
}

@Injectable({
    providedIn: 'root'
  })
  
export class Category implements ICategory {
    CName:string ="";
    CDescription:string="";
    CImage:string="";
    CPosition:number=0;

}

