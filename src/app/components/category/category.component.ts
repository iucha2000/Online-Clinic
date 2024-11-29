import { Component } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  //TODO fix header authorize/register/username spacing
  //TODO implement delete doctor functionality

  doctors: Doctor[] | null = null;

  constructor(private doctorService: DoctorService){}

  ngOnInit(){
    this.doctorService.getAllDoctorsData().subscribe(data => {
      this.doctors = data
    })
  }
}
