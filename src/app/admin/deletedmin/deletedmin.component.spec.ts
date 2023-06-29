import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedminComponent } from './deletedmin.component';

describe('DeletedminComponent', () => {
  let component: DeletedminComponent;
  let fixture: ComponentFixture<DeletedminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
