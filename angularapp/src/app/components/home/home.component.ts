import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  upcomingCourses: Course[] = [];
  popularCourses: Course[] = [];
  courseEnrollments: { [key: number]: number } = {};

  constructor(private courseService: CourseService, public authService: AuthService) { }

  ngOnInit(): void {
    this.initTypingAnimation();
    this.loadUpcomingCourses();
    this.loadPopularCourses();
    this.initRevealOnScroll();
  }

  private initTypingAnimation(): void {
    const typingElement = document.querySelector(".typing") as HTMLElement;
    if (typingElement) {
      typingElement.style.animationDelay = "1s";
    }
  }

  private loadPopularCourses(): void {
    this.courseService.getPopularCourses().subscribe(
      popularCourseIds => {
        this.courseService.getAllCourses().subscribe(
          allCourses => {
            this.popularCourses = popularCourseIds
              .map(id => allCourses.find(course => course.CourseId === id))
              .filter(course => course !== undefined) as Course[];
          }
        );
      }
    );

    this.courseService.getAllCourseApplications().subscribe(
      applications => {
        this.courseEnrollments = applications.reduce((acc, app) => {
          acc[app.CourseId] = (acc[app.CourseId] || 0) + 1;
          return acc;
        }, {});
      }
    );
  }

  private loadUpcomingCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses: Course[]) => {
        this.upcomingCourses = courses
          .filter(course => !course.IsAvailable)
          .slice(0, 4);
      },
      error => {
        console.error('Error loading upcoming courses:', error);
      }
    );
  }

  private initRevealOnScroll(): void {
    const reveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      const cards = document.querySelectorAll('.course-card, .popular-course-card');

      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
          
          // Add stagger animation to cards
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('active');
            }, index * 100);
          });
        }
      });
    };

    window.addEventListener('scroll', reveal);
    // Initial check
    setTimeout(reveal, 100);
  }
}