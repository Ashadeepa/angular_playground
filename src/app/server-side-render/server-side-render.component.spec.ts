import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSideRenderComponent } from './server-side-render.component';

describe('ServerSideRenderComponent', () => {
  let component: ServerSideRenderComponent;
  let fixture: ComponentFixture<ServerSideRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerSideRenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServerSideRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
