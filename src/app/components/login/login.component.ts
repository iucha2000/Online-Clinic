import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { DisplayMessageService } from '../../services/display-message.service';
import { MessageConstants } from '../../data/MessageConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  resetPasswordMode = false
  isEmailSent = false
  userEmail = ''

  @Output() toggle = new EventEmitter<void>();

  login: Login = {email: '', password: ''}

  loginForm = new FormGroup({
    emailField: new FormControl('', [Validators.required, Validators.email]),
    passwordField: new FormControl('', Validators.required)
  })

  constructor(private authenticationService: AuthenticationService, private cookieService: CookieService, private headerComponent: HeaderComponent, private displayService: DisplayMessageService){}

  onSubmit(){
    if(this.loginForm.valid)
    {
      this.login.email = this.loginForm.value.emailField ?? '';
      this.login.password =  this.loginForm.value.passwordField ?? '';
      this.LogIn();
    }
    else{
      this.displayService.showError(MessageConstants.EMAIL_AND_PASSWORD_REQUIRED)
    }
  }

  LogIn(){
    this.authenticationService.authenticateUser(this.login)
    .subscribe({
      next: (res) => {
        this.ToggleForm()

        this.cookieService.set("accessToken",res.accessToken)
        this.headerComponent.isLoggedIn = true;
        localStorage.setItem("loginStatus", this.headerComponent.isLoggedIn.toString());
        this.headerComponent.InitLoginAccount();
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 404){
          this.displayService.showError(MessageConstants.INVALID_CREDENTIALS)
        }
        else{
          this.displayService.showError(MessageConstants.UNEXPECTED_ERROR)
        }
      }
    });
  }

  ToggleForm() {
    this.toggle.emit()
  }

  ResetPassword(){
    this.resetPasswordMode = true
  }

  CheckEmail(){
    this.authenticationService.resetUserPassword(this.userEmail).subscribe({
      next: () => this.isEmailSent = true,
      error: (error: HttpErrorResponse) => {
        if(error.status === 404){
          this.displayService.showError(MessageConstants.INVALID_EMAIL)
        }
        else if(error.status === 400){
          this.displayService.showError(MessageConstants.VALID_EMAIL_IS_REQUIRED)
        }
        else{
          this.displayService.showError(MessageConstants.UNEXPECTED_ERROR)
        }
      }
    })
  }
}
