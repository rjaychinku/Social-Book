import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FbookserviceService } from '../service/fbookservice.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public loggedInUser: any;

    constructor(private authenticationService: FbookserviceService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   
        // add authorization header with jwt token if available
        this.loggedInUser = this.authenticationService.getUser();
        if (this.loggedInUser && this.loggedInUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${this.loggedInUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}