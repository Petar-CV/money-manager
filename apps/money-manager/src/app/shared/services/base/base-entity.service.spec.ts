import { TestBed } from '@angular/core/testing';

import { BaseEntityService } from './base-entity.service';

describe('BaseEntityService', () => {
  let service: BaseEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
