import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-adminviewcourse',
  templateUrl: './adminviewcourse.component.html',
  styleUrls: ['./adminviewcourse.component.css']
})

export class AdminviewcourseComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery: string = '';
  courseId: number;
  course: Course;
  courseIdToDelete: number;

  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
      this.filteredCourses = data; // Initialize filteredCourses with all courses
    });
  }

  setCourseIdToDelete(courseId: number): void {
    this.courseIdToDelete = courseId;
  
  
  }

  confirmDelete(courseId:number): void {
    
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete this course application?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.isConfirmed) {
            this.courseService.deleteCourse(courseId).subscribe(
              () => {
                Swal.fire('Deleted!', 'The course has been deleted.', 'success');
                this.loadCourses(); // Refresh the course list after deletion
              },
              (error) => {
                Swal.fire('Error!', 'Course cannot be deleted, it is referenced in Course Application', 'error');
              }
            );
          }
        });
        
  }

  editCourse(courseId: number): void {
    console.log(`/admin/admineditcourse/${courseId}`);
    this.router.navigate([`/admin/admineditcourse/${courseId}`]);
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.CourseName.toLowerCase().includes(query) ||
      course.InstructorName.toLowerCase().includes(query)
    );
  }
}