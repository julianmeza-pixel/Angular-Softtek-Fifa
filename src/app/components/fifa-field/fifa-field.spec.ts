import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifaField } from './fifa-field';

describe('FifaField', () => {
  let component: FifaField;
  let fixture: ComponentFixture<FifaField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FifaField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifaField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
