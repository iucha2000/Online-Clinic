import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { Category } from '../../data/Category';
import { FileService } from '../../services/doctor/file.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent {

  @Input() doctor: Doctor | null = null;
  imageUrl: SafeUrl | null = null;

  constructor(private fileService: FileService, private sanitizer: DomSanitizer){}

  ngOnInit(){
    this.getDoctorImage(this.doctor?.id);
  }

  getDoctorCategory(category: number | undefined){
    return this.doctor?.category ? Category[this.doctor.category] : '';
  }

  getDoctorRatingArray(rating: number | undefined){
    return new Array(rating);
  }

  getDoctorImage(doctorId: number | undefined){
    this.fileService.getDoctorImage(doctorId).subscribe(
      (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      }
    );
  }
}
