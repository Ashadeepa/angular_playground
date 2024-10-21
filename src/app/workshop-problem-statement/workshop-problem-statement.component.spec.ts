import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopProblemStatementComponent } from './workshop-problem-statement.component';

describe('WorkshopProblemStatementComponent', () => {
  let component: WorkshopProblemStatementComponent;
  let fixture: ComponentFixture<WorkshopProblemStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopProblemStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkshopProblemStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
