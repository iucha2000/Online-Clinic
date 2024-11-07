import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { Category } from '../../data/Category';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent {

  @Input() doctor: Doctor | null= null;

  getDoctorCategory(category: number | undefined){
    return this.doctor?.category ? Category[this.doctor.category] : '';
  }

  getDoctorRatingArray(rating: number | undefined){
    return new Array(rating);
  }

}
