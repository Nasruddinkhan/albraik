import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InheritanceComponent } from './inheritance.component';

describe('InheritanceComponent', () => {
  let component: InheritanceComponent;
  let fixture: ComponentFixture<InheritanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InheritanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InheritanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
