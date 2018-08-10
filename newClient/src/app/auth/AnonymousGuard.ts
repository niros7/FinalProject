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

@Injectable()
export class AnonymousGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        return this.checkLogin();
    }

    checkLogin(): Promise<boolean> {
        debugger;
        return new Promise((resolve, reject) => {
            this.userService.isLoggedIn().then(() => {
                this.router.navigate(['/about']);
                reject(false);
            }).catch(() => {
                resolve(true);
            });
        });
    }
}