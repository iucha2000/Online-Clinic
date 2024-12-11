import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ChangePasswordModel } from '../../models/changePassword';
import { DisplayMessageService } from '../../services/display-message.service';
import { MessageConstants } from '../../data/MessageConstants';

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

  constructor(private authenticationService: AuthenticationService, private displayMessage: DisplayMessageService){}

  onSubmit(){
    if(this.changePasswordForm.valid){

      this.changePasswordModel.email = this.user?.email!
      this.changePasswordModel.password =  this.changePasswordForm.value.newPasswordField!

      if(this.changePasswordForm.value.oldPasswordField != this.user?.password){
        this.displayMessage.showError(MessageConstants.INVALID_OLD_PASSWORD)
      }
      else if(this.changePasswordModel.password != this.changePasswordForm.value.repeatedNewPasswordField){
        this.displayMessage.showError(MessageConstants.DIFFERENT_PASSWORDS)
      }
      else{
        this.authenticationService.changeUserPassword(this.changePasswordModel).subscribe({
          next: () => {
            this.displayMessage.showError(MessageConstants.CHANGE_PASSWORD_SUCCESS)
            this.user!.password = this.changePasswordModel.password
            this.ToggleForm()
          },
          error: () => this.displayMessage.showError(MessageConstants.UNEXPECTED_ERROR)
        });
      }
    }
    else if(this.changePasswordForm.get("newPasswordField")?.invalid){
      this.displayMessage.showError(MessageConstants.VALID_PASSWORD_IS_REQUIRED)
    }
    else{
      this.displayMessage.showError(MessageConstants.ALL_FIELDS_REQUIRED)
    }
  }

  ToggleForm(){
    this.toggle.emit()
  }
}
