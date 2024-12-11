import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicatorService {

  private userLoggedInSource = new Subject<void>();
  userLoggedIn$ = this.userLoggedInSource.asObservable();

  constructor() { }

  SwitchUserContext(){
    this.userLoggedInSource.next();
  }
}
