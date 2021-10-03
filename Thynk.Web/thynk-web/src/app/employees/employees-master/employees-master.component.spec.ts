import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesMasterComponent } from './employees-master.component';

describe('EmployeesMasterComponent', () => {
  let component: EmployeesMasterComponent;
  let fixture: ComponentFixture<EmployeesMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
