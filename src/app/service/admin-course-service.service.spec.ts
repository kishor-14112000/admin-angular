import { TestBed } from '@angular/core/testing';

import { AdminCourseServiceService } from './admin-course-service.service';

describe('AdminCourseServiceService', () => {
  let service: AdminCourseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCourseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
