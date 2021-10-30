import { Injectable } from '@angular/core';

interface IBook {
  id: number;
  cid: number;
  title: string;
  isbn: string;
  year: number;
  price: number;
  description: string;
  position: number;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Book implements IBook {
  id: number = 0;
  cid: number = 0;
  title: string = '';
  isbn: string = '';
  year: number = 0;
  price: number = 0;
  description: string = '';
  position: number = 0;
  status: boolean = true;
}
