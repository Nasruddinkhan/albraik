import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InheritenceComponent } from './inheritence.component';

describe('InheritenceComponent', () => {
  let component: InheritenceComponent;
  let fixture: ComponentFixture<InheritenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InheritenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InheritenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
