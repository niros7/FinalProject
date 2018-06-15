import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AlertModule } from 'ngx-bootstrap';
import { UserService } from './user.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppRoutingModule } from './app-routing.module';
import {ItinerariesService} from './itineraries.service'; 
import {GeolocationService} from './geolocation.service';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";


import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SearchResultsComponent
} from './search-results/search-results.component';
import {
  SearchTripsService
} from './search-trips.service';
import {
  ThemesService
} from './themes.service';
import {
  ResultsListComponent
} from './results-list/results-list.component';
import {
  ItineraryMapComponent
} from './itinerary-map/itinerary-map.component';
import {
  WizardComponent
} from './wizard/wizard.component';

import { MatModule } from './mat.module'

import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';

export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SearchResultsComponent,
    ItineraryMapComponent,
    ResultsListComponent,
    WizardComponent,
    AutoCompleteComponent
  ],
  exports: [
    AutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatModule,
    MatAutocompleteModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    SearchTripsService,
    ThemesService,
    ItinerariesService,
    GeolocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }