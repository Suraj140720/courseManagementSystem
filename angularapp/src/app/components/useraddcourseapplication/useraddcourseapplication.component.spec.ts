
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UseraddcourseapplicationComponent } from './useraddcourseapplication.component';

describe('UseraddcourseapplicationComponent', () => {
  let component: UseraddcourseapplicationComponent;
  let fixture: ComponentFixture<UseraddcourseapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraddcourseapplicationComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraddcourseapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_useraddcourseapplication_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_display_heading_course_application_form_in_useraddcourseapplication_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Course Application Form');
  });
});
