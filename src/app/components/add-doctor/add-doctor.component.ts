import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../models/doctor';
import { Category } from '../../data/Category';
import { FileService } from '../../services/doctor/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Router } from '@angular/router';
import { DisplayMessageService } from '../../services/display-message.service';
import { MessageConstants } from '../../data/MessageConstants';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {

  showPassword = false
  imageFile: File | null = null;
  cvFile: File | null = null;

  doctorCategories = Object.values(Category).filter(value => typeof value === 'string');
  user: Doctor = {id: 0, firstName: '', lastName: '', personal_Id: '', email: '', password: '', role: 2, category: 0, rating: 0, isPinned: false}

  registerDoctorForm = new FormGroup({
    firstNameField: new FormControl('', Validators.required),
    lastNameField: new FormControl('', Validators.required),
    personalNumberField: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
    emailField: new FormControl('', [Validators.required, Validators.email]),
    passwordField: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|:";\'<>,.?/`~ -]).*$')]),
    categoryField: new FormControl('', Validators.required),
    imageField: new FormControl('', Validators.required),
    cvField: new FormControl('', Validators.required),
  })

  constructor(private fileService: FileService, private doctorService: DoctorService, private router: Router, private displayMessage: DisplayMessageService){}

  onSubmit(){
    if(this.registerDoctorForm.valid){
      this.user.firstName = this.registerDoctorForm.value.firstNameField ?? '';
      this.user.lastName = this.registerDoctorForm.value.lastNameField ?? '';
      this.user.personal_Id = this.registerDoctorForm.value.personalNumberField ?? '';
      this.user.email = this.registerDoctorForm.value.emailField ?? '';
      this.user.password = this.registerDoctorForm.value.passwordField ?? '';
      this.user.category = Category[this.registerDoctorForm.value.categoryField as keyof typeof Category];
      this.user.rating = Math.floor(Math.random() * 5) + 1;

      this.doctorService.addDoctor(this.user).subscribe({
        next: (doctorId) => {
          this.UploadImage(doctorId)
          this.UploadCv(doctorId)
          this.displayMessage.showError(MessageConstants.REGISTRATION_SUCCESS)
          this.router.navigate(['/profile', doctorId])
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 409){
            this.displayMessage.showError(MessageConstants.USER_ALREADY_EXISTS)
          }
          else{
            this.displayMessage.showError(MessageConstants.UNEXPECTED_ERROR)
          }
        }
      })
    }
    else {
      if(this.registerDoctorForm.get("firstNameField")?.hasError('required')){
        this.displayMessage.showError(MessageConstants.FIRSTNAME_IS_REQUIRED)
      }
      else if(this.registerDoctorForm.get("lastNameField")?.hasError('required')){
        this.displayMessage.showError(MessageConstants.LASTNAME_IS_REQUIRED)
      }
      else if(this.registerDoctorForm.get("personalNumberField")?.invalid){
        this.displayMessage.showError(MessageConstants.VALID_PERSONALNUMBER_IS_REQUIRED)
      }
      else if(this.registerDoctorForm.get("emailField")?.invalid){
        this.displayMessage.showError(MessageConstants.VALID_EMAIL_IS_REQUIRED)
      }
      else if(this.registerDoctorForm.get("passwordField")?.invalid){
        this.displayMessage.showError(MessageConstants.VALID_PASSWORD_IS_REQUIRED)
      }
      else if(this.registerDoctorForm.get("categoryField")?.hasError('required')){
        this.displayMessage.showError(MessageConstants.CATEGORY_IS_REQUIRED)
      }
      else if(this.registerDoctorForm.get("imageField")?.hasError('required')){
        this.displayMessage.showError(MessageConstants.IMAGE_IS_REQUIRED)
      }
      else if(this.registerDoctorForm.get("cvField")?.hasError('required')){
        this.displayMessage.showError(MessageConstants.CV_IS_REQUIRED)
      }
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file
    }
  }

  onCvSelected(event: any): void{
    const file = event.target.files[0];
    if (file) {
      this.cvFile = file
    }
  }

  UploadImage(doctorId: number){
    this.fileService.uploadDoctorImage(doctorId, this.imageFile!).subscribe({
      error: () => this.displayMessage.showError(MessageConstants.IMAGE_NOT_UPLOADED)
    })
  }

  UploadCv(doctorId: number){
    this.fileService.uploadDoctorCv(doctorId, this.cvFile!).subscribe({
      error: () => this.displayMessage.showError(MessageConstants.CV_NOT_UPLOADED)
    })
  }
}
