import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { MzToastService } from 'ng2-materialize';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authS: AuthService,
                private router: Router,
                private toastService: MzToastService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        if(this.authS.authenticated())
          return true;
    
        this.router.navigate(['/login']);
        this.toastService.show("O tempo de sua sessão expirou. Faça login novamente", 4000, 'green');
    
        return false;
      }
}