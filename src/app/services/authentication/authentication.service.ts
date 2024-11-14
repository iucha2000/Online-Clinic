import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../models/login';
import { Observable } from 'rxjs';
import { Token } from '../../models/token';
import { Doctor } from '../../models/doctor';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  authenticateUser(login: Login) : Observable<any>{
    return this.httpClient.post<Token>("http://localhost:5161/api/Authentication/Login",login);
  }

  saveUserPreferences(userPreferences: Doctor[] | null){
    //TODO save other possible preferences
    const userId = this.tokenService.getUserId()
    const key = userId === 0 ? "guest" : userId.toString();
    
    const hasPinnedDoctor = userPreferences?.some(doctor => doctor.isPinned);
    if(hasPinnedDoctor){
      localStorage.setItem(key, JSON.stringify(userPreferences))
    }
    else{
      localStorage.removeItem(key)
    }
  }

  loadUserPreferences() : Doctor[] | null {
    //TODO load other possible preferences
    const userId = this.tokenService.getUserId()
    const key = userId === 0 ? "guest" : userId.toString();

    const pinPreferences = localStorage.getItem(key);
    return pinPreferences ? JSON.parse(pinPreferences) as Doctor[] : null;
  }
}
