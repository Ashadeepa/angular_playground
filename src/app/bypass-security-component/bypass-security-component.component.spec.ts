import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BypassSecurityComponentComponent } from './bypass-security-component.component';

describe('BypassSecurityComponentComponent', () => {
  let component: BypassSecurityComponentComponent;
  let fixture: ComponentFixture<BypassSecurityComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BypassSecurityComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BypassSecurityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
