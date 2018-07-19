import { Component, OnInit } from '@angular/core';
import { SearchTripsService } from '../search-trips.service';
import { Trip } from '../models/Trip.model';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(private searchTripsService: SearchTripsService) { }

  isShowSpinner: boolean;

  tripData: Trip;

  ngOnInit() {
    this.isShowSpinner = true;
    this.searchTripsService.tripDetailes.subscribe(res => { 
      debugger;
      if(res!=null){
      this.tripData = res;
      this.isShowSpinner = false;
    }});
    this.searchTripsService.tripId.subscribe(res => { 
      if(res!=null){
        this.searchTripsService.getTripData(res);
    }
    });

    
  }
}
