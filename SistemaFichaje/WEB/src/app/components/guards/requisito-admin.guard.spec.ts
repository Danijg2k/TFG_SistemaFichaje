import { TestBed } from '@angular/core/testing';

import { RequisitoAdminGuard } from './requisito-admin.guard';

describe('RequisitoAdminGuard', () => {
  let guard: RequisitoAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RequisitoAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
