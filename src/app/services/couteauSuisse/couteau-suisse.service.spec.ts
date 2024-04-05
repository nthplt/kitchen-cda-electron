import { TestBed } from '@angular/core/testing';

import { CouteauSuisseService } from './couteau-suisse.service';

describe('CouteauSuisseService', () => {
  let service: CouteauSuisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouteauSuisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
