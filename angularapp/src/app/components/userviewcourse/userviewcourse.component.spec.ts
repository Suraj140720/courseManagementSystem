import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserviewcourseComponent } from './userviewcourse.component';


describe('UserviewcourseComponent', () => {
  let component: UserviewcourseComponent;
  let fixture: ComponentFixture<UserviewcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewcourseComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userviewcourse_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_display_heading_available_courses_in_userviewcourse_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Available Courses');
  });
});
