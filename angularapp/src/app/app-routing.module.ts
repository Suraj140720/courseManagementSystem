import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { Login } from './models/login.model';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { AdminaddcourseComponent } from './components/adminaddcourse/adminaddcourse.component';
import { AdminviewcourseComponent } from './components/adminviewcourse/adminviewcourse.component';
import { AdmineditcourseComponent } from './components/admineditcourse/admineditcourse.component';
import { AdminviewappliedcourseapplicationComponent } from './components/adminviewappliedcourseapplication/adminviewappliedcourseapplication.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewcourseComponent } from './components/userviewcourse/userviewcourse.component';
import { UseraddcourseapplicationComponent } from './components/useraddcourseapplication/useraddcourseapplication.component';
import { UserviewappliedcourseapplicationComponent } from './components/userviewappliedcourseapplication/userviewappliedcourseapplication.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';

const routes: Routes = [
  { path: 'app-home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  
 
  // Admin routes with AuthGuard
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    children: [
      { path: 'add-course', component: AdminaddcourseComponent },
      { path: 'add-courses/:courseId', component: AdminviewappliedcourseapplicationComponent },  
      { path: 'admineditcourse/:courseId', component: AdmineditcourseComponent },
      { path: 'edit-courses/:courseId', component: AdmineditcourseComponent },
      { path: 'view-applied-courses', component: AdminviewappliedcourseapplicationComponent },
      { path: 'view-courses', component: AdminviewcourseComponent },
      { path: 'view-feedback', component: AdminviewfeedbackComponent },
      { path: 'app-home', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: '**', component: ErrorComponent, pathMatch: "full" }
    ]
  },
 
  // User routes with AuthGuard 
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
    children: [
      { path: 'view-courses', component: UserviewcourseComponent },
      { path: 'add-courses', component: UseraddcourseapplicationComponent }, 
      { path: 'add-courses/:courseId', component: UseraddcourseapplicationComponent },    
      { path: 'my-applied-courses', component: UserviewappliedcourseapplicationComponent },
      { path: 'view-feedback', component: UserviewfeedbackComponent },
      { path: 'add-feedback', component: UseraddfeedbackComponent },
      { path: 'add-feedback/:feedbackId', component: UseraddfeedbackComponent },
      { path: 'app-home', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: '**', component: ErrorComponent, pathMatch: "full" }
    ]
  },

  // User routes with AuthGuard 
  {
    path: 'superAdmin',
    canActivate: [AuthGuard],
    data: { roles: ['superAdmin'] },
    children: [
      { path: 'super-admin', component: SuperAdminComponent }
    ]
  },
 
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent, pathMatch: "full" }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

