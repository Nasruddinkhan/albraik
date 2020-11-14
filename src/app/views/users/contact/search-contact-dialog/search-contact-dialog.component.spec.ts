import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContactDialogComponent } from './search-contact-dialog.component';

describe('SearchContactDialogComponent', () => {
  let component: SearchContactDialogComponent;
  let fixture: ComponentFixture<SearchContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
