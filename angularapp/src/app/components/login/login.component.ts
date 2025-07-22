import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: Login = {
    Email: '',
    Password: ''
  };
  formSubmitted: boolean = false;
  validEmailorPassword:boolean=true;
  showPassword: boolean = false;
  constructor(private service: AuthService, private router : Router) {}
 
  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
 
  login(form: NgForm): void {
    this.formSubmitted = true;
    if (form.valid) {
      this.service.login(this.loginData).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.validEmailorPassword=true;
            if(response.token=="Invalid password" || response.token=="Invalid email")
            {
              this.validEmailorPassword=false;
            }
            else{
          const user = JSON.parse(localStorage.getItem('currentUser'));
          console.log('currentUser:', user); // Log the user object

          console.log('isSuperAdmin', this.service.isSuperAdmin());
          console.log('isAdmin:', this.service.isAdmin());
          console.log('isUser:', this.service.isUser());
          console.log('isLoggedIn:', this.service.isLoggedIn());
          // Using AuthService methods for role checking
          if (this.service.isAdmin()) {
            this.router.navigate(['admin/app-home']);
          } else if (this.service.isUser()) {
            this.router.navigate(['user/app-home']);
          }else if(this.service.isSuperAdmin()){
            this.router.navigate(['superAdmin/super-admin']);
          }}
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          console.log('Login error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Invalid email or password',
          });
        
      });
      
      
    }
  }
}