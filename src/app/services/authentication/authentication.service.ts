import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../models/login';
import { Observable } from 'rxjs';
import { Token } from '../../models/token';
import { Doctor } from '../../models/doctor';
import { TokenService } from './token.service';
import { ChangePasswordModel } from '../../models/changePassword';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  authenticateUser(login: Login) : Observable<any>{
    return this.httpClient.post<Token>("http://localhost:5161/api/Authentication/Login",login);
  }

  resetUserPassword(email: string){
    return this.httpClient.post<any>(`http://localhost:5161/api/Authentication/Reset-Password?email=${email}`,{})
  }

  changeUserPassword(changePasswordModel: ChangePasswordModel) : Observable<any>{
    return this.httpClient.post<any>("http://localhost:5161/api/Authentication/Change-Password", changePasswordModel)
  }

  saveUserPreferences(userPreferences: Doctor[] | null){
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

  loadUserPreferences(currentDoctors: Doctor[]) : Doctor[] | null {
    const userId = this.tokenService.getUserId()
    const key = userId === 0 ? "guest" : userId.toString();

    const storagePinPreferences = localStorage.getItem(key);
    const pinPreferences =  storagePinPreferences ? JSON.parse(storagePinPreferences) as Doctor[] : null;
    
    if (!pinPreferences) {
      return currentDoctors.map(doctor => ({ ...doctor, isPinned: false }));
    }

    const currentDoctorIds = new Set(currentDoctors.map(doctor => doctor.id));
    const pinPreferenceIds = new Set(pinPreferences.map(doctor => doctor.id));

    const idsMatch = currentDoctorIds.size === pinPreferenceIds.size &&
    Array.from(currentDoctorIds).every(id => pinPreferenceIds.has(id));

    if (idsMatch) {
      return pinPreferences;
    }

    const updatedDoctors = currentDoctors.map(doctor => {
      const matchingPinPreference = pinPreferences.find(pref => pref.id === doctor.id);
      return { ...doctor, isPinned: matchingPinPreference ? matchingPinPreference.isPinned : false };
    });
  
    return updatedDoctors;
  }
}
