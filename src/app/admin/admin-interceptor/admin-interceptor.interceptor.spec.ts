import { TestBed } from '@angular/core/testing';

import { AdminInterceptorInterceptor } from './admin-interceptor.interceptor';

describe('AdminInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminInterceptorInterceptor = TestBed.inject(AdminInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
