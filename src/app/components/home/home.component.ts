import { Component, ElementRef,ViewChild } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor';
import { CategoryInfo } from '../../models/categoryInfo';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categoryInfos: CategoryInfo[] | null = null;
  currentCategory: CategoryInfo | null = null;
  doctors: Doctor[] | null = null;
  filteredDoctors: Doctor[] | null = null;

  @ViewChild('categoryContainer') categoryContainer!: ElementRef;
  @ViewChild('doctorsContainer') doctotsContainer!: ElementRef;
  categoryIsExpanded = false;
  doctorsListIsExpanded = false;
  filterActive = false;

  constructor(private doctorService: DoctorService, private authService: AuthenticationService){}

  ngOnInit(){
    this.doctorService.getAllDoctorsData().subscribe(data => {
      this.doctors = data

      const userPreferences = this.authService.loadUserPreferences();
      this.filteredDoctors = userPreferences ? [...userPreferences] : [...this.doctors];

      this.SortByPinned();
    })

    this.doctorService.getDoctorCategoryCount().subscribe(data => {
      this.categoryInfos = data
    })
  }

  ViewFullCategories(){
    if (this.categoryIsExpanded) {
      this.categoryContainer.nativeElement.scrollTop = 0;
    }
    this.categoryIsExpanded = !this.categoryIsExpanded;
  }

  ViewFullDoctors(){
    if (this.doctorsListIsExpanded) {
      this.doctotsContainer.nativeElement.scrollTop = 0;
    }
    this.doctorsListIsExpanded = !this.doctorsListIsExpanded;
  }

  FilterByCategory(category: CategoryInfo){
    if(this.currentCategory == category){
      this.currentCategory = null;
      this.filterActive = false;
      this.filteredDoctors = this.doctors;
    }
    else{
      this.currentCategory = category;
      this.filterActive = true;
      this.filteredDoctors = this.doctors?.filter(doctor => doctor.category == category.id) ?? this.doctors;
    }
    this.SortByPinned()
  }

  SortByPinned() {
    const pinnedDoctors = this.filteredDoctors!.filter(doctor => doctor.isPinned);
    const unpinnedDoctors = this.filteredDoctors!.filter(doctor => !doctor.isPinned);

    const unpinnedDoctorsInOriginalOrder = unpinnedDoctors.sort((a, b) => {
      return this.doctors!.findIndex(doctor => doctor.id === a.id) - this.doctors!.findIndex(doctor => doctor.id === b.id);
    });
    
    this.filteredDoctors = [...pinnedDoctors, ...unpinnedDoctorsInOriginalOrder];
    this.authService.saveUserPreferences(this.filteredDoctors);
  }
}
