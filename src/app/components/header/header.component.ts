import { Component} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { PatientService } from '../../services/patient/patient.service';
import { TokenService } from '../../services/authentication/token.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../../services/doctor/file.service';
import { ComponentCommunicatorService } from '../../services/component-communicator.service';
import { Category } from '../../data/Category';

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
  imageUrl: SafeUrl | null = null;

  nameSearchQuery: string = '';
  specialitySearchQuery: string = '';
  filteredNameDoctors: Doctor[] = [];
  filteredSpecialityDoctors : Doctor[] = [];

  doctors: Doctor[] | null = null;

  constructor(private cookieService: CookieService, private patientService: PatientService, private doctorService: DoctorService, private tokenService: TokenService, private fileService: FileService, private sanitizer: DomSanitizer, private componentCommunicator: ComponentCommunicatorService){}

  InitLoginAccount(){
    if(this.tokenService.getRole() == "Patient")
    {
      this.patientService.getPatientData(this.tokenService.getUserId())
      .subscribe(data => 
      { 
        this.account = data
        this.username = `${this.account?.firstName} ${this.account?.lastName}`
        this.GetUserImage(this.account.id)
        this.componentCommunicator.SwitchUserContext()
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
        this.componentCommunicator.SwitchUserContext()
      })
    }
    else{
      //TODO init admin rights etc
      this.username = "ადმინისტრატორი";
      this.componentCommunicator.SwitchUserContext()
    }
  }

  ngOnInit(){
    if(this.isLoggedIn){this.InitLoginAccount()}

    this.doctorService.getAllDoctorsData().subscribe(data => {
      this.doctors = data;
    });
  }

  onNameSearchChange(): void {
    if (this.nameSearchQuery.trim() !== '') {
      this.specialitySearchQuery = '';
      this.filteredSpecialityDoctors = [];

      this.filteredNameDoctors = this.doctors!.filter(doctor =>
        doctor.firstName.toLowerCase().includes(this.nameSearchQuery.toLowerCase())
      )
    }
    else {
      this.filteredNameDoctors = [];
    }
  }

  onSpecialitySearchChange(): void{
    if (this.specialitySearchQuery.trim() !== '') {
      this.nameSearchQuery = '';
      this.filteredNameDoctors = [];

      this.filteredSpecialityDoctors = this.doctors!.filter(doctor =>
        Category[doctor.category].toLowerCase().includes(this.specialitySearchQuery.toLowerCase()))
    }
    else {
      this.filteredSpecialityDoctors = [];
    }
  }

  onSelectDoctor(doctor: any): void {
    console.log('Selected Doctor:', doctor);
  }

  LogOut(){
    this.cookieService.delete("accessToken");
    this.isLoggedIn = false;
    localStorage.removeItem("loginStatus");
    this.imageUrl = null;
    this.componentCommunicator.SwitchUserContext()
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
