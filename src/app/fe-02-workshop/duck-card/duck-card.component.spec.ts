import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckCardComponent } from './duck-card.component';

describe('DuckCardComponent', () => {
  let component: DuckCardComponent;
  let fixture: ComponentFixture<DuckCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuckCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuckCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
