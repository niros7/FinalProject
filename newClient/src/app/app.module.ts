import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  RouterModule
} from '@angular/router';
import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  AppComponent
} from './app.component';
import {
  ArticleModule
} from './article/article.module';
import {
  AuthModule
} from './auth/auth.module';
import {
  EditorModule
} from './editor/editor.module';
import {
  HomeModule
} from './home/home.module';
import {
  ProfileModule
} from './profile/profile.module';
import {
  SettingsModule
} from './settings/settings.module';
import {
  ApiService,
  ArticlesService,
  AuthGuard,
  CommentsService,
  FooterComponent,
  HeaderComponent,
  JwtService,
  ProfilesService,
  SharedModule,
  TagsService,
  UserService,
  HttpTokenInterceptor,
  ItinerariesService,
  GeolocationService
} from './shared';
import {
  FormsModule
} from '@angular/forms';
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

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { LoginOpt  } from "angularx-social-login";

const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("635765527611-gb7sn0to64k182rnkuaj7g3b3otgnkv8.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SearchResultsComponent,
    ItineraryMapComponent,
    ResultsListComponent,
    WizardComponent
  ],
  imports: [
    BrowserModule,
    ArticleModule,
    AuthModule,
    EditorModule,
    HomeModule,
    ProfileModule,
    rootRouting,
    SharedModule,
    BrowserAnimationsModule,
    SettingsModule,
    MatModule,
    SocialLoginModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    ApiService,
    ArticlesService,
    AuthGuard,
    CommentsService,
    JwtService,
    ProfilesService,
    TagsService,
    UserService,
    SearchTripsService,
    ThemesService,
    ItinerariesService,
    GeolocationService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
