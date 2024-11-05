import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { catchError, throwError } from "rxjs";

@Injectable()
export class MainInterceptor implements HttpInterceptor{

    constructor(private router: Router, private cookieService: CookieService){}


    intercept(req: HttpRequest<any>, next: HttpHandler){

        let token: string | null = this.cookieService.get('accessToken');
        let request;

        if(token != null){
            request = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
            });
        }
        else{
            request = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            });
        }

        return next.handle(request).pipe(
            catchError(res => {
                // if(res.status == 401){
                //     if(this.router.url != "/login" && this.router.url != "/"){
                //         this.router.navigate(['/login']);
                //     }
                //     else{
                //         alert("Invalid credentials");
                //     }
                // } 
                // else {
                //     alert(res.error?.message || 'An unknown error occurred');
                // }
                return throwError(() => new HttpErrorResponse({status: res.status, statusText: res.statusText, url: res.url}));
            })
        );
    }
}