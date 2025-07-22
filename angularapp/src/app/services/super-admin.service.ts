import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuperAdmin } from '../models/superAdmin';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAdminUsers(): Observable<SuperAdmin[]> {
    return this.http.get<SuperAdmin[]>(`${this.apiUrl}/api/SuperAdmin`);
  }

  addAdmin(requestObject: SuperAdmin): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/SuperAdmin`, requestObject);
  }

  updateAdminStatus(id: number, requestObject: SuperAdmin): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/SuperAdmin/${id}`, requestObject);
  }

  deleteAdmin(id: number): Observable<SuperAdmin> {
    return this.http.delete<SuperAdmin>(`${this.apiUrl}/api/SuperAdmin/${id}`);
  }

  GetAdminReqByEmail(email : string) : Observable<boolean>
  {
    return this.http.get<boolean>(`${this.apiUrl}/api/SuperAdmin/${email}`);
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class SuperAdminService {

//   public apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) { }

//   getAdminUsers() : Observable<SuperAdmin[]>
//   {
//     return this.http.get<SuperAdmin[]>(`${this.apiUrl}/api/SuperAdmin`);
//   }

//   addAdmin(requestObject: SuperAdmin): Observable<any> {
//     return this.http.post(`${this.apiUrl}/api/SuperAdmin`, requestObject);
//   }
 
//   updateAdminStatus(id: number, requestObject: SuperAdmin): Observable<any> {
//     console.log('Route:' + `${this.apiUrl}/api/SuperAdmin/${id}`);
//     return this.http.put<any>(`${this.apiUrl}/api/SuperAdmin/${id}`, requestObject);
//   }

//   deleteAdmin(id : number) : Observable<SuperAdmin>
//   {
//     return this.http.delete<SuperAdmin>(`${this.apiUrl}/api/SuperAdmin/${id}`);
//   }
// }
