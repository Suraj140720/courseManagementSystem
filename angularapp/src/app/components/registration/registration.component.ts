import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { SuperAdmin } from 'src/app/models/superAdmin';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();
  confirmPassword: string = ''; // Separate field for confirm password
  passwordsMatch: boolean = true;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;


  constructor(private service: AuthService, private superAdminService: SuperAdminService, private router: Router) {}
  


  ngOnInit() {}
  checkPasswordsMatch(): void {
    // Compare Password and Confirm Password
    this.passwordsMatch = this.user.Password === this.confirmPassword;
  }
 
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
 
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(form: NgForm): void {
    this.checkPasswordsMatch();
    if (!this.passwordsMatch) {
      return;
    }
    if (form.valid) {
      const payload: User = {
        Email: form.value.email,
        Password: form.value.password,
        Username: form.value.username,
        MobileNumber: form.value.mobileNumber,
        UserRole: form.value.role
      };
     
      if (payload.UserRole === 'admin') {
 
        // Check if email exists in the Super Admin table
        this.superAdminService.GetAdminReqByEmail(payload.Email).subscribe(
          (admin) => {
            if (admin) {
              Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: 'User with this email already has a pending request.',
              });
            } else {
              const newAdmin: SuperAdmin = {
                Email: payload.Email,
                Password: payload.Password,
                Username: payload.Username,
                MobileNumber: payload.MobileNumber,
                UserRole: payload.UserRole,
                Status: null
              };
             
              this.superAdminService.addAdmin(newAdmin).subscribe(
                (response) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Request Sent for Approval',
                    text: 'Request Sent for Approval',
                  });
                },
                (error) => {
                  console.error('Error:', error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Some Error occurred',
                    text: error.message,
                  });
                }
              );
            }
 
          },
          (error) => {
            if (error.status === 404) {
              const newAdmin: SuperAdmin = {
                Email: payload.Email,
                Password: payload.Password,
                Username: payload.Username,
                MobileNumber: payload.MobileNumber,
                UserRole: payload.UserRole,
                Status: null
              };
             
              this.superAdminService.addAdmin(newAdmin).subscribe(
                (response) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Request Sent for Approval',
                    text: 'Request Sent for Approval',
                  });
                },
                (addError) => {
                  console.error('Error:', addError);
                  Swal.fire({
                    icon: 'error',
                    title: 'Some Error occurred',
                    text: addError.message,
                  });
                }
              );
            } else {
              console.error('Error:', error);
              Swal.fire({
                icon: 'error',
                title: 'Some Error occurred',
                text: error.message,
              });
            }
          }
        );
      } else {
        // Check if email exists in the Super Admin table
        this.superAdminService.GetAdminReqByEmail(payload.Email).subscribe(
          (admin) => {
            if (admin) {
              Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: 'User with this email already has a pending request.',
              });
            } else {
              // Proceed with user registration
              this.service.register(payload).subscribe(
                (response) => {
                  console.log("Message:", response);
                  if (response.success) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Registration successful!',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.router.navigate(['/login']);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Registration failed',
                      text: response.message,
                    });
                  }
                },
                (error) => {
                  console.error('Error:', error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Some Error occurred',
                    text: error.message,
                  });
                }
              );
            }
          },
          (error) => {
            if (error.status === 404) {
              // Proceed with user registration
              this.service.register(payload).subscribe(
                (response) => {
                  console.log("Message:", response);
                  if (response.success) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Registration successful!',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.router.navigate(['/login']);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Registration failed',
                      text: response.message,
                    });
                  }
                },
                (registerError) => {
                  console.error('Error:', registerError);
                  Swal.fire({
                    icon: 'error',
                    title: 'Some Error occurred',
                    text: registerError.message,
                  });
                }
              );
            } else {
              console.error('Error:', error);
              Swal.fire({
                icon: 'error',
                title: 'Some Error occurred',
                text: error.message,
              });
            }
          }
        );
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Form is invalid!',
        text: 'Please fill out all required fields correctly.',
      });
    }      
  }
}
 