import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private feedbackService: FeedbackService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllFeedbacks();
    this.getAllUsers();
  }

  getAllFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  openModal(userId: number) {
    this.selectedUser = this.users.find(user => user.UserId === userId) || null;
    if (this.selectedUser) {
      Swal.fire({
        title: 'User Details',
        html: `
          <p><strong>Email:</strong> ${this.selectedUser.Email}</p>
          <p><strong>Username:</strong> ${this.selectedUser.Username}</p>
          <p><strong>Mobile Number:</strong> ${this.selectedUser.MobileNumber}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Close'
      });
    }
  }

  getUsername(userId: number): string {
    const user = this.users.find(u => u.UserId === userId);
    return user ? user.Username : 'Unknown';
  }

}
