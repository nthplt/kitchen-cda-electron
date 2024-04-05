import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIdComponent } from './recipe-id.component';

describe('RecipeIdComponent', () => {
  let component: RecipeIdComponent;
  let fixture: ComponentFixture<RecipeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
