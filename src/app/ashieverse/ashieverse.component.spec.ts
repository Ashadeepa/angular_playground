import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshieverseComponent } from './ashieverse.component';

describe('AshieverseComponent', () => {
  let component: AshieverseComponent;
  let fixture: ComponentFixture<AshieverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AshieverseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AshieverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
