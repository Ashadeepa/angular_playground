import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoChatAppComponent } from './video-chat-app.component';

describe('VideoChatAppComponent', () => {
  let component: VideoChatAppComponent;
  let fixture: ComponentFixture<VideoChatAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoChatAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoChatAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
