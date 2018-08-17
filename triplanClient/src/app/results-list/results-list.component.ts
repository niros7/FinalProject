import { Component, OnInit, Input, Inject } from '@angular/core';
import {Trip} from '../models/Trip.model'
import { ItinerariesService } from '../itineraries.service'
import { SearchTripsService } from '../search-trips.service'
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TripDetailsComponent } from '../trip-details/trip-details.component';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  @Input() data: Trip[];

  isShowTripDtl:boolean;

  constructor(private itinerariesService: ItinerariesService,
              private searchTripService: SearchTripsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.isShowTripDtl = false;
  }

  selectTrip(id: string) {
    this.itinerariesService.changeSelectedItinerary(id);
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(TripDetailsComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(result => {
        this.searchTripService.initTripData();
    });
  }


  showTripDetails(id) {
    debugger;
    this.isShowTripDtl = true;
    this.openDialog();
    //this.searchTripService.cahangeDialog(true);
    this.searchTripService.setTripId(id);
  }
}
