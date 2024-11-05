import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isOpen = false;
  isLoggedIn = false;
  optionsOpen = false;

  constructor(private cookieService: CookieService){}

  //TODO make options more pretty
  //TODO add user name dynamic initialization

  ToggleLoginForm(){
    this.isOpen = !this.isOpen;
  }

  ToggleOptions(){
    this.optionsOpen = !this.optionsOpen;
  }

  LogOut(){
    this.isLoggedIn = false;
    this.cookieService.delete("accessToken");
  }
}
