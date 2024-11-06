import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { PatientService } from '../../services/patient/patient.service';
import { TokenService } from '../../services/authentication/token.service';
import { DoctorService } from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isOpen = false;
  isLoggedIn = (localStorage.getItem("loginStatus") === "true");

  account: Patient | Doctor | null =  null
  username?: string | null = null;

  constructor(private cookieService: CookieService, private patientService: PatientService, private doctorService: DoctorService, private tokenService: TokenService){}

  InitLoginAccount(){
    if(this.tokenService.getRole() == "Patient")
    {
      this.patientService.getPatientData(this.tokenService.getUserId())
      .subscribe(data => 
      { 
        this.account = data
        this.username = `${this.account?.firstName} ${this.account?.lastName}`
      }) 
    }
    else if(this.tokenService.getRole() == "Doctor")
    {
      this.doctorService.getDoctorData(this.tokenService.getUserId())
      .subscribe(data =>
      {
        this.account = data
        this.username = `${this.account?.firstName} ${this.account?.lastName}`
      })
    }
    else{
      //TODO init admin rights etc
      this.username = "ადმინისტრატორი";
    }
  }

  ngOnInit(){
    if(this.isLoggedIn){this.InitLoginAccount()}
  }

  LogOut(){
    this.cookieService.delete("accessToken");
    this.isLoggedIn = false;
    localStorage.removeItem("loginStatus")
  }

  ToggleLoginForm(){
    this.isOpen = !this.isOpen;
  }
}
