import { Injectable } from "@angular/core";
import { State } from "./State";
@Injectable({
    providedIn: 'root'
  })
export class ReadyState implements State {
  insertCoin(): string {
    console.log('Coin inserted.');
    return 'Coin inserted.'
  }

  selectProduct(): string {
    console.log('Please select a product.');
    return 'Please select a product.'
  }

  dispenseProduct(): string {
    console.log('Please select a product.');
    return 'Please select a product.'
  }

  returnCoin(): string {
    console.log('No coin to return.');
    return 'Please select a product.'
  }
}