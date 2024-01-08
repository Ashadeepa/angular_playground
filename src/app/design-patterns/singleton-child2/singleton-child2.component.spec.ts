import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletonChild2Component } from './singleton-child2.component';

describe('SingletonChild2Component', () => {
  let component: SingletonChild2Component;
  let fixture: ComponentFixture<SingletonChild2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingletonChild2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingletonChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
