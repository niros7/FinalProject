import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AlertModule } from 'ngx-bootstrap';
import { UserService } from './user.service';
import { InsertStoryService } from './insert-story.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoresultComponent } from './noresult/noresult.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppRoutingModule } from './app-routing.module';
import {ItinerariesService} from './itineraries.service'; 
import {GeolocationService} from './geolocation.service';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { MatIconModule} from '@angular/material';
import {AddStoryComponent} from './add-story/add-story.component';

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
import {
  Tab1CompComponent
} from './tab1-comp/tab1-comp.component';

import { MatModule } from './mat.module'

import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { MatAutocompleteModule, MatInputModule, MatDialogModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { ArchwizardModule } from 'angular-archwizard';

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
    NoresultComponent,
    SearchResultsComponent,
    ItineraryMapComponent,
    ResultsListComponent,
    WizardComponent,
    Tab1CompComponent,
    AutoCompleteComponent,
    TripDetailsComponent,
    AddStoryComponent
  ],
  entryComponents: [
    TripDetailsComponent
  ],
  exports: [
    ReactiveFormsModule,
    AutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ArchwizardModule
  ],
  providers: [
    UserService,
    SearchTripsService,
    ThemesService,
    ItinerariesService,
    InsertStoryService,
    GeolocationService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }