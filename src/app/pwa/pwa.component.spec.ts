import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaComponent } from './pwa.component';

describe('PwaComponent', () => {
  let component: PwaComponent;
  let fixture: ComponentFixture<PwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
