import { Component } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  doctor: Doctor | null = null
  imageUrl: SafeUrl | null = null;
  category: string | undefined
  rating: Array<number> | undefined
  experienceData: { [key: string]: string } = {};
  entries: { key: string, value: string }[] = [];

  constructor(private route: ActivatedRoute, private doctorService: DoctorService){}

  ngOnInit(){
    const doctorId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10)
    this.doctorService.getDoctorData(doctorId).subscribe(data => {
      this.doctor = data
      this.category = this.doctorService.getDoctorCategory(this.doctor!)
      this.rating = this.doctorService.getDoctorRating(this.doctor!)
      this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
      this.doctorService.getDoctorExperience(this.doctor!).subscribe(data => {
        this.experienceData = data
        this.entries = Object.entries(this.experienceData).map(([key, value]) => ({ key, value }))
      })
    }) 
  }
}
