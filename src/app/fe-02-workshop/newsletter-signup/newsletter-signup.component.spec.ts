import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSignupComponent } from './newsletter-signup.component';

describe('NewsletterSignupComponent', () => {
  let component: NewsletterSignupComponent;
  let fixture: ComponentFixture<NewsletterSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsletterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
