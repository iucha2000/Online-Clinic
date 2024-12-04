import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor/doctor.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {

  changePasswordOpen = false
  doctorSelected = false;
  doctorId: string | null = null;
  doctor: Doctor | null = null;
  imageUrl: SafeUrl | null = null;
  category: string | undefined
  rating: Array<number> | undefined

  constructor(private route: ActivatedRoute, private doctorService: DoctorService){}

  ngOnInit(){
    this.doctorId = this.route.snapshot.paramMap.get('id')

    if(this.doctorId != null){
      this.doctorSelected = true
      this.doctorService.getDoctorData(parseInt(this.doctorId, 10)).subscribe(data => {
        this.doctor = data
        this.category = this.doctorService.getDoctorCategory(this.doctor!)
        this.rating = this.doctorService.getDoctorRating(this.doctor!)
        this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
      })
    }
  }

  ToggleChangePassword(){
    this.changePasswordOpen = !this.changePasswordOpen
  }
}
