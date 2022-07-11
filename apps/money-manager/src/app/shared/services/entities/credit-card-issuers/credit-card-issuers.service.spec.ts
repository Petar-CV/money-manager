import { TestBed } from '@angular/core/testing';

import { CreditCardIssuersService } from './credit-card-issuers.service';

describe('CreditCardIssuersService', () => {
  let service: CreditCardIssuersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardIssuersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
