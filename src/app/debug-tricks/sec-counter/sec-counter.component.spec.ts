import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecCounterComponent } from './sec-counter.component';

describe('SecCounterComponent', () => {
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
});
