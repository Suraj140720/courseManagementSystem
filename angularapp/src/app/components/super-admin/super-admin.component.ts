import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { SuperAdmin } from 'src/app/models/superAdmin';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import Swal from 'sweetalert2'; // Import SweetAlert2
 
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
 
  adminUsers: SuperAdmin[] = [];
 
  constructor(
    private superAdminService: SuperAdminService,
    private authService: AuthService // Inject AuthService
  ) { }
 
  ngOnInit(): void {
    this.getAdminUsers();
  }
 
  getAdminUsers(): void {
    this.superAdminService.getAdminUsers().subscribe(
      (data: SuperAdmin[]) => {
        this.adminUsers = data;
      },
      (error: any) => {
        console.error('Error fetching admin users', error);
      }
    );
  }
 
  updateStatus(admin: SuperAdmin, status: string): void {
    admin.Status = status;
    this.superAdminService.updateAdminStatus(admin.id, admin).subscribe(
      (response: any) => {
        console.log('Status updated successfully', response);
       
        // Check if the status is 'Approved' and call register method
        if (status === 'Approved') {
          Swal.fire('Admin Status Approved', 'The admin status has been updated to Approved', 'success');
          this.authService.register(admin).subscribe(
            (registerResponse: any) => {
              console.log('Admin registered successfully', registerResponse);
              // Delete admin from superAdmin table after successful registration
              this.superAdminService.deleteAdmin(admin.id).subscribe(
                (data) => {
                  console.log("Deleted: ", data);
                  this.getAdminUsers(); // Refresh the list after deletion
                },
                (deleteError: any) => {
                  console.error('Error deleting admin', deleteError);
                }
              );
            },
            (registerError: any) => {
              console.error('Error registering admin', registerError);
              Swal.fire({
                icon: 'error',
                title: 'Error registering admin',
                text: registerError.message,
              });
            }
          );
        } else {
          this.superAdminService.deleteAdmin(admin.id).subscribe(
            (data) => {
              console.log("Deleted: ", data);
              this.getAdminUsers(); // Refresh the list after deletion
              Swal.fire('Admin Status Rejected', 'The admin status has been updated to Rejected', 'info');
            },
            (deleteError: any) => {
              console.error('Error deleting admin', deleteError);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error updating status', error);
      }
    );
  }
}