import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleRecipeComponent } from './apple-recipe.component';

describe('ApplepieRecipeComponentComponent', () => {
  let component: AppleRecipeComponent;
  let fixture: ComponentFixture<AppleRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppleRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppleRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
