import { Component, OnInit } from '@angular/core';
import { SearchTripsService } from '../search-trips.service';
import {Trip} from "../models/Trip.model";
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TripDetailsComponent } from '../trip-details/trip-details.component';
import { Router } from '@angular/router';
import {SpinnerComponent} from '../spinner/spinner.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private searchTripsService: SearchTripsService,
    private dialog: MatDialog, private router: Router) {
      this.isShowSpinner=false;
     }

  // TODO: Add model of trips
  trips: Trip[]; 
  errorMessage: string;
  isOpenDialog: boolean;
  isDialogOpen:boolean;
  isShowSpinner:boolean;
  dialogRef:MatDialogRef<SpinnerComponent, any>;

  searchTrips(): void {
    this.isShowSpinner=true;
    this.searchTripsService.searchTrips().then(searchedTrips => { 
      debugger;
      this.dialogRef.close();
      this.trips = searchedTrips;
      if(this.trips.length == 0 || this.trips == null || this.trips == undefined){
        this.router.navigate(['/noresult']);
      }
    }, error => {
      this.errorMessage = <any>error
      this.dialogRef.close();
    });
  }

  openModal() {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      width: '15vw',
      data: '',
      disableClose: true 
     });
  }

  ngOnInit() {
    this.openModal();
    this.isDialogOpen = false;
    this.searchTrips();
  }
}
