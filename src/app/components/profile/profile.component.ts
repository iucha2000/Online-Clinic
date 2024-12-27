import { Component } from '@angular/core';
import { TokenService } from '../../services/authentication/token.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { SafeUrl } from '@angular/platform-browser';
import { PatientService } from '../../services/patient/patient.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { UserRole } from '../../data/UserRole';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation/reservation.service';

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
  reservations: Reservation[] | null = null;

  constructor(private tokenService: TokenService, private patientService: PatientService, private doctorService: DoctorService, private reservationService: ReservationService){}

  ngOnInit(){
    this.userId = this.tokenService.getUserId()
    this.userRole = this.tokenService.getRole()

    if(this.userRole == UserRole.Patient){
      this.patientService.getPatientData(this.userId).subscribe(data => {
        this.patient = data
      })
      this.reservationService.getReservationsByPatient(this.userId).subscribe(data => {
        this.reservations = data
      })
    }
    else if(this.userRole == UserRole.Doctor){
      this.doctorService.getDoctorData(this.userId).subscribe(data => {
        this.doctor = data
        this.category = this.doctorService.getDoctorCategory(this.doctor!)
        this.rating = this.doctorService.getDoctorRating(this.doctor!)
        this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
      })
      this.reservationService.getReservationsByDoctor(this.userId).subscribe(data => {
        this.reservations = data
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
