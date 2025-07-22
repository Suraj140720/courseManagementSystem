import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminviewappliedcourseapplicationComponent } from './adminviewappliedcourseapplication.component';

describe('AdminviewappliedcourseapplicationComponent', () => {
  let component: AdminviewappliedcourseapplicationComponent;
  let fixture: ComponentFixture<AdminviewappliedcourseapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewappliedcourseapplicationComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewappliedcourseapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('Frontend_should_create_adminviewappliedcourseapplication_component', () => {
    expect(component).toBeTruthy();
  });
});
