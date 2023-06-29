import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindescriptionComponent } from './admindescription.component';

describe('AdmindescriptionComponent', () => {
  let component: AdmindescriptionComponent;
  let fixture: ComponentFixture<AdmindescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
