import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseApplication } from 'src/app/models/courseApplication.model';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-useraddcourseapplication',
  templateUrl: './useraddcourseapplication.component.html',
  styleUrls: ['./useraddcourseapplication.component.css']
})
export class UseraddcourseapplicationComponent implements OnInit {
  application: CourseApplication = {
    UserId: 0,
    CourseId: 0,
    ApplicationDate: new Date().toISOString().split('T')[0],
    Status: 'Pending',
    Skills: '',
    EducationLevel: '',
    ExperienceDetails: '',
    AdditionalNotes: ''
  };
  courseName:string='';
  formSubmitted: boolean = false;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 
  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.application.UserId = currentUser.UserId;
    }
 
    this.route.params.subscribe(params => {
      this.application.CourseId = +params['courseId']; // Retrieve courseId from route parameters
      this.courseService.getCoursesById(this.application.CourseId).subscribe((res)=>{
      this.courseName=res.CourseName;
      })
      console.log("yash courseid",this.application.CourseId);
    });
  }
 
  onSubmit(requestForm: any): void {
    this.formSubmitted = true;
    console.log("stage 1:", this.application);
    if (!this.application.Skills || !this.application.EducationLevel || !this.application.ExperienceDetails) {
      requestForm.form.markAllAsTouched(); // Mark all fields as touched to show validation messages
      return;
    }
    console.log('Submitting request:', this.application);
    this.courseService.addCourseApplication(this.application).subscribe(
      (response) => {
        console.log('Course Application Submitted Successfully', response);
        Swal.fire({
          title: 'Success!',
          text: 'Course Application Successfully Submitted!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.router.navigate(['/user/view-courses']); // Adjust the route as needed
        });
      },
      (error) => {
        console.error('Error submitting application:', error);
        Swal.fire({
          title: 'Error!',
          text: error, // Use the error message from the handleError method
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }
 
  goBack(): void {
    this.router.navigate(['/user/view-courses']); // Adjust the route as needed
  }
}

