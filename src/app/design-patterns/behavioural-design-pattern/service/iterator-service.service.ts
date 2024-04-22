import { Injectable } from '@angular/core';
import { BookIterator } from '../iterator-pattern/bookIterator';
import { Book } from '../iterator-pattern/book';

@Injectable({
  providedIn: 'root'
})
export class IteratorServiceService {
  private books: Book[] = [];
  constructor() { 
    this.books.push(new Book('The Alchemist', 'Paulo Coelho'));
    this.books.push(new Book('The Lord of the Rings', 'JRR Tolkien'));
    this.books.push(new Book('A Tree Grows in Brooklyn', 'Betty Smith'));
    this.books.push(new Book('Animal Farm', 'George Orwell'));
    this.books.push(new Book('A tale of two cities', 'Charles Dickens'));
    this.books.push(new Book('Alice in Wonderland', 'Lewis Carrol'));
    this.books.push(new Book('David Copperfield', 'Charles Dickens'));
  }
  getBookIterator(): BookIterator {
    return new BookIterator(this.books);
  }
}
