import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditcourseComponent } from './admineditcourse.component';

describe('AdmineditcourseComponent', () => {
  let component: AdmineditcourseComponent;
  let fixture: ComponentFixture<AdmineditcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditcourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
