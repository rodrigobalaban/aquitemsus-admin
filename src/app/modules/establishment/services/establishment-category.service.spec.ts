import { TestBed } from '@angular/core/testing';

import { EstablishmentCategoryService } from './establishment-category.service';

describe('EstablishmentCategoryService', () => {
  let service: EstablishmentCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablishmentCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
