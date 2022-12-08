import { TestBed } from '@angular/core/testing';

import { EstablishmentContextService } from './establishment-context.service';

describe('EstablishmentContextService', () => {
  let service: EstablishmentContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablishmentContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
