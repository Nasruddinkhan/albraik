import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedOwnershipComponent } from './deed-ownership.component';

describe('DeedOwnershipComponent', () => {
  let component: DeedOwnershipComponent;
  let fixture: ComponentFixture<DeedOwnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeedOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
