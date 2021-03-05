import { TestBed } from '@angular/core/testing';

import { ComplianceGuard } from './compliance.guard';

describe('ComplianceGuard', () => {
  let guard: ComplianceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComplianceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
