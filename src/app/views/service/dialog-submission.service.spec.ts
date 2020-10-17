import { TestBed } from '@angular/core/testing';

import { DialogSubmissionService } from './dialog-submission.service';

describe('DialogSubmissionService', () => {
  let service: DialogSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
