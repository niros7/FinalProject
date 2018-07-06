import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from './models/Trip.model';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class SearchTripsService {

  url: string;
  constructor(private http: AuthHttp) { 
    this.url = 'http://localhost:3000/api/v1/';
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
