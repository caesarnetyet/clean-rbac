import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { coordinatorGuard } from './coordinator.guard';

describe('coordinatorGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => coordinatorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
