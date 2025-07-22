import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupernavComponent } from './supernav.component';

describe('SupernavComponent', () => {
  let component: SupernavComponent;
  let fixture: ComponentFixture<SupernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
