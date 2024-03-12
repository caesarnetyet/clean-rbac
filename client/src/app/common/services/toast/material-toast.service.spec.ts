import { TestBed } from '@angular/core/testing';

import { MaterialToastService } from './material-toast.service';

describe('MaterialToastService', () => {
  let service: MaterialToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
