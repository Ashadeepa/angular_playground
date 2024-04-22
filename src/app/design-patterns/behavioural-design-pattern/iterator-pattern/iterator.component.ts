import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IteratorServiceService } from '../service/iterator-service.service';
import { BookIterator } from './bookIterator';
import { Book } from './book';

@Component({
  selector: 'app-iterator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iterator.component.html',
  styleUrl: './iterator.component.scss'
})
export class IteratorComponent {
  public books: Book[] = [];

  constructor(private _service: IteratorServiceService) {}

  ngOnInit(): void {
    const iterator: BookIterator = this._service.getBookIterator();
    while (iterator.hasNext()) {
      this.books.push(iterator.next());
    }
  }
}
