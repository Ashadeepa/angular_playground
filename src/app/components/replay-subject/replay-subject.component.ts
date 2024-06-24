import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-replay-subject',
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
  styleUrls: ['./replay-subject.component.scss']
})
export class ReplaySubjectComponent {
  items = [] as any[];
  replaySubject = new ReplaySubject(0);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
 
   emitItem(){
     this.replaySubject.next(1);
     console.log('====================================');
     console.log(1);
     console.log('====================================');
     setTimeout(() => {
       this.replaySubject.next(2);
     }, 2000);
     setTimeout(() => {
       this.replaySubject.next(3);
     }, 4000);
     setTimeout(() => {
       this.replaySubject.next(4);
     }, 6000);
   }
 
   getItems(){
     this.replaySubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: any) => {
       this.items.push(data);
     })
   }
}
