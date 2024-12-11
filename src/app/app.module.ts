import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { MainInterceptor } from './interceptors/main.interceptor';
import { LoginComponent } from './components/login/login.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { SearchDoctorViewComponent } from './components/search-doctor-view/search-doctor-view.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDoctorViewComponent } from './components/category-doctor-view/category-doctor-view.component';
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    DoctorCardComponent,
    SearchDoctorViewComponent,
    ReservationComponent,
    ProfileComponent,
    ChangePasswordComponent,
    AdminProfileComponent,
    CategoryComponent,
    CategoryDoctorViewComponent,
    EditDoctorComponent,
    AddDoctorComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    CookieService,
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
