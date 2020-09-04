import { TestBed } from '@angular/core/testing';

import { ToasterMsgService } from './toaster-msg.service';

describe('ToasterMsgService', () => {
  let service: ToasterMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
