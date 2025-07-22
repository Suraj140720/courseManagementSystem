import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseApplication } from 'src/app/models/courseApplication.model';
import { CourseService } from 'src/app/services/course.service';
import { User } from 'src/app/models/user.model';
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminviewappliedcourseapplication',
  templateUrl: './adminviewappliedcourseapplication.component.html',
  styleUrls: ['./adminviewappliedcourseapplication.component.css']
})
export class AdminviewappliedcourseapplicationComponent implements OnInit {
  courseApplications: CourseApplication[] = [];
  listCourseApplications: CourseApplication[] = [];
  users: User[] = [];
  courses: Course[] = [];

  constructor(private serv: CourseService,private myserv: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllCourseApplications();
    this.getAllUsers();
    this.getAllCourses();
  }

  getAllCourseApplications() {
    this.serv.getAllCourseApplications().subscribe(data => {
      this.courseApplications = data;
      this.listCourseApplications = this.courseApplications;
    });
  }

  getAllUsers() {
    // Fetch all users (implement this method in your service)
    this.myserv.getAllUsers().subscribe(data => {
      this.users = data;
    })

  }

  getAllCourses() {
    this.serv.getAllCourses().subscribe(data => {
      this.courses = data;
      console.log(data);
    });
  }

  getUsername(userId: number): string {
    const user = this.users.find(u => u.UserId === userId);
    return user ? user.Username : 'Unknown';
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
    this.listCourseApplications = this.courseApplications.filter(application =>
      this.getInstructorName(application.CourseId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      this.getCourseName(application.CourseId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.Skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.EducationLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.ExperienceDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.AdditionalNotes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.Status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.ApplicationDate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filterByStatus(status: string) {
    if (status === 'All') {
      this.listCourseApplications = this.courseApplications;
    } else {
      this.listCourseApplications = this.courseApplications.filter(application => application.Status === status);
    }
  }

  approveApplication(application: CourseApplication) {
    application.Status = 'Approved';
    this.serv.updateApplicationStatus(application.CourseApplicationId!, application).subscribe(() => {
      this.getAllCourseApplications();
    });
  }

  rejectApplication(application: CourseApplication) {
    application.Status = 'Rejected';
    this.serv.updateApplicationStatus(application.CourseApplicationId!, application).subscribe(() => {
      this.getAllCourseApplications();
    });
  }

  // New methods to conditionally show buttons
  shouldShowApproveButton(status: string): boolean {
    return status === 'Rejected' || status === 'Pending';
  }

  shouldShowRejectButton(status: string): boolean {
    return status === 'Approved' || status === 'Pending';
  }
}