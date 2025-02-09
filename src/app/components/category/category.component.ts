import { Component } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  doctors: Doctor[] | null = null;

  constructor(private doctorService: DoctorService){}

  ngOnInit(){
    this.InitializeComponent()
  }

  InitializeComponent(){
    this.doctorService.getAllDoctorsData().subscribe(data => {
      this.doctors = data
    })
  }

  DeleteDoctor(id: number){
    this.doctorService.deleteDoctor(id).subscribe(() => this.InitializeComponent())
  }
}
