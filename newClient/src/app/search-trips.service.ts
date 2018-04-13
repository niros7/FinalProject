import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from './shared/models/Trip.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class SearchTripsService {

  constructor(private http: HttpClient) { }

  searchTrips() {
    return this.http.get<Trip[]>('http://localhost:3000/legendery/Trips', httpOptions)
    .pipe(
      
    );
  }

}
