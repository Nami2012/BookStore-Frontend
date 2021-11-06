import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  value: string = "";
  constructor() { }

  setValue(data:any){
    this.value = data;
  }
  getValue(){
    return this.value;
  }
}
