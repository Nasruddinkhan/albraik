import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtAppointmentListComponent } from './court-appointment-list.component';

describe('CourtAppointmentListComponent', () => {
  let component: CourtAppointmentListComponent;
  let fixture: ComponentFixture<CourtAppointmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtAppointmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
