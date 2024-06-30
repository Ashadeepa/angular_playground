import { Injectable } from '@angular/core';
import { State } from './State';

@Injectable({
  providedIn: 'root'
})
export class OutOfOrderState implements State {
  insertCoin(): string {
    return 'Machine out of order.'
  }

  selectProduct(): string {
    return 'Machine out of order.'
  }

  dispenseProduct(): string {
    return 'Machine out of order.'
  }

  returnCoin(): string {
    return 'Machine out of order.'
  }
}