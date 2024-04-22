
import { Book } from './book';
import { Iterator } from './iterator';

export class BookIterator implements Iterator<Book> {
  private index = 0;

  constructor(private books: Book[]) {}

  next(): Book {
    if (this.hasNext()) {
      return this.books[this.index++];
    } else {
      throw new Error('No more elements in the iterator.');
    }
  }

  hasNext(): boolean {
    return this.index < this.books.length;
  }
}
