import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseApplication } from 'src/app/models/courseApplication.model';
import { Course } from 'src/app/models/course.model';
@Component({
  selector: 'app-userviewappliedcourseapplication',
  templateUrl: './userviewappliedcourseapplication.component.html',
  styleUrls: ['./userviewappliedcourseapplication.component.css']
})
export class UserviewappliedcourseapplicationComponent implements OnInit {
  courseApplications: CourseApplication[] = [];
  filteredCourseApplications: CourseApplication[] = [];
  courses: Course[] = [];
  userId: number | null = null;

  constructor(private courseService: CourseService, private authService: AuthService) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log("current user is:", currentUser);
    if (currentUser) {
      this.userId = currentUser.UserId;
      this.getAppliedCourses();
      this.getAllCourses();
    } else {
      console.error('User is not logged in.');
    }
  }

  getAppliedCourses() {
    console.log("userId is: ", this.userId);
    if (this.userId !== null) {
      this.courseService.getAppliedCourses(this.userId).subscribe(data => {
        this.courseApplications = data;
        this.filteredCourseApplications = data;
      });
    }
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
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
    this.filteredCourseApplications = this.courseApplications.filter(application =>
      this.getCourseName(application.CourseId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      this.getInstructorName(application.CourseId).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  deleteApplication(applicationId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this course application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourseApplication(applicationId).subscribe(() => {
          this.getAppliedCourses();
          Swal.fire('Deleted!', 'Your course application has been deleted.', 'success');
        });
      }
    });
  }

  isPending(status: string): boolean {
    return status === 'Pending';
  }
}