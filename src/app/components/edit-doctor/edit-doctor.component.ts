import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { SafeUrl } from '@angular/platform-browser';
import { DoctorService } from '../../services/doctor/doctor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DisplayMessageService } from '../../services/display-message.service';
import { MessageConstants } from '../../data/MessageConstants';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation/reservation.service';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css'
})
export class EditDoctorComponent {

  @Input() doctor: Doctor | null = null;

  editModeActive = false
  changePasswordOpen = false
  personalNumberChange = false
  emailChange = false
  inputValue: string = ''

  reservations: Reservation[] | null = null;
  imageUrl: SafeUrl | null = null;
  category: string | undefined
  rating: Array<number> | undefined

  constructor(private doctorService: DoctorService, private reservationService: ReservationService, private router: Router, private displayMessage: DisplayMessageService){}

  ngOnInit(){
    this.category = this.doctorService.getDoctorCategory(this.doctor!)
    this.rating = this.doctorService.getDoctorRating(this.doctor!)
    this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
    this.reservationService.getReservationsByDoctor(this.doctor!.id).subscribe(data => this.reservations = data)
  }

  ToggleChangePassword(){
    this.changePasswordOpen = !this.changePasswordOpen
  }

  ToggleEditMode(){
    this.editModeActive = !this.editModeActive
  }

  TogglePersonalNumberChange(){
    this.inputValue = this.doctor!.personal_Id
    this.personalNumberChange = !this.personalNumberChange
  }

  ToggleEmailChange(){
    this.inputValue = this.doctor!.email
    this.emailChange = !this.emailChange
  }

  SubmitFieldChange(fieldChange: boolean){
    if(fieldChange == this.personalNumberChange){
      this.doctorService.updateDoctor(this.doctor!.id, { personal_Id: this.inputValue }).subscribe({
        next: () => {
          this.doctor!.personal_Id = this.inputValue
          this.displayMessage.showError(MessageConstants.CHANGE_PERSONALNUMBER_SUCCESS)
          this.TogglePersonalNumberChange()
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 409){
            this.displayMessage.showError(MessageConstants.PERSONALNUMBER_ALREADY_EXISTS)
          }
          else{
            this.displayMessage.showError(MessageConstants.VALID_PERSONALNUMBER_IS_REQUIRED)
          }
        }
      })
    }
    else if (fieldChange == this.emailChange){
      this.doctorService.updateDoctor(this.doctor!.id, { email: this.inputValue }).subscribe({
        next: () => {
          this.doctor!.email = this.inputValue
          this.displayMessage.showError(MessageConstants.CHANGE_EMAIL_SUCCESS)
          this.ToggleEmailChange()
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 409){
            this.displayMessage.showError(MessageConstants.EMAIL_ALREADY_EXISTS)
          }
          else{
            this.displayMessage.showError(MessageConstants.VALID_EMAIL_IS_REQUIRED)
          }
        }
      })      
    }
  }

  RegisterDoctor(){
    this.router.navigate(['/register-doctor'])
  }

  DeleteDoctor(){
    this.doctorService.deleteDoctor(this.doctor!.id).subscribe(() => this.router.navigate(['/category']))
  }
}
