import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { CourseApplication } from 'src/app/models/courseApplication.model';

@Component({
  selector: 'app-userviewcourse',
  templateUrl: './userviewcourse.component.html',
  styleUrls: ['./userviewcourse.component.css']
})
export class UserviewcourseComponent implements OnInit {

  filteredCourses:Course[]=[];
  courses: Course[] = [];
  appliedCourses: CourseApplication[] = []; // Array to store applied course applications
  userId: number | null = null;
  loading = false; 
  error: string | null = null;

  constructor(private courseService: CourseService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.userId = currentUser.UserId;
      this.courseService.getAllCourses().subscribe(data => {
        this.courses = data.filter(course => course.IsAvailable);
        this.filteredCourses = [...this.courses];
        this.getAppliedCourses();
      }) ; 
    } else {
      this.router.navigate(['login'])
      // console.error('User is not logged in.');
    }
  }

  getAllCourses() {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data.filter(course => course.IsAvailable);
        this.filteredCourses = [...this.courses];
        this.getAppliedCourses();
      },
      error: (err) => {
        this.error = 'Failed to load courses';
        this.loading = false;
      }
    });
  }
  

  getAppliedCourses(){
    if (this.userId !== null) {
      this.courseService.getAppliedCourses(this.userId).subscribe(data => {
        this.appliedCourses = data; 
        this.filteredCourses=[...this.courses];
      });
    }
  }
  getCourseName(courseId: number): string {
    const course = this.courses.find(c => c.CourseId === courseId);
    return course ? course.CourseName : 'Unknown';
  }

  getInstructorName(courseId: number): string {
    const course = this.courses.find(c => c.CourseId === courseId);
    return course ? course.InstructorName : 'Unknown';
  }
  searchDynamic(searchTerm: string) {
    this.filteredCourses = this.courses.filter(application =>
      this.getCourseName(application.CourseId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      this.getInstructorName(application.CourseId).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  isEnrolledOrApplied(courseId: number): boolean {
    return this.appliedCourses.some(application => application.CourseId === courseId);
  }

  enroll(courseId: number) {
    // Navigate to the UseraddcourseapplicationComponent with the courseId
    this.router.navigate([`/user/add-courses/${courseId}`]);
  }
}