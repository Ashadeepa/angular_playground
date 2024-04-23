import { Injectable } from '@angular/core';
import { State } from './State';

@Injectable({
  providedIn: 'root'
})
export class SelectingState  implements State {
  insertCoin(): string {
    console.log('Coin already inserted.');
    return 'Coin already inserted.'
  }

  selectProduct(): string {
    console.log('Product already selected.');
    return 'Product already selected.'
  }

  dispenseProduct(): string {
    console.log('Dispensing product...');
    return 'Dispensing product...'
  }

  returnCoin(): string {
    console.log('Returning coin...');
    return 'Returning coin...'
  }
}