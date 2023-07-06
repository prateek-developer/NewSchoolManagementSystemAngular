import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTeachersComponent } from './view-all-teachers.component';

describe('ViewAllTeachersComponent', () => {
  let component: ViewAllTeachersComponent;
  let fixture: ComponentFixture<ViewAllTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
