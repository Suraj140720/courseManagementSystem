// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { Course } from '../models/course.model';
// import { CourseApplication } from '../models/courseApplication.model';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseService {


//   public apiUrl = environment.apiUrl;


//   constructor(private http: HttpClient) { }


 
//   private getHeaders(): HttpHeaders {
//     const currentUser = localStorage.getItem('currentUser');
//     if (currentUser) {
//       const token = JSON.parse(currentUser).token;
//       if (token) {
//         return new HttpHeaders({
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`
//         });
//       }
//     }
//     return new HttpHeaders({
//       'Accept': 'application/json'
//     });
//   }

//   getAllCourses(): Observable<Course[]> {
//     return this.http.get<Course[]>(`${this.apiUrl}/api/Course`, { headers: this.getHeaders() })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   deleteCourse(courseId: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/api/Course/${courseId}`, { headers: this.getHeaders() })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   getCoursesById(id: number): Observable<Course> {
//     return this.http.get<Course>(`${this.apiUrl}/api/Course/${id}`, { headers: this.getHeaders() })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   addCourse(requestObject: Course): Observable<any> {
//     return this.http.post(`${this.apiUrl}/api/Course`, requestObject, { headers: this.getHeaders(), responseType: 'text' })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

 
 
//   updateCourse(courseId: number, requestObject: Course): Observable<any> {
//     console.log('Route:' + `${this.apiUrl}/api/Course/${courseId}`);
//     return this.http.put<any>(`${this.apiUrl}/api/Course/${courseId}`, requestObject, { headers: this.getHeaders() });
   

//   }
//   updateCourses(id: number, requestObject: Course): Observable<any> {
//     return this.http.put(`${this.apiUrl}/api/Course/${id}`, requestObject, { headers: this.getHeaders(), responseType: 'text' })
//       .pipe(
//         catchError(this.handleError)
//       );

//   }
  

//   getAppliedCourses(userId: number): Observable<CourseApplication[]> {
//     return this.http.get<CourseApplication[]>(`${this.apiUrl}/api/CourseApplication/user/${userId}`, { headers: this.getHeaders() })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   deleteCourseApplication(courseId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/api/CourseApplication/${courseId}`, { headers: this.getHeaders(), responseType: 'text' })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   addCourseApplication(data: CourseApplication): Observable<any> {
//     return this.http.post(`${this.apiUrl}/api/CourseApplication`, data, { headers: this.getHeaders(), responseType: 'text' })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   getAllCourseApplications(): Observable<CourseApplication[]> {
//     return this.http.get<CourseApplication[]>(`${this.apiUrl}/api/CourseApplication`, { headers: this.getHeaders() })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   updateApplicationStatus(id: number, courseApplication: CourseApplication): Observable<any> {
//     return this.http.put(`${this.apiUrl}/api/CourseApplication/${id}`, courseApplication, { headers: this.getHeaders(), responseType: 'text' })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   private handleError(error: HttpErrorResponse): Observable<never> {
//     let errorMessage = 'Something went wrong; please try again later.';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//       if (error.error) {
//         errorMessage += `\nDetails: ${error.error}`;
//       }
//     }
//     console.error('An error occurred:', errorMessage);
//     return throwError(errorMessage);
//   }

//   getPopularCourses(): Observable<any[]> {
//     return this.getAllCourseApplications().pipe(
//       map(applications => {
//         // Count enrollments for each course
//         const courseEnrollments = applications.reduce((acc, app) => {
//           acc[app.CourseId] = (acc[app.CourseId] || 0) + 1;
//           return acc;
//         }, {});
  
//         // Convert to array and sort by enrollment count
//         return Object.entries(courseEnrollments)
//           .sort(([, a], [, b]) => (b as number) - (a as number))
//           .slice(0, 4)
//           .map(([courseId]) => parseInt(courseId));
//       })
//     );
//   }

// }
 
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseApplication } from '../models/courseApplication.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/api/Course`).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/Course/${courseId}`).pipe(
      catchError(this.handleError)
    );
  }

  getCoursesById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/api/Course/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addCourse(requestObject: Course): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Course`, requestObject, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  updateCourse(courseId: number, requestObject: Course): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/Course/${courseId}`, requestObject);
  }

  updateCourses(id: number, requestObject: Course): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Course/${id}`, requestObject, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  getAppliedCourses(userId: number): Observable<CourseApplication[]> {
    return this.http.get<CourseApplication[]>(`${this.apiUrl}/api/CourseApplication/user/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourseApplication(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/CourseApplication/${courseId}`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  addCourseApplication(data: CourseApplication): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/CourseApplication`, data, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  getAllCourseApplications(): Observable<CourseApplication[]> {
    return this.http.get<CourseApplication[]>(`${this.apiUrl}/api/CourseApplication`).pipe(
      catchError(this.handleError)
    );
  }

  updateApplicationStatus(id: number, courseApplication: CourseApplication): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/CourseApplication/${id}`, courseApplication, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  getPopularCourses(): Observable<any[]> {
    return this.getAllCourseApplications().pipe(
      map(applications => {
        const courseEnrollments = applications.reduce((acc, app) => {
          acc[app.CourseId] = (acc[app.CourseId] || 0) + 1;
          return acc;
        }, {});
        
        return Object.entries(courseEnrollments)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 4)
          .map(([courseId]) => parseInt(courseId));
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error) {
        errorMessage += `\nDetails: ${error.error}`;
      }
    }
    console.error('An error occurred:', errorMessage);
    return throwError(errorMessage);
  }
}

