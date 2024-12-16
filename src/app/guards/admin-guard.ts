import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
  
    constructor(private authService: AuthenticationService, private router: Router) {}
  
    canActivate(): boolean {
      if (this.authService.IsAdminAuthenticated()) {
        return true; 
      } else {
        this.router.navigate(['/home']); 
        return false; 
      }
    }
  }
  