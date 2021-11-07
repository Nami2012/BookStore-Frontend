import { Injectable } from '@angular/core';

interface IBook {
  BId: string;
  CName: string;
  BTitle: string;
  BISBN: string;
  BYEAR: string;
  BPrice: number;
  BDescription: string;
  BImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class Book implements IBook {
  BId: string = '';
  CName: string = '';
  BTitle: string = '';
  BISBN: string = '';
  BYEAR: string = '';
  BAuthor: string = '';
  BPrice: number = 0;
  BDescription: string = '';
  BImage: string = '';
}
