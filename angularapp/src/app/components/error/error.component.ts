import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() errorMessage: string = 'Oops! Something went wrong';
  @Input() errorCode: string = '500';

  constructor(private router: Router) {}
  ngOnInit(): void {}
  goHome() {
    this.router.navigate(['/app-home']);
  }

  retry() {
    window.location.reload();
  }

}
