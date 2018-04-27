import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from './shared/models/Trip.model';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class SearchTripsService {

  url: string;
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/legendery';
  }

  searchTrips() {
    return this.http.get<Trip[]>('http://localhost:3000/legendery/Trips', httpOptions)
    .pipe(
      
    );
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/Locations', httpOptions);
   /* .pipe(
      catchError(this.handleError('getLocations', []))
    );*/
  }

}
