import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../shared';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  
  private user: SocialUser;
  private loggedIn: boolean;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      debugger;
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  constructor(private authService: AuthService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    debugger;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }  

  signOut(): void {
    this.authService.signOut();
  }  
}
