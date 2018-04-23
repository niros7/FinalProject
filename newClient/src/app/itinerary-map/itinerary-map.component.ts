import { Component, OnInit } from '@angular/core';
import { ItinerariesService } from '../shared/services/itineraries.service'
import { GeolocationService } from '../shared/services/geolocation.service'
import { itinerary } from '../shared/models/itinerary.model'

@Component({
  selector: 'app-itinerary-map',
  templateUrl: './itinerary-map.component.html',
  styleUrls: ['./itinerary-map.component.css']
})
export class ItineraryMapComponent implements OnInit {

  selectedItinerary: itinerary = undefined

  constructor(private itinerariesService: ItinerariesService, private geoLocationService: GeolocationService) { }

  ngOnInit() {
    this.itinerariesService.selectedItineraryObserverable.subscribe(itinerary => {
      if(itinerary) {
        this.selectedItinerary = itinerary
        this.geoLocationService.addressesToLatLong(this.selectedItinerary.locations)
      }
    })
  }

}
