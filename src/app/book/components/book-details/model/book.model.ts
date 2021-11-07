import { Injectable } from '@angular/core';

interface IBook {
  BId: number;
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
  BId: number = 0;
  CId: number = 0;
  CName: string = '';
  BTitle: string = '';
  BISBN: string = '';
  BYEAR: string = '';
  BAuthor: string = '';
  BPrice: number = 0;
  BDescription: string = '';
  BImage: string = '';
}

