import { Component, OnInit } from '@angular/core';
import { SearchTripsService } from '../search-trips.service';
import { Trip } from '../models/Trip.model';
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(private searchTripsService: SearchTripsService,
    public sanitizer: DomSanitizer) { }

  isShowSpinner: boolean;

  tripData: Trip;

  subscriptionTripDetailes: ISubscription;
  subscriptionTripId: ISubscription;

  ngOnInit() {
    debugger;
    this.tripData = null;
    this.isShowSpinner = true;
    this.subscriptionTripDetailes = this.searchTripsService.tripDetailes.subscribe(res => { 
      debugger;
      if(res!=null){
      this.tripData = res;
      this.isShowSpinner = false;
    }});
    this.subscriptionTripId = this.searchTripsService.tripId.subscribe(res => { 
      if(res!=null){
        this.searchTripsService.getTripData(res);
    }
    });
  }

  ngOnDestroy() {
    debugger;
    this.subscriptionTripDetailes.unsubscribe();
    this.subscriptionTripId.unsubscribe();
  }
}
