import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFiltersComponent } from './button-filters-component';

describe('ButtonFiltersComponent', () => {
  let component: ButtonFiltersComponent;
  let fixture: ComponentFixture<ButtonFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
