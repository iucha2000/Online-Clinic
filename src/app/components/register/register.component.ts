import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../models/patient';
import { EmailService } from '../../services/email/email.service';
import { PatientService } from '../../services/patient/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  showPassword = false
  user: Patient = {firstName: '', lastName: '', personal_Id: '', email: '', password: '', role: 1}

  registerForm = new FormGroup({
    firstNameField: new FormControl('', Validators.required),
    lastNameField: new FormControl('', Validators.required),
    personalNumberField: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
    emailField: new FormControl('', [Validators.required, Validators.email]),
    activationCodeField: new FormControl('', Validators.required),
    passwordField: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|:";\'<>,.?/`~ -]).*$')])
  })

  constructor(private emailService: EmailService, private patientService: PatientService, private router: Router){}

  sendEmail(){
    //TODO think of a possible validation if email is real or not (or if its null)
    this.emailService.sendCodeByEmail(this.registerForm.value.emailField ?? '').subscribe(() => alert(`Email with confirmation code sent to ${this.registerForm.value.emailField}`))
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
      .subscribe(data => {
        if(data == true){
          //TODO show alert if user already exists (has existing email or personal_Id)
          this.patientService.addPatient(this.user).subscribe(() => alert("Registration successful"))
          this.router.navigate(['/home']);
        }
        else{
          alert("აქტივაციის კოდი არასწორია, ან ვადაგასულია")
        }
      })
    }
    else {
      if(this.registerForm.get("firstNameField")?.hasError('required')){
        alert("სახელის შევსება სავალდებულოა!")
      }
      else if(this.registerForm.get("lastNameField")?.hasError('required')){
        alert("გვარის შევსება სავალდებულოა!")
      }
      else if(this.registerForm.get("personalNumberField")?.invalid){
        alert("გთხოვთ, მიუთითოთ ვალიდური პირადი ნომერი")
      }
      else if(this.registerForm.get("emailField")?.invalid){
        alert("გთხოვთ, მიუთითოთ ვალიდური ელ-ფოსტა")
      }
      else if(this.registerForm.get("activationCodeField")?.invalid){
        alert("აქტივაციის კოდის შევსება სავალდებულოა!")
      }
      else if(this.registerForm.get("passwordField")?.invalid){
        alert("გთხოვთ, მიუთითოთ ვალიდური პაროლი, ის უნდა შეიცავდეს მინიმუმ: \nერთ დიდ ასოს \nერთ პატარა ასოს \nერთ ციფრს \nერთ სიმბოლოს")
      }
    }
  }
}
