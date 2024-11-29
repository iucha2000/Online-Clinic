import { Component, Input} from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor/doctor.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-category-doctor-view',
  templateUrl: './category-doctor-view.component.html',
  styleUrl: './category-doctor-view.component.css',
})
export class CategoryDoctorViewComponent {
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
