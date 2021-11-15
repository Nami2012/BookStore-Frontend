import { Injectable } from '@angular/core';

interface IBook {
  cid: number;
  title: string;
  isbn: string;
  year: number;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class Book implements IBook {
  cid: number = 0;
  title: string = '';
  isbn: string = '';
  year: number = 0;
  price: number = 0;
  description: string = '';
}
