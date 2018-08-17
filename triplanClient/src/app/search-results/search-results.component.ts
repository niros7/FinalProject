import { Component, OnInit } from '@angular/core';
import { SearchTripsService } from '../search-trips.service';
import {Trip} from "../models/Trip.model";
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TripDetailsComponent } from '../trip-details/trip-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private searchTripsService: SearchTripsService,
    private dialog: MatDialog, private router: Router) { }

  // TODO: Add model of trips
  trips: Trip[]; 
  errorMessage: string;
  isOpenDialog: boolean;
  isDialogOpen:boolean;

  searchTrips(): void {
    this.searchTripsService.searchTrips().then(searchedTrips => { 
      debugger;
      this.trips = searchedTrips;
      if(this.trips.length == 0 || this.trips == null || this.trips == undefined){
        this.router.navigate(['/noresult']);
      }
    }, error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.isDialogOpen = false;
    this.searchTrips();
  }
}
