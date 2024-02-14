import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FE02WorkshopComponent } from './fe-02-workshop.component';

describe('FE02WorkshopComponent', () => {
  let component: FE02WorkshopComponent;
  let fixture: ComponentFixture<FE02WorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FE02WorkshopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FE02WorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
