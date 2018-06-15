import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { itinerary } from './models/itinerary.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
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

  constructor(private http: HttpClient) { }

  getItineraryById(id: string) {
    let url = 'http://localhost:3000/api/v1/trips' + id
    return this.http.get<itinerary>(url).pipe()
  }

  changeSelectedItinerary(id: string) {
    return this.getItineraryById(id).subscribe(itinerary => this.selectedItinerary.next(itinerary))
  }
}