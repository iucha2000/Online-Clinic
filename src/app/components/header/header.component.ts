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
  filteredNameDoctors: any[] = [];
  filteredSpecialityDoctors : any[] = [];

  //TODO init getting real doctor list
  //TODO create doctor view component to display data
  doctors: any[] = [
    { id: 1, name: 'Doctor A', category: 'Cardiology' },
    { id: 2, name: 'Doctor B', category: 'Neurology' },
    { id: 3, name: 'Doctor C', category: 'General' },
    { id: 4, name: 'Doctor D', category: 'Pediatrics' },
    { id: 5, name: 'Doctor E', category: 'Neurology' },
    { id: 6, name: 'Doctor F', category: 'General' },
    { id: 7, name: 'Doctor G', category: 'General' },
    { id: 8, name: 'Doctor H', category: 'Neurology' },
    { id: 9, name: 'Doctor I', category: 'Pediatrics' },
    { id: 10, name: 'Doctor J', category: 'Cardiology' },
    { id: 11, name: 'Doctor K', category: 'Pediatrics' }
  ];

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
  }

  onNameSearchChange(): void {
    if (this.nameSearchQuery.trim() !== '') {
      this.specialitySearchQuery = '';
      this.filteredSpecialityDoctors = [];

      this.filteredNameDoctors = this.doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(this.nameSearchQuery.toLowerCase()))
    }
    else {
      this.filteredNameDoctors = [];
    }
  }

  onSpecialitySearchChange(): void{
    if (this.specialitySearchQuery.trim() !== '') {
      this.nameSearchQuery = '';
      this.filteredNameDoctors = [];

      this.filteredSpecialityDoctors = this.doctors.filter(doctor =>
        doctor.category.toLowerCase().includes(this.specialitySearchQuery.toLowerCase()))
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
