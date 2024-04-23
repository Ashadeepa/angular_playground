import { Injectable } from '@angular/core';
import { State } from '../state-pattern/State';
import { ReadyState } from '../state-pattern/ready-state';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {
  private currentState: State;
 
  constructor(private readyState: ReadyState) {
    this.currentState = readyState;
  }

  insertCoin(): string {
    return this.currentState.insertCoin();
  }

  selectProduct(): string {
    return this.currentState.selectProduct();
  }

  dispenseProduct(): string {
    return this.currentState.dispenseProduct();
  }

  returnCoin(): string {
    return this.currentState.returnCoin();
  }

  // Method to change the state of the vending machine
  changeState(newState: State): void {
    this.currentState = newState;
  }
}
