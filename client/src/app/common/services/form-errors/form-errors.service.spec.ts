import { TestBed } from '@angular/core/testing';

import { FormErrorsService } from './form-errors.service';

describe('FormErrorsService', () => {
  let service: FormErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
