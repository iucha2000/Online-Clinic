import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../models/doctor';
import { Category } from '../../data/Category';
import { FileService } from '../../services/doctor/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Router } from '@angular/router';

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

  constructor(private fileService: FileService, private doctorService: DoctorService, private router: Router){}

  onSubmit(){
    if(this.registerDoctorForm.valid){
      this.user.firstName = this.registerDoctorForm.value.firstNameField ?? '';
      this.user.lastName = this.registerDoctorForm.value.lastNameField ?? '';
      this.user.personal_Id = this.registerDoctorForm.value.personalNumberField ?? '';
      this.user.email = this.registerDoctorForm.value.emailField ?? '';
      this.user.password = this.registerDoctorForm.value.passwordField ?? '';
      this.user.category = Category[this.registerDoctorForm.value.categoryField as keyof typeof Category];
      this.user.rating = Math.floor(Math.random() * 5) + 1;

      //TODO show alert if user already exists (has existing email or personal_Id)
      this.doctorService.addDoctor(this.user).subscribe({
        next: (doctorId) => {
          this.UploadImage(doctorId)
          this.UploadCv(doctorId)
          alert("რეგისტრაცია წარმატებით დასრულდა")
          this.router.navigate(['/profile'])
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 409){
            alert("მომხმარებლის მონაცემები უკვე არსებობს! გთხოვთ, სცადოთ თავიდან")
          }
          else{
            alert("დაფიქსირდა გაუთვალისწინებელი შეცდომა")
          }
        }
      })
    }
    else {
      if(this.registerDoctorForm.get("firstNameField")?.hasError('required')){
        alert("სახელის შევსება სავალდებულოა!")
      }
      else if(this.registerDoctorForm.get("lastNameField")?.hasError('required')){
        alert("გვარის შევსება სავალდებულოა!")
      }
      else if(this.registerDoctorForm.get("personalNumberField")?.invalid){
        alert("გთხოვთ, მიუთითოთ ვალიდური პირადი ნომერი")
      }
      else if(this.registerDoctorForm.get("emailField")?.invalid){
        alert("გთხოვთ, მიუთითოთ ვალიდური ელ-ფოსტა")
      }
      else if(this.registerDoctorForm.get("passwordField")?.invalid){
        alert("გთხოვთ, მიუთითოთ ვალიდური პაროლი, ის უნდა შეიცავდეს მინიმუმ: \nერთ დიდ ასოს \nერთ პატარა ასოს \nერთ ციფრს \nერთ სიმბოლოს")
      }
      else if(this.registerDoctorForm.get("categoryField")?.hasError('required')){
        alert("კატეგორიის შევსება სავალდებულოა!")
      }
      else if(this.registerDoctorForm.get("imageField")?.hasError('required')){
        alert("ფოტოსურათის ატვირთვა სავალდებულოა!")
      }
      else if(this.registerDoctorForm.get("cvField")?.hasError('required')){
        alert("CVის ატვირთვა სავალდებულოა!")
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
      error: (error: HttpErrorResponse) => {
        //TODO improve error handling UI
        alert("ფოტოსურათი ვერ აიტვირთა. გთხოვთ, სცადოთ თავიდან")
      }
    })
  }

  UploadCv(doctorId: number){
    this.fileService.uploadDoctorCv(doctorId, this.cvFile!).subscribe({
      error: (error: HttpErrorResponse) => {
        alert("CV ვერ აიტვირთა. გთხოვთ, სცადოთ თავიდან")
      }
    })
  }
}
