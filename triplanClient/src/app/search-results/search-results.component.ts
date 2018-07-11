import { Component, OnInit } from '@angular/core';
import { SearchTripsService } from '../search-trips.service';
import {Trip} from "../models/Trip.model";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private searchTripsService: SearchTripsService) { }

  // TODO: Add model of trips
  trips: Trip[]; 
  errorMessage: string;

  searchTrips(): void {
    debugger;
    this.searchTripsService.searchTrips().then(searchedTrips => { 
      this.trips = searchedTrips;
      debugger;
    }, error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    var a = this.searchTripsService.getSearchParameters();
    debugger;
    this.searchTrips();
  }

}
