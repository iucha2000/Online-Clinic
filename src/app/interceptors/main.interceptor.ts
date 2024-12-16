import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { catchError, throwError } from "rxjs";
import { DisplayMessageService } from "../services/display-message.service";
import { MessageConstants } from "../data/MessageConstants";

@Injectable()
export class MainInterceptor implements HttpInterceptor{

    constructor(private cookieService: CookieService, private displayMessage: DisplayMessageService){}


    intercept(req: HttpRequest<any>, next: HttpHandler){

        let token: string | null = this.cookieService.get('accessToken');
        let request;

        if(token != null){
            request = req.clone({
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                })
            });
        }
        else{
            request = req.clone({
                headers: new HttpHeaders({
                })
            });
        }

        return next.handle(request).pipe(
            catchError(res => {
                if(res.status == 401 || res.status == 403){
                    this.displayMessage.showError(MessageConstants.UNAUTHORIZED_ACCESS)
                }
                else if(res.status == 500){
                    this.displayMessage.showError(MessageConstants.UNEXPECTED_ERROR)
                }
                return throwError(() => new HttpErrorResponse({status: res.status, statusText: res.statusText, url: res.url}));
            })
        );
    }
}