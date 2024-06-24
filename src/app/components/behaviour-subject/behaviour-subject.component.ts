import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-behaviour-subject',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <div class="container mt-4">
  <div class="card">
    <div class="card-header bg-primary text-white">BehaviourSubject</div>
    <div class="card-body">
      <h5 class="card-title">
        A BehaviorSubject is like an observable but can be multicast to many Observers
        <h6 class="text-primary">It returns the last Data</h6>
      </h5>
      <div class="mt-4">
        <div class="row">
          <div class="col-md-6">
            <button
              type="button"
              class="btn btn-primary mr-2"
              (click)="emitItem()"
            >
              Emit Item
            </button>
            <button
              type="button"
              class="btn btn-primary"
              (click)="getItems()"
            >
            Get Item
            </button>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">
                <label class="font-weight-bold">Items: </label>
                <span *ngFor="let item of items">{{item}} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./behaviour-subject.component.scss']
})
export class BehaviourSubjectComponent {
 items = [] as any[];
 behaviourSubject = new BehaviorSubject(0);
 private readonly destroyRef: DestroyRef = inject(DestroyRef);

  emitItem(){
    this.behaviourSubject.next(1);
    console.log('====================================');
    console.log(1);
    console.log('====================================');
    setTimeout(() => {
      this.behaviourSubject.next(2);
    }, 2000);
    setTimeout(() => {
      this.behaviourSubject.next(3);
    }, 4000);
    setTimeout(() => {
      this.behaviourSubject.next(4);
    }, 6000);
  }

  getItems(){
    this.behaviourSubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: any) => {
      this.items.push(data);
    })
  }
}
