import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../models/login';
import { Observable } from 'rxjs';
import { Token } from '../../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(login: Login) : Observable<any>{
    return this.httpClient.post<Token>("http://localhost:5161/api/Authentication/Login",login);
  }
}
