import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendFeedback(feedback: Feedback): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/Feedback`, feedback, { responseType: 'text' as 'json' });
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback`);
  }

  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback/user/${userId}`);
  }

  deleteFeedback(feedbackId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/api/Feedback/${feedbackId}`, { responseType: 'text' as 'json' });
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class FeedbackService {

//   public apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) { }


//   private getHeaders(): HttpHeaders {
//     const token = JSON.parse(localStorage.getItem('currentUser'))?.token; // Retrieve the token from localStorage
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   sendFeedback(feedback: Feedback): Observable<string> {
//     return this.http.post<string>(`${this.apiUrl}/api/Feedback`, feedback, { headers: this.getHeaders(), responseType: 'text' as 'json' });
//   }

//   getFeedbacks(): Observable<Feedback[]> {
//     return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback`, { headers: this.getHeaders() });
//   }

//   getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
//     return this.http.get<Feedback[]>(`${this.apiUrl}/api/Feedback/user/${userId}`, { headers: this.getHeaders() });
//   }

//   deleteFeedback(feedbackId: number): Observable<string> {
//     return this.http.delete<string>(`${this.apiUrl}/api/Feedback/${feedbackId}`, { headers: this.getHeaders(), responseType: 'text' as 'json' });
//   }
// }