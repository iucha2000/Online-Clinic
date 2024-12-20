import { Component, ElementRef,OnDestroy,OnInit,ViewChild } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor';
import { CategoryInfo } from '../../models/categoryInfo';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { ComponentCommunicatorService } from '../../services/component-communicator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{

  private loginSubscription!: Subscription;
  
  categoryInfos: CategoryInfo[] | null = null;
  currentCategory: CategoryInfo | null = null;
  doctors: Doctor[] | null = null;
  userPreferences: Doctor[] | null = null;
  filteredDoctors: Doctor[] | null = null;

  @ViewChild('categoryContainer') categoryContainer!: ElementRef;
  @ViewChild('doctorsContainer') doctotsContainer!: ElementRef;
  categoryIsExpanded = false;
  doctorsListIsExpanded = false;
  filterActive = false;

  constructor(private doctorService: DoctorService, private authService: AuthenticationService, private componentCommunicator: ComponentCommunicatorService){}

  ngOnInit(){
    this.InitializeComponent();

    this.loginSubscription = this.componentCommunicator.userLoggedIn$.subscribe(() => {
      this.InitializeComponent();

      this.categoryContainer.nativeElement.scrollTop = 0;
      this.categoryIsExpanded = false;

      this.doctotsContainer.nativeElement.scrollTop = 0;
      this.doctorsListIsExpanded = false;
    });
  }

  ngOnDestroy(){
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  InitializeComponent(){
    this.doctorService.getAllDoctorsData().subscribe(data => {
      this.doctors = data

      this.userPreferences = this.authService.loadUserPreferences(this.doctors);
      this.filteredDoctors = [...this.userPreferences!];

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
      this.filteredDoctors = [...this.userPreferences!];
    }
    else{
      this.currentCategory = category;
      this.filterActive = true;
      this.filteredDoctors = this.userPreferences!.filter(doctor => doctor.category === category.id);
    }
  }

  SortByPinned() {
    const pinnedDoctors = this.userPreferences!.filter(doctor => doctor.isPinned);
    const unpinnedDoctors = this.userPreferences!.filter(doctor => !doctor.isPinned);

    const unpinnedDoctorsInOriginalOrder = unpinnedDoctors.sort((a, b) => {
      return this.doctors!.findIndex(doctor => doctor.id === a.id) - this.doctors!.findIndex(doctor => doctor.id === b.id);
    });

    this.userPreferences = [...pinnedDoctors, ...unpinnedDoctorsInOriginalOrder];

    if (this.filterActive && this.currentCategory) {
      this.filteredDoctors = this.userPreferences.filter(doctor => doctor.category === this.currentCategory!.id);
    } else {
      this.filteredDoctors = [...this.userPreferences];
    }

    this.authService.saveUserPreferences(this.userPreferences);
  }
}
