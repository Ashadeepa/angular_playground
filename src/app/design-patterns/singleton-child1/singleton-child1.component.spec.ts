import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletonChild1Component } from './singleton-child1.component';

describe('SingletonChild1Component', () => {
  let component: SingletonChild1Component;
  let fixture: ComponentFixture<SingletonChild1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingletonChild1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingletonChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
