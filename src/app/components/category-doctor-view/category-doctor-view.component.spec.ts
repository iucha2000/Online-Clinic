import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDoctorViewComponent } from './category-doctor-view.component';

describe('CategoryDoctorViewComponent', () => {
  let component: CategoryDoctorViewComponent;
  let fixture: ComponentFixture<CategoryDoctorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryDoctorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDoctorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
