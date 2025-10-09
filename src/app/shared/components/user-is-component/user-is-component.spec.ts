import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIsComponent } from './user-is-component';

describe('UserIsComponent', () => {
  let component: UserIsComponent;
  let fixture: ComponentFixture<UserIsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserIsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
