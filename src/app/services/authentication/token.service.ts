import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  private decodeToken() : any
  {
    let token = this.cookieService.get('accessToken');
    return JSON.parse(window.atob(token.split('.')[1]));
  }

  getUserId(): string 
  {
    return this.decodeToken().Id;
  }

  getRole(): string
  {
    return this.decodeToken().Role;
  }
}
