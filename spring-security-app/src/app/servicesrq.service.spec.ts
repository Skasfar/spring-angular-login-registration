import { TestBed } from '@angular/core/testing';

import { ServicesrqService } from './servicesrq.service';

describe('ServicesrqService', () => {
  let service: ServicesrqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesrqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
