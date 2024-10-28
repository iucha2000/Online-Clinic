import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  showPassword = false
  user: User = {firstName: '', lastName: '', personalNumber: '', email: '', password: '', role: 1}

  registerForm = new FormGroup({
    firstNameField: new FormControl('', Validators.required),
    lastNameField: new FormControl('', Validators.required),
    personalNumberField: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
    emailField: new FormControl('', [Validators.required, Validators.email]),
    activationCodeField: new FormControl('', Validators.required),
    passwordField: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|:";\'<>,.?/`~ -]).*$')])
  })

  onSubmit(){
    if(this.registerForm.valid)
    {
      this.user.firstName = this.registerForm.value.firstNameField ?? '';
      this.user.lastName = this.registerForm.value.lastNameField ?? '';
      this.user.personalNumber = this.registerForm.value.personalNumberField ?? '';
      this.user.email = this.registerForm.value.emailField ?? '';
      this.user.password = this.registerForm.value.passwordField ?? '';
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
        //TODO check if it is correct in database
        alert("აქტივაციის კოდი არასწორია, ან ვადაგასულია")
      }
      else if(this.registerForm.get("passwordField")?.invalid){
        alert("გთხოვთ, მიუთითოთ ვალიდური პაროლი, ის უნდა შეიცავდეს მინიმუმ: \nერთ დიდ ასოს \nერთ პატარა ასოს \nერთ ციფრს \nერთ სიმბოლოს")
      }
    }
    console.log(this.user)
  }
}
