import { Component } from '@angular/core';
import { TokenService } from '../../services/authentication/token.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { SafeUrl } from '@angular/platform-browser';
import { PatientService } from '../../services/patient/patient.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { UserRole } from '../../data/UserRole';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
  changePasswordOpen = false
  adminLogin = false

  userId: number = 0
  userRole: string = ''
  doctor: Doctor | null = null
  patient: Patient | null = null
  imageUrl: SafeUrl | null = null;
  category: string | undefined
  rating: Array<number> | undefined

  constructor(private tokenService: TokenService, private patientService: PatientService, private doctorService: DoctorService){}

  ngOnInit(){
    this.userId = this.tokenService.getUserId()
    this.userRole = this.tokenService.getRole()

    if(this.userRole == UserRole.Patient){
      this.patientService.getPatientData(this.userId).subscribe(data => {
        this.patient = data
      })
    }
    else if(this.userRole == UserRole.Doctor){
      this.doctorService.getDoctorData(this.userId).subscribe(data => {
        this.doctor = data
        this.category = this.doctorService.getDoctorCategory(this.doctor!)
        this.rating = this.doctorService.getDoctorRating(this.doctor!)
        this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
      })
    }
    else{
      this.adminLogin = true
    }
  }

  ToggleChangePassword(){
    this.changePasswordOpen = !this.changePasswordOpen
  }
}
