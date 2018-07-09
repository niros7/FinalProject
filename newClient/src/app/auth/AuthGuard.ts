import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User, UserService } from '../shared';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin();
    }

    checkLogin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.userService.isLoggedIn().then(() => {
                resolve(true);
            }).catch(() => {
                this.router.navigate(['/home']);
                reject(false);
            });
        });
    }
}