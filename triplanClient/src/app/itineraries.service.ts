import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { itinerary } from './models/itinerary.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ItinerariesService {

  selectedItinerary = new BehaviorSubject<itinerary>(undefined);
  selectedItineraryObserverable = this.selectedItinerary.asObservable();

  constructor(private http: AuthHttp) { }

  getItineraryById(id: string) {

    return new Promise<itinerary>((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/trips/' + id).toPromise().then(response => {
        debugger;
        var itineraryDetails = response.json() as itinerary;
        this.selectedItinerary.next(itineraryDetails)
        resolve(itineraryDetails);
      }).catch(() => reject());
    });
  }

  changeSelectedItinerary(id: string) {
     this.getItineraryById(id);
  }
}