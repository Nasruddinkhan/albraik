import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedOfOwnershipComponent } from './deed-of-ownership.component';

describe('DeedOfOwnershipComponent', () => {
  let component: DeedOfOwnershipComponent;
  let fixture: ComponentFixture<DeedOfOwnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeedOfOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedOfOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
