import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindialogComponent } from './admindialog.component';

describe('AdmindialogComponent', () => {
  let component: AdmindialogComponent;
  let fixture: ComponentFixture<AdmindialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
