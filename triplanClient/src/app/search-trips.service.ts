import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from './models/Trip.model';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class SearchTripsService {

  searchParam;

  constructor(private http: AuthHttp) { 
    
  }

  setSearchParameters(param) {
    debugger;
    this.searchParam = param;
  }

  getSearchParameters() {
    debugger;
    return this.searchParam;
  }

  searchTrips() {
    return new Promise<Trip[]>((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/Trips').toPromise().then(response => {
        debugger;
        resolve(response.json() as Trip[]);
      }).catch(() => reject());
    });
  }

  getLocations() {
    return new Promise<Location[]>((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/Locations').toPromise().then(response => {
        debugger;
        resolve(response.json() as Location[]);
      }).catch(() => reject());
    });
  }

}
