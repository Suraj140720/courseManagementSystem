import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserviewappliedcourseapplicationComponent } from './userviewappliedcourseapplication.component';

describe('UserviewappliedcourseapplicationComponent', () => {
  let component: UserviewappliedcourseapplicationComponent;
  let fixture: ComponentFixture<UserviewappliedcourseapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewappliedcourseapplicationComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewappliedcourseapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userviewappliedcourseapplication_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_display_heading_applied_course_applications_in_userviewappliedcourseapplication_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Applied Course Applications');
  });
});
