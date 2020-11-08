import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormButtonComponent } from './user-form-button.component';

describe('UserFormButtonComponent', () => {
  let component: UserFormButtonComponent;
  let fixture: ComponentFixture<UserFormButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
