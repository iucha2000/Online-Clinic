import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Category } from '../../data/Category';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor';
import { CategoryInfo } from '../../models/categoryInfo';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categoryInfos: CategoryInfo[] | null = null;
  doctors: Doctor[] | null = null;

  @ViewChild('categoryContainer') categoryContainer!: ElementRef;
  @ViewChild('doctorsContainer') doctotsContainer!: ElementRef;
  categoryIsExpanded = false;
  doctorsListIsExpanded = false;

  constructor(private doctorService: DoctorService){}

  ngOnInit(){
    //TODO add filtering based on categories/search box
    this.doctorService.getAllDoctorsData().subscribe(data => {
      this.doctors = data
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
}
