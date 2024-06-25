import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <div class="container mt-4">
  <div class="card">
    <div class="card-header bg-primary text-white">Subject</div>
    <div class="card-body">
      <h5 class="card-title">
        A Subject is like an observable but can be multicast to many Observers
        <h6 class="text-primary">Data from different subscribers always be the same (multicast)</h6>
      </h5>
      <div class="mt-4">
        <div class="row">
          <div class="col-md-6">
            <button type="button" class="btn btn-primary" (click)="emitValueSubject()">Emit Value</button>
          </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-primary" (click)="subscribeNowSubject1()">Subscribe 1</button>
          </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-primary" (click)="subscribeNowSubject2()">Subscribe 2</button>
          </div>

          <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Emitted Value</th>
              <th>Subscription 1</th>
              <th>Subscription 2</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of subjectData">
              <td></td>
              <td>{{ item.emitted }}</td>
              <td>{{ item.sub1 }}</td>
              <td>{{ item.sub2 }}</td>
            </tr>
          </tbody>
        </table>

        </div>
      </div>
    </div>
  </div>
</div>




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
          <button type="button" class="btn btn-primary" (click)="emitValueBehavior()">Emit Value</button>
        </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-primary" (click)="subscribeNowBehavior1()">Subscribe 1</button>
          </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-primary" (click)="subscribeNowBehavior2()">Subscribe 2</button>
          </div>

          <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Emitted Value</th>
              <th>Subscription 1</th>
              <th>Subscription 2</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of behaviorData">
              <td></td>
              <td>{{ item.emitted }}</td>
              <td>{{ item.sub1 }}</td>
              <td>{{ item.sub2 }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</div>
</div>




<div class="container mt-4">
<div class="card">
  <div class="card-header bg-primary text-white">BehaviourSubject</div>
  <div class="card-body">
    <h5 class="card-title">
      A ReplaySubject is like an observable but can be multicast to many Observers
      <h6 class="text-primary">It replays the last Data</h6>
    </h5>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-6">
          <button type="button" class="btn btn-primary" (click)="emitValueReplay()">Emit Value</button>
        </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-primary" (click)="subscribeNowReplay1()">Subscribe 1</button>
          </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-primary" (click)="subscribeNowReplay2()">Subscribe 2</button>
          </div>

          <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Emitted Value</th>
              <th>Subscription 1</th>
              <th>Subscription 2</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of replayData">
              <td></td>
              <td>{{ item.emitted }}</td>
              <td>{{ item.sub1 }}</td>
              <td>{{ item.sub2 }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</div>
</div>
  `,
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent {
  emitData = -1;
  subjectData: any = [];
  subject$ = new Subject();
  
  emitBehaviorData = -1;
  behaviorData: any = [];
  behaviourSubject$ = new BehaviorSubject(0);
  
  emitReplayData = -1;
  replayData: any = [];
  replaySubject$ = new ReplaySubject(4);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
  }

  emitValueSubject() {
    this.emitData++;
    this.subjectData.push({ emitted: this.emitData, sub1: '', sub2: '' });
    this.subject$.next(this.emitData);
  }

  subscribeNowSubject1() {
    this.subjectData[this.emitData].sub1 = 'Subscribed';
    this.subject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.subjectData[this.emitData].sub1 = data;
    });
  }

  subscribeNowSubject2() {
    this.subjectData[this.emitData].sub2 = 'Subscribed';
    this.subject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.subjectData[this.emitData].sub2 = data;
    });
  }




  /////////////////////////////////// Behaviour Subject //////////////////////////////////////
  
  emitValueBehavior() {
    this.emitBehaviorData++;
    this.behaviorData.push({ emitted: this.emitBehaviorData, sub1: '', sub2: '' });
    this.behaviourSubject$.next(this.emitBehaviorData);
  }

  subscribeNowBehavior1() {
    this.behaviorData[this.emitBehaviorData].sub1 = 'Subscribed > ';
    this.behaviourSubject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.behaviorData[this.emitBehaviorData].sub1 += ' ' + data;
    });
  }

  subscribeNowBehavior2() {
    this.behaviorData[this.emitBehaviorData].sub2 = 'Subscribed > ';
    this.behaviourSubject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.behaviorData[this.emitBehaviorData].sub2 += ' ' + data;
    });
  }




  /////////////////////////////////// Replay Subject //////////////////////////////////////
  
  emitValueReplay() {
    this.emitReplayData++;
    this.replayData.push({ emitted: this.emitReplayData, sub1: '', sub2: '' });
    this.replaySubject$.next(this.emitReplayData);
  }

  subscribeNowReplay1() {
    this.replayData[this.emitReplayData].sub1 = 'Subscribed > ';
    this.replaySubject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.replayData[this.emitReplayData].sub1 += data;
    });
  }

  subscribeNowReplay2() {
    this.replayData[this.emitReplayData].sub2 = 'Subscribed > ';
    this.replaySubject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.replayData[this.emitReplayData].sub2 += data;
    });
  }
}
