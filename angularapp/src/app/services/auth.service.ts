import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const emptyUser: User = {
      UserId: 0,
      Email: '',
      Password: '',
      Username: '',
      MobileNumber: '',
      UserRole: ''
    };
    
    const currentUserData = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(
      currentUserData ? JSON.parse(currentUserData) : emptyUser
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private parseToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Token parsing error:', e);
      return null;
    }
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, user).pipe(
      map(response => {
        if (response.success) {
          return {
            success: true,
            message: response.msgs || 'Registration successful'
          };
        } else {
          throw new Error(response.msgs || 'Registration failed');
        }
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => ({
          success: false,
          message: error.message || 'Registration failed'
        }));
      })
    );
  }

  login(loginUser: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, loginUser).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          const tokenPayload = this.parseToken(response.token);
          
          if (tokenPayload) {
            const userData: User = {
              UserId: tokenPayload.nameid,
              Email: tokenPayload.email,
              Password: '',
              Username: tokenPayload.name,
              MobileNumber: tokenPayload.phone_number,
              UserRole: tokenPayload.role
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.currentUserSubject.next(userData);
          }
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isSuperAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = this.parseToken(token);
      return tokenPayload?.role.toLowerCase() === 'superadmin';
    }
    return false;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = this.parseToken(token);
      return tokenPayload?.role.toLowerCase() === 'admin';
    }
    return false;
  }

  isUser(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = this.parseToken(token);
      return tokenPayload?.role.toLowerCase() === 'user';
    }
    return false;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || error);
  }
}