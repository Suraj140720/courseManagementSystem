import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminaddcourse',
  templateUrl: './adminaddcourse.component.html',
  styleUrls: ['./adminaddcourse.component.css']
})
export class AdminaddcourseComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;
  successMessage: string;
  validationErrors: any;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder, 
    private courseService: CourseService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      CourseName: ['', Validators.required],
      Description: ['', Validators.required],
      InstructorName: ['', Validators.required],
      DurationInHours: ['', [Validators.required, Validators.min(1)]],
      Price: ['', [Validators.required, Validators.min(0)]],
      CourseContent: ['', Validators.required],
      IsAvailable: [null, Validators.required]
    }, { validator: this.allFieldsRequiredValidator });
  }

  get f() { return this.courseForm.controls; }

  addCourse(): void {
    this.submitted = true;

    if (this.courseForm.invalid) {
      return;
    }

    const formValue = {
      ...this.courseForm.value,
      IsAvailable: this.courseForm.value.IsAvailable === 'true'
    };

    this.courseService.addCourse(formValue).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Course added successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#28a745'
        }).then(() => {
          this.courseForm.reset();
          this.submitted = false;
          this.router.navigate(['admin/view-courses']);
        });
      },
      error: (error) => {
        const errorMessage = error.error?.title === 'Course with the same name already exists' 
          ? 'Course with the same name already exists' 
          : error.error?.title || 'The Course Already Exists';

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#dc3545'
        });
        
        this.validationErrors = error.error?.errors || {};
      }
    });
  }

  allFieldsRequiredValidator(formGroup: FormGroup): ValidationErrors | null {
    const controls = formGroup.controls;
    let allFieldsEmpty = true;

    for (const name in controls) {
      if (controls[name].value !== '' && controls[name].value !== null) {
        allFieldsEmpty = false;
        break;
      }
    }

    return allFieldsEmpty ? { allFieldsRequired: true } : null;
  }
}