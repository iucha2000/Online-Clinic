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
    if(token == ''){
      return null;
    }
    else{
      return JSON.parse(window.atob(token.split('.')[1]));
    }
  }

  getUserId(): number
  {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.Id : 0;
  }

  getRole(): string
  {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.Role : null;
  }
}
