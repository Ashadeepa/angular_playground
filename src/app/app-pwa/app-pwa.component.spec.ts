import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPwaComponent } from './app-pwa.component';

describe('AppPwaComponent', () => {
  let component: AppPwaComponent;
  let fixture: ComponentFixture<AppPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPwaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
