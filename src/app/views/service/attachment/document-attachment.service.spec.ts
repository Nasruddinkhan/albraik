import { TestBed } from '@angular/core/testing';

import { DocumentAttachmentService } from './document-attachment.service';

describe('DocumentAttachmentService', () => {
  let service: DocumentAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
