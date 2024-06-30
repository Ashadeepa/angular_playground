import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacadeTestComponent } from './facade-test.component';

describe('FacadeTestComponent', () => {
  let component: FacadeTestComponent;
  let fixture: ComponentFixture<FacadeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacadeTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacadeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
