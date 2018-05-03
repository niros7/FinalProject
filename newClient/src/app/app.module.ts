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
/*import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatTabsModule } from '@angular/material';*/
import {
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatDividerModule,
  MatList,
  MatListItem
} from '@angular/material';

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
  ResultsListComponent
} from './results-list/results-list.component';
import {
  ItineraryMapComponent
} from './itinerary-map/itinerary-map.component';
import {
  WizardComponent
} from './wizard/wizard.component';

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
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    MatDividerModule
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
    ItinerariesService,
    GeolocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
