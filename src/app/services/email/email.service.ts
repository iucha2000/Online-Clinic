import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  sendCodeByEmail(email: string){
    return this.httpClient.post<any>(`http://localhost:5161/api/Authentication/Send-Confirmation-Code?email=${email}`,{});
  }

  verifyCode(email: string, code: number){
    return this.httpClient.post<any>(`http://localhost:5161/api/Authentication/Verify-Confirmation-Code?email=${email}&code=${code}`,{});
  }
}
