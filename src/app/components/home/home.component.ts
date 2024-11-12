import { Component, ElementRef,ViewChild } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor';
import { CategoryInfo } from '../../models/categoryInfo';
import { Subscription } from 'rxjs';


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

  constructor(private doctorService: DoctorService){}

  ngOnInit(){
    this.doctorService.getAllDoctorsData().subscribe(data => {
      this.doctors = data
      this.filteredDoctors = this.doctors
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
      return this.doctors!.indexOf(a) - this.doctors!.indexOf(b);
    });
    this.filteredDoctors = [...pinnedDoctors, ...unpinnedDoctorsInOriginalOrder];
  }
}
