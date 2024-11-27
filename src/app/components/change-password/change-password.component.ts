import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/authentication/token.service';
import { Login } from '../../models/login';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ChangePasswordModel } from '../../models/changePassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  showPassword = false
  
  @Input() user: Doctor | Patient | null = null;
  @Output() toggle = new EventEmitter<void>();

  changePasswordModel: ChangePasswordModel = {email: '', password: ''}

  changePasswordForm = new FormGroup({
    oldPasswordField: new FormControl('', Validators.required),
    newPasswordField: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|:";\'<>,.?/`~ -]).*$')]),
    repeatedNewPasswordField: new FormControl('', Validators.required)
  })

  constructor(private authenticationService: AuthenticationService){}

  onSubmit(){
    if(this.changePasswordForm.valid){

      this.changePasswordModel.email = this.user?.email!
      this.changePasswordModel.password =  this.changePasswordForm.value.newPasswordField!

      if(this.changePasswordForm.value.oldPasswordField != this.user?.password){
        alert("ძველი პაროლი არასწორია, გთხოვთ სცადოთ თავიდან")
      }
      else if(this.changePasswordModel.password != this.changePasswordForm.value.repeatedNewPasswordField){
        alert("პაროლები ერთმანეთს არ ემთხვევა, გთხოვთ სცადოთ თავიდან")
      }
      else{
        this.authenticationService.changeUserPassword(this.changePasswordModel).subscribe({
          next: (res) => {
            alert("პაროლი წარმატებით შეიცვალა")
            this.user!.password = this.changePasswordModel.password
            this.ToggleForm()
          },
          error: (error) => {
            alert("დაფიქსირდა გაუთვალისწინებელი შეცდომა")
          }
        });
      }
    }
    else if(this.changePasswordForm.get("newPasswordField")?.invalid){
      alert("გთხოვთ, მიუთითოთ ვალიდური პაროლი, ის უნდა შეიცავდეს მინიმუმ: \nერთ დიდ ასოს \nერთ პატარა ასოს \nერთ ციფრს \nერთ სიმბოლოს")
    }
    else{
      alert("გთხოვთ, შეავსოთ ყველა ველი")
    }
  }

  ToggleForm(){
    this.toggle.emit()
  }
}
