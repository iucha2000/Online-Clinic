import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { SafeUrl } from '@angular/platform-browser';
import { DoctorService } from '../../services/doctor/doctor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  imageUrl: SafeUrl | null = null;
  category: string | undefined
  rating: Array<number> | undefined

  constructor(private doctorService: DoctorService, private router: Router){}

  ngOnInit(){
    this.category = this.doctorService.getDoctorCategory(this.doctor!)
    this.rating = this.doctorService.getDoctorRating(this.doctor!)
    this.doctorService.getDoctorImage(this.doctor!).subscribe(safeUrl => this.imageUrl = safeUrl)
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
          alert("პირადი ნომერი წარმატებით შეიცვალა")
          this.TogglePersonalNumberChange()
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 409){
            alert("პირადი ნომერი უკვე არსებობს! გთხოვთ, სცადოთ თავიდან")
          }
          else{
            alert("გთხოვთ, შეიყვანოთ ვალიდური პირადი ნომერი")
          }
        }
      })
    }
    else if (fieldChange == this.emailChange){
      this.doctorService.updateDoctor(this.doctor!.id, { email: this.inputValue }).subscribe({
        next: () => {
          this.doctor!.email = this.inputValue
          alert("ელ-ფოსტა წარმატებით შეიცვალა")
          this.ToggleEmailChange()
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 409){
            alert("ელ-ფოსტა უკვე არსებობს! გთხოვთ, სცადოთ თავიდან")
          }
          else{
            alert("გთხოვთ, შეიყვანოთ ვალიდური ელ-ფოსტა")
          }
        }
      })      
    }
  }

  DeleteDoctor(){
    this.doctorService.deleteDoctor(this.doctor!.id).subscribe(() => this.router.navigate(['/category']))
  }
}
