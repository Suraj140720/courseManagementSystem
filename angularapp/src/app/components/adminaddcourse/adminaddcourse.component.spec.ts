
import { AdminaddcourseComponent } from './adminaddcourse.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AdminaddcourseComponent', () => {
  let component: AdminaddcourseComponent;
  let fixture: ComponentFixture<AdminaddcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddcourseComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_adminaddcourse_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_contain_add_new_course_heading_in_the_adminaddcourse_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Add New Course');
  });
});
