import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { SafeUrl } from '@angular/platform-browser';
import { DoctorService } from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-search-doctor-view',
  templateUrl: './search-doctor-view.component.html',
  styleUrl: './search-doctor-view.component.css'
})
export class SearchDoctorViewComponent {
  @Input() doctor: Doctor | null = null
  category: string | undefined
  rating: Array<number> | undefined
  imageUrl: SafeUrl | null = null;

  constructor(private doctorService: DoctorService){}

  ngOnInit(){
    this.category = this.doctorService.getDoctorCategory(this.doctor!)
    this.rating = this.doctorService.getDoctorRating(this.doctor!)
    this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
  }
}
