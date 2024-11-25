import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SecCounterComponent } from './sec-counter.component';

fdescribe('SecCounterComponent', () => {
  let component: SecCounterComponent;
  let fixture: ComponentFixture<SecCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process fruits and vegetables with cost less than 100 and status "fresh"', () => {
    component.fruitsAndVegetablesResponse = [
      { name: 'Apple', cost: 50, status: 'fresh' },
      { name: 'Banana', cost: 120, status: 'fresh' },
      { name: 'Carrot', cost: 80, status: 'stale' },
    ];
    component.enrichFruitesAndVeggies();
    expect(component.processedFruitesAndVeggies).toEqual([{ name: 'Apple', cost: 50, status: 'fresh' }]);
  });

  it('should generate items starting with "A" along with their name lengths', () => { // Failing Test
    component.fruitsAndVegetablesResponse = [
      { name: 'Apple', cost: 50, status: 'fresh' },
      { name: 'Apricot', cost: 80, status: 'fresh' },
      { name: 'Banana', cost: 120, status: 'fresh' },
    ];
    component.enrichFruitesAndVeggies();
    expect(component.itemsStartingWithA).toEqual(['Apple_5', 'Apricot_7']);
  });

  it('should handle empty input arrays gracefully', () => {
    component.fruitsAndVegetablesResponse = [];
    component.enrichFruitesAndVeggies();
    expect(component.processedFruitesAndVeggies).toEqual([]);
    expect(component.itemsStartingWithA).toEqual([]);
  });

  it('should start counting from 0 to maxSeconds', fakeAsync(() => {
    component.maxSeconds = 5;
    component.startCounter();

    tick(5000); // Simulate 5 seconds
    expect(component.counter).toBe(5);

    tick(1000); // Simulate additional time
    expect(component.counter).toBe(5); // Should not exceed maxSeconds
  }));

  it('should stop previous counter before starting a new one', fakeAsync(() => {
    spyOn(component, 'stopCounter').and.callThrough();

    component.startCounter();
    expect(component.stopCounter).toHaveBeenCalled();

    tick(3000); // Simulate 3 seconds
    expect(component.counter).toBe(3);
    component.resetCounter();
    component.startCounter();
    expect(component.stopCounter).toHaveBeenCalledTimes(2);
    tick(2000); // Simulate 2 seconds after restart
    expect(component.counter).toBe(2); // Counter reset after restart
  }));

  it('should handle counterSubscription cleanup on stop', fakeAsync(() => {
    component.startCounter();
    tick(2000); // Simulate 2 seconds

    expect(component.counter).toBe(2);
    component.stopCounter();

    expect(component.counterSubscription?.closed).toBeTrue();
  }));
});
