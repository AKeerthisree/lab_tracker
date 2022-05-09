import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSamplesComponent } from './admin-samples.component';

describe('AdminSamplesComponent', () => {
  let component: AdminSamplesComponent;
  let fixture: ComponentFixture<AdminSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
