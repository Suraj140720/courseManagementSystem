import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CourseService);
  });

  fit('Frontend_should_create_course_service', () => {
    expect(service).toBeTruthy();
  });
});
