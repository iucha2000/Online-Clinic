import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDoctorViewComponent } from './search-doctor-view.component';

describe('SearchDoctorViewComponent', () => {
  let component: SearchDoctorViewComponent;
  let fixture: ComponentFixture<SearchDoctorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchDoctorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDoctorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
