import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishCompanyComponent } from './establish-company.component';

describe('EstablishCompanyComponent', () => {
  let component: EstablishCompanyComponent;
  let fixture: ComponentFixture<EstablishCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
