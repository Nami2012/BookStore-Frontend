import { Injectable } from "@angular/core";

interface ICategory{

    CId: number,
    CName: string,
    CDescription:string,
    CImage:string,
    CPosition:number
}

@Injectable({
    providedIn: 'root'
  })
  
export class Category implements ICategory {
    CId:number=0;
    CName:string ="";
    CDescription:string="";
    CImage:string="";
    CPosition:number=0;

}

