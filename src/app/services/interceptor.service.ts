import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    changeToken(token) {
        this.authService.token = token;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.token}`
          }
        });
    
        return next.handle(request).map((event: HttpEvent<any>) => {
			if (event instanceof HttpResponse) {
				this.changeToken(event.body.token);
				return event;
			}
		})
    }
    
}