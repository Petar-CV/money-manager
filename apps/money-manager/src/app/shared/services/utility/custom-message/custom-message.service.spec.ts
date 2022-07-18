import { TestBed } from '@angular/core/testing';

import { CustomMessageService } from './custom-message.service';

describe('CustomMessageService', () => {
  let service: CustomMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
