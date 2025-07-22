import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
 
  feedback: Feedback = {
    UserId: 1,
    FeedbackText: '',
    Date: new Date()
  }
    showPopup: boolean = false;
    
   
    constructor(
      private feedbackservice: FeedbackService,
      private authService: AuthService,
      private router: Router
    ) {}
   
    ngOnInit(): void {
      const currentUser = this.authService.currentUserValue;
    console.log("current user is:")
    console.log(currentUser);
    if (currentUser) {
      this.feedback.UserId = currentUser.UserId;
        }
    }
   
    onSubmit(feedbackForm: any): void {
      if (!this.feedback.FeedbackText) {
        feedbackForm.form.markAllAsTouched(); 
        return;
      }
      this.feedbackservice.sendFeedback(this.feedback).subscribe(
        (response) => {
          console.log('Feedback Submitted Successfully', response);
          Swal.fire({
            title: 'Success!',
            text: 'Successfully Added!',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            location.reload(); 
          });
        });
    }

   
    closePopup(): void {
      this.showPopup = false;
      this.router.navigate(['/view-feedback']); // Redirect to userviewfeedback component
    }
  }
