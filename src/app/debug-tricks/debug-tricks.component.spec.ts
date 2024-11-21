import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugTricksComponent } from './debug-tricks.component';

describe('DebugTricksComponent', () => {
  let component: DebugTricksComponent;
  let fixture: ComponentFixture<DebugTricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugTricksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebugTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
