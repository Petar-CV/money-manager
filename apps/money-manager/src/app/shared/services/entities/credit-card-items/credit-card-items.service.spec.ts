import { TestBed } from '@angular/core/testing';

import { CreditCardItemsService } from './credit-card-items.service';

describe('CreditCardItemsService', () => {
  let service: CreditCardItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
