import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../models/patient';
import { EmailService } from '../../services/email/email.service';
import { PatientService } from '../../services/patient/patient.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DisplayMessageService } from '../../services/display-message.service';
import { MessageConstants } from '../../data/MessageConstants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  showPassword = false
  user: Patient = {id: 0, firstName: '', lastName: '', personal_Id: '', email: '', password: '', role: 1}

  registerForm = new FormGroup({
    firstNameField: new FormControl('', Validators.required),
    lastNameField: new FormControl('', Validators.required),
    personalNumberField: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
    emailField: new FormControl('', [Validators.required, Validators.email]),
    activationCodeField: new FormControl('', Validators.required),
    passwordField: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|:";\'<>,.?/`~ -]).*$')])
  })

  constructor(private emailService: EmailService, private patientService: PatientService, private router: Router, private displayMessage: DisplayMessageService){}

  sendEmail(){
    this.emailService.sendCodeByEmail(this.registerForm.value.emailField ?? '').subscribe({
      next: () => this.displayMessage.showError(MessageConstants.ACTIVATION_CODE_SENT),
      error: () => this.displayMessage.showError(MessageConstants.VALID_EMAIL_IS_REQUIRED)
    })
  }

  onSubmit(){
    if(this.registerForm.valid)
    {
      this.user.firstName = this.registerForm.value.firstNameField ?? '';
      this.user.lastName = this.registerForm.value.lastNameField ?? '';
      this.user.personal_Id = this.registerForm.value.personalNumberField ?? '';
      this.user.email = this.registerForm.value.emailField ?? '';
      this.user.password = this.registerForm.value.passwordField ?? '';

      this.emailService.verifyCode(this.registerForm.value.emailField ?? '', parseInt(this.registerForm.value.activationCodeField ?? '', 10))
      .subscribe({
        next: (data) => {
          if(data == true){
            this.patientService.addPatient(this.user).subscribe({
              next: () => {
                this.displayMessage.showError(MessageConstants.REGISTRATION_SUCCESS)
                this.router.navigate(['/home']);
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
          else{
            this.displayMessage.showError(MessageConstants.INVALID_ACTIVATION_CODE)
          }
        },
        error: () => this.displayMessage.showError(MessageConstants.INVALID_ACTIVATION_CODE)
      })
    }
    else {
      if(this.registerForm.get("firstNameField")?.hasError('required')){
        this.displayMessage.showError(MessageConstants.FIRSTNAME_IS_REQUIRED)
      }
      else if(this.registerForm.get("lastNameField")?.hasError('required')){
        this.displayMessage.showError(MessageConstants.LASTNAME_IS_REQUIRED)
      }
      else if(this.registerForm.get("personalNumberField")?.invalid){
        this.displayMessage.showError(MessageConstants.VALID_PERSONALNUMBER_IS_REQUIRED)
      }
      else if(this.registerForm.get("emailField")?.invalid){
        this.displayMessage.showError(MessageConstants.VALID_EMAIL_IS_REQUIRED)
      }
      else if(this.registerForm.get("activationCodeField")?.invalid){
        this.displayMessage.showError(MessageConstants.ACTIVATION_CODE_REQUIRED)
      }
      else if(this.registerForm.get("passwordField")?.invalid){
        this.displayMessage.showError(MessageConstants.VALID_PASSWORD_IS_REQUIRED)
      }
    }
  }
}
