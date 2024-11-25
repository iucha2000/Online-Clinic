import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  @Output() toggle = new EventEmitter<void>();

  //TODO init change password functionality here

  ToggleForm(){
    this.toggle.emit()
  }
}
