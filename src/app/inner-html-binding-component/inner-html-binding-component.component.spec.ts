import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerHtmlBindingComponentComponent } from './inner-html-binding-component.component';

describe('InnerHtmlBindingComponentComponent', () => {
  let component: InnerHtmlBindingComponentComponent;
  let fixture: ComponentFixture<InnerHtmlBindingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerHtmlBindingComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerHtmlBindingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
