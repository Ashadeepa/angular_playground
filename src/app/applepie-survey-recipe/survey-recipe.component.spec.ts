import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRecipeComponent } from './survey-recipe.component';

describe('SurveyRecipeComponent', () => {
  let component: SurveyRecipeComponent;
  let fixture: ComponentFixture<SurveyRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
