import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})

export class UserviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  errorMessage: string = '';

  constructor(private feedbackService: FeedbackService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadFeedbacks();
    console.log("method is called");
  }

  loadFeedbacks(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.feedbackService.getAllFeedbacksByUserId(currentUser.UserId).subscribe(
        (data) => {
          this.feedbacks = data;
          console.log("yash", this.feedbacks);
          if (this.feedbacks.length === 0) {
            this.errorMessage = 'No data found';
          }
        },
        (error) => {
          console.error('Error fetching feedbacks:', error);
          this.errorMessage = '';
        }
      );
    }
  }

  confirmDelete(feedback: Feedback): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this feedback?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFeedback(feedback);
      }
    });
  }

  deleteFeedback(feedback: Feedback): void {
    this.feedbackService.deleteFeedback(feedback.FeedbackId).subscribe(
      () => {
        this.feedbacks = this.feedbacks.filter(f => f.FeedbackId !== feedback.FeedbackId);
        Swal.fire('Deleted!', 'Your feedback has been deleted.', 'success');
      },
      (error) => {
        console.error('Error deleting feedback:', error);
        Swal.fire('Error!', 'There was an error deleting your feedback.', 'error');
      }
    );
  }
}
