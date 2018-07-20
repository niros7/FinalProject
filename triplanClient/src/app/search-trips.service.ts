import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from './models/Trip.model';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchTripsService {

  searchParam;

  private isOpenDialogBS = new BehaviorSubject<any>(false); 
  isOpenDialog = this.isOpenDialogBS.asObservable();

  private tripDetailesBS = new BehaviorSubject<any>(null); 
  tripDetailes = this.tripDetailesBS.asObservable();

  private tripIdBS = new BehaviorSubject<any>(null); 
  tripId = this.tripIdBS.asObservable();

  constructor(private http: AuthHttp) { 
    
  }

  setSearchParameters(param) {
    this.searchParam = param;
  }

  getSearchParameters() {
    return this.searchParam;
  }

  initTripData() {
    this.tripIdBS.next(null);
    this.tripDetailesBS.next(null);
  }

  searchTrips() {
    return new Promise<Trip[]>((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/Trips').toPromise().then(response => {
        resolve(response.json() as Trip[]);
      }).catch(() => reject());
    });
  }

  getLocations() {
    debugger;
    return new Promise<Location[]>((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/Locations').toPromise().then(response => {
        resolve(response.json() as Location[]);
      }).catch(() => reject());
    });
  }

  cahangeDialog(isOpen) {
    this.isOpenDialogBS.next(isOpen);
  }

  getTripData(id) {
    this.http.get('http://localhost:3000/api/v1/trip/'+ id).toPromise().then(response => {
      debugger;
      this.tripDetailesBS.next(response.json());
       }).catch();
    }

  setTripId (id) {
    this.tripIdBS.next(id);
  }
}
