import { Component, OnInit } from '@angular/core';
import { SearchTripsService } from '../search-trips.service';
import {Trip} from "../shared/models/Trip.model";

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
    this.searchTripsService.searchTrips().subscribe(trips => { 
      debugger;
      this.trips = trips; 
    }, error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.searchTrips();
  }

}
