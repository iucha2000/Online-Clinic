import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

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

  constructor(private authenticationService: AuthenticationService, private cookieService: CookieService, private headerComponent: HeaderComponent){}

  onSubmit(){
    if(this.loginForm.valid)
    {
      this.login.email = this.loginForm.value.emailField ?? '';
      this.login.password =  this.loginForm.value.passwordField ?? '';
      this.LogIn();
    }
    else{
      alert("ელ-ფოსტის და პაროლის შევსება სავალდებულოა")
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
          alert("მონაცემები არასწორია")
        }
        else{
          alert("დაფიქსირდა გაუთვალისწინებელი შეცდომა")
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
      next: (res) => {
        this.isEmailSent = true
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 404){
          alert("მითითებული მეილი რეგისტრირებული არ არის")
        }
        else{
          alert("დაფიქსირდა გაუთვალისწინებელი შეცდომა")
        }
      }
    })
  }
}
