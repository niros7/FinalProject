import { Component, OnInit } from '@angular/core';
import { SearchTripsService } from '../search-trips.service';
import {Trip} from "../models/Trip.model";
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TripDetailsComponent } from '../trip-details/trip-details.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private searchTripsService: SearchTripsService,
    private dialog: MatDialog) { }

  // TODO: Add model of trips
  trips: Trip[]; 
  errorMessage: string;
  isOpenDialog: boolean;
  isDialogOpen:boolean;

  searchTrips(): void {
    this.searchTripsService.searchTrips().then(searchedTrips => { 
      debugger;
      this.trips = searchedTrips;
    }, error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    debugger;
    this.isDialogOpen = false;
    this.searchTrips();
  }
}
