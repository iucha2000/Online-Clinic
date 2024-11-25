import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/authentication/token.service';
import { Login } from '../../models/login';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  @Input() user: Doctor | Patient | null = null;
  @Output() toggle = new EventEmitter<void>();

  newPassword: string = '';

  changePasswordForm = new FormGroup({
    oldPasswordField: new FormControl('', Validators.required),
    newPasswordField: new FormControl('', Validators.required),
    repeatedNewPasswordField: new FormControl('', Validators.required)
  })

  constructor(private authenticationService: AuthenticationService){}

  onSubmit(){
    if(this.changePasswordForm.valid){

      //TODO add validations to check old password, compare new
      //TODO add body request instead of query params
      //TODO add hide/show password button

      // if(this.changePasswordForm.value.oldPasswordField == this.user?.password && 
      //   this.changePasswordForm.value.newPasswordField == this.changePasswordForm.value.repeatedNewPasswordField){

      // }

      this.authenticationService.changeUserPassword(this.user?.email!, this.changePasswordForm.value.newPasswordField!).subscribe({
        next: (res) => {
          alert("პაროლი წარმატებით შეიცვალა")
        },
        error: (error) => {
          alert("დაფიქსირდა გაუთვალისწინებელი შეცდომა")
        }
      });
    }
    else{
      alert("გთხოვთ, შეავსოთ ყველა ველი")
    }
  }

  ToggleForm(){
    this.toggle.emit()
  }
}
