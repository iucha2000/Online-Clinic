import { Component} from '@angular/core';
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

      this.authenticationService.authenticateUser(this.login)
      .subscribe({
        next: (res) => {
          this.cookieService.set('accessToken',res.accessToken)
          this.ToggleLoginForm()
          this.headerComponent.isLoggedIn = true;
          //TODO add profile & logout buttons
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 404){
            alert("Invalid credentials")
          }
          else{
            alert("Unexpected error occured")
          }
        }
      });
    }
    else{
      alert("ელ-ფოსტის და პაროლის შევსება სავალდებულოა")
    }
  }

  ToggleLoginForm() {
    this.headerComponent.ToggleLoginForm()
  }

  InitPasswordReset(){
    //TODO implement password reset via link/email
    console.log("Resetting password...")
  }
}
