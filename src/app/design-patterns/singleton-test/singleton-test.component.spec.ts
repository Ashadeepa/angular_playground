import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletonTestComponent } from './singleton-test.component';

describe('SingletonTestComponent', () => {
  let component: SingletonTestComponent;
  let fixture: ComponentFixture<SingletonTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingletonTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingletonTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
