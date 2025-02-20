import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalClassifierComponent } from './animal-classifier.component';

describe('AnimalClassifierComponent', () => {
  let component: AnimalClassifierComponent;
  let fixture: ComponentFixture<AnimalClassifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalClassifierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalClassifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
