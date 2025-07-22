import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminaddcourseComponent } from './components/adminaddcourse/adminaddcourse.component';
import { AdmineditcourseComponent } from './components/admineditcourse/admineditcourse.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewappliedcourseapplicationComponent } from './components/adminviewappliedcourseapplication/adminviewappliedcourseapplication.component';
import { AdminviewcourseComponent } from './components/adminviewcourse/adminviewcourse.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddcourseapplicationComponent } from './components/useraddcourseapplication/useraddcourseapplication.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserviewcourseComponent } from './components/userviewcourse/userviewcourse.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewappliedcourseapplicationComponent } from './components/userviewappliedcourseapplication/userviewappliedcourseapplication.component';
// import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { SupernavComponent } from './components/supernav/supernav.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
 
 
@NgModule({
  declarations: [
    AppComponent,
    AdminaddcourseComponent,
    AdmineditcourseComponent,
    AdminnavComponent,
    AdminviewappliedcourseapplicationComponent,
    AdminviewcourseComponent,
    AdminviewfeedbackComponent,
    UseraddcourseapplicationComponent,
    UserviewappliedcourseapplicationComponent,
    UseraddfeedbackComponent,
    UsernavComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    UserviewcourseComponent,
    UserviewfeedbackComponent,
    SuperAdminComponent,
    SupernavComponent,
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 
 