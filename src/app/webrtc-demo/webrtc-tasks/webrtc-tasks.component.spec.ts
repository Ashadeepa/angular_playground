import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebrtcTasksComponent } from './webrtc-tasks.component';

describe('WebrtcTasksComponent', () => {
  let component: WebrtcTasksComponent;
  let fixture: ComponentFixture<WebrtcTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebrtcTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebrtcTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
