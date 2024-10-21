import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssTricksComponent } from './css-tricks.component';

describe('CssTricksComponent', () => {
  let component: CssTricksComponent;
  let fixture: ComponentFixture<CssTricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssTricksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CssTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
