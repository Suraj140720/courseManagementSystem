import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admineditcourse',
  templateUrl: './admineditcourse.component.html',
  styleUrls: ['./admineditcourse.component.css']
})
export class AdmineditcourseComponent implements OnInit {
  courseForm!: FormGroup;
  courseId!: number;
  course: Course = {
    CourseId: 0,
    CourseName: "",
    Description: "",
    InstructorName: "",
    DurationInHours: 0,
    Price: 0,
    CourseContent: "",
    IsAvailable: false
  };

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.initializeForm();
    this.loadCourse();
  }

  initializeForm(): void {
    this.courseForm = this.fb.group({
      CourseName: ['', [Validators.required, Validators.minLength(3)]],
      Description: ['', [Validators.required, Validators.minLength(10)]],
      InstructorName: ['', [Validators.required, Validators.minLength(3)]],
      DurationInHours: ['', [Validators.required, Validators.min(1)]],
      Price: ['', [Validators.required, Validators.min(0)]],
      CourseContent: ['', [Validators.required]],
      IsAvailable: [false, Validators.required]
    });
  }

  loadCourse(): void {
    this.courseService.getCoursesById(this.courseId).subscribe({
      next: (data) => {
        this.course = data;
        this.courseForm.patchValue(this.course);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load course details',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill all required fields correctly',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    const updatedCourse: Course = {
      ...this.course,
      ...this.courseForm.value,
      IsAvailable: this.courseForm.value.IsAvailable === 'true' || this.courseForm.value.IsAvailable === true
    };

    this.courseService.updateCourse(this.courseId, updatedCourse).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Course updated successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#28a745'
        }).then(() => {
          this.router.navigate(['/admin/view-courses']);
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update course',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/view-courses']);
  }
}