import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  @Output() toggle = new EventEmitter<void>();

  changePasswordForm = new FormGroup({
    oldPasswordField: new FormControl('', Validators.required),
    newPasswordField: new FormControl('', Validators.required),
    repeatedNewPasswordField: new FormControl('', Validators.required)
  })

  constructor(){}

  onSubmit(){
    if(this.changePasswordForm.valid){
      //TODO check old password, verify new passwords, init change in database
      //TODO add hide/show password button
    }
    else{
      alert("გთხოვთ, შეავსოთ ყველა ველი")
    }
  }

  ToggleForm(){
    this.toggle.emit()
  }
}
