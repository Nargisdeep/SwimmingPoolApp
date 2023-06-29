import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimecompletedComponent } from './timecompleted.component';

describe('TimecompletedComponent', () => {
  let component: TimecompletedComponent;
  let fixture: ComponentFixture<TimecompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimecompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimecompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
