import { TestBed } from '@angular/core/testing';

import { IteratorServiceService } from './iterator-service.service';

describe('IteratorServiceService', () => {
  let service: IteratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IteratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
