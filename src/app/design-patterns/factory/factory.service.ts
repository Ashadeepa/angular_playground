import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  createObject(text: string) {
    if (text === 'hello') {
      return {message: 'Hello, factory pattern 1'};
    } else if (text === 'bye') {
      return {message: 'Good Bye, factory pattern 2'};
    }
    return {message: 'factory pattern'};
  }
}
