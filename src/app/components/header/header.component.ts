import { Component} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { PatientService } from '../../services/patient/patient.service';
import { TokenService } from '../../services/authentication/token.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../../services/doctor/file.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  //TODO add search box dropdown for doctors

  isOpen = false;
  isLoggedIn = (localStorage.getItem("loginStatus") === "true");

  account: Patient | Doctor | null =  null
  username?: string | null = null;
  imageUrl: SafeUrl | null = null;

  constructor(private cookieService: CookieService, private patientService: PatientService, private doctorService: DoctorService, private tokenService: TokenService, private fileService: FileService, private sanitizer: DomSanitizer){}

  InitLoginAccount(){
    if(this.tokenService.getRole() == "Patient")
    {
      this.patientService.getPatientData(this.tokenService.getUserId())
      .subscribe(data => 
      { 
        this.account = data
        this.username = `${this.account?.firstName} ${this.account?.lastName}`
        this.GetUserImage(this.account.id)
      }) 
    }
    else if(this.tokenService.getRole() == "Doctor")
    {
      this.doctorService.getDoctorData(this.tokenService.getUserId())
      .subscribe(data =>
      {
        this.account = data
        this.username = `${this.account?.firstName} ${this.account?.lastName}`
        this.GetUserImage(this.account.id)
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
    localStorage.removeItem("loginStatus");
    this.imageUrl = null;
  }

  ToggleLoginForm(){
    this.isOpen = !this.isOpen;
  }

  GetUserImage(accountId: number){
    //TODO add image fetching for patient
    this.fileService.getDoctorImage(accountId).subscribe(
      (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      }
    );
  }
}
