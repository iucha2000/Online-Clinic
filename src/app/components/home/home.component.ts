import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Category } from '../../data/Category';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories: Category[] = Object.values(Category).filter(value => isNaN(Number(value))) as Category[];
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
  }

  ViewFullCategories(){
    if (this.categoryIsExpanded) {
      this.categoryContainer.nativeElement.scrollTop = 0;
    }
    this.categoryIsExpanded = !this.categoryIsExpanded;
    //TODO fix dynamic padding between count and name
  }

  ViewFullDoctors(){
    if (this.doctorsListIsExpanded) {
      this.doctotsContainer.nativeElement.scrollTop = 0;
    }
    this.doctorsListIsExpanded = !this.doctorsListIsExpanded;
  }
}
