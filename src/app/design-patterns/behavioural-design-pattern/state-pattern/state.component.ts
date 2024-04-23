import { Component } from '@angular/core';
import { StateServiceService } from '../service/state-service.service';
import { SelectingState } from './selecting-state';
import { OutOfOrderState } from './out-of-order-state';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent {
  public insertCoinValue = '';
  public selectProductValue = '';
  public dispenseProductValue = '';
  public returnCoinValue = '';
  public currentStateDescription ='Ready state';
  constructor(private stateServiceService: StateServiceService, private selectingState: SelectingState, private outOfOrderState: OutOfOrderState) {}

  insertCoin() {
    this.insertCoinValue = this.stateServiceService.insertCoin();
  }

  selectProduct(): void {
    this.selectProductValue = this.stateServiceService.selectProduct();
  }

  dispenseProduct(): void {
    this.dispenseProductValue = this.stateServiceService.dispenseProduct();
  }

  returnCoin(): void {
    this.returnCoinValue = this.stateServiceService.returnCoin();
  }

  selectingStateClick(): void {
    this.currentStateDescription = 'Selecting state';
    this.reset();
    this.stateServiceService.changeState(this.selectingState);
  }

  outOfOrderStateClick(): void {
    this.currentStateDescription = 'Out of order state';
    this.reset();
    this.stateServiceService.changeState(this.outOfOrderState);
  }
  reset() {
    this.insertCoinValue = '';
    this.selectProductValue = '';
    this.dispenseProductValue = '';
    this.returnCoinValue = '';
  }
}
