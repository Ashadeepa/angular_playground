import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplepieIngredientComponent } from './applepie-ingredient.component';

describe('ApplepieIngredientComponent', () => {
  let component: ApplepieIngredientComponent;
  let fixture: ComponentFixture<ApplepieIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplepieIngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplepieIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
