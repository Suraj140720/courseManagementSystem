import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
 
  currentUrl: string;
  username: string;
  role: string;
  constructor(public auth: AuthService, private router: Router) {

    if (this.auth.currentUserValue) {
      this.username = this.auth.currentUserValue.Username;
    }
    
    // Subscribe to router events
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // Refresh user details on navigation

      }
    });

    // Set up an auth state subscription
    this.auth.currentUser.subscribe(user => {
      if (user) {
        this.username = user.Username;
        this.role = user.UserRole;
      }
    });
  }
  ngOnInit(): void {

    const currentUser = this.auth.currentUserValue;
    this.username = currentUser.Username || 'Unknown';
    this.role = currentUser.UserRole || 'Unknown';
    throw new Error('Method not implemented.');
  }

  isCourseActive(): boolean {
    return this.currentUrl.includes('admin/add-course') || this.currentUrl.includes('admin/view-courses');
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of the application',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0056D2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout();
        this.router.navigate(['../app-home']);
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
 
}
 


