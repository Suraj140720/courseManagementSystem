import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  currentUrl: string;
username: string;
  role: string;
  constructor(public auth: AuthService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current user:', user);
this.loadUserDetails();
  }
loadUserDetails(): void {
    const currentUser = this.auth.currentUserValue;
    console.log('Current User:', currentUser);
    this.username = currentUser.Username || 'Unknown';
    this.role = currentUser.UserRole || 'Unknown';
    console.log('Username:', this.username);
    console.log('Role:', this.role);
  }

  isFeedbackActive(): boolean {
    return this.currentUrl.includes('user/add-feedback') || this.currentUrl.includes('user/view-feedback');
    
  }

  logout() {
    Swal.fire({
      title: 'Ready to Leave?',
      text: 'You will be logged out of your account',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0056D2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Stay logged in'
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
