import { Component, OnInit, ViewChild  } from '@angular/core';
import { ItinerariesService } from '../shared/services/itineraries.service'
import { GeolocationService } from '../shared/services/geolocation.service'
import { itinerary } from '../shared/models/itinerary.model'
import {  } from '@types/googlemaps';

@Component({
  selector: 'app-itinerary-map',
  templateUrl: './itinerary-map.component.html',
  styleUrls: ['./itinerary-map.component.css']
})
export class ItineraryMapComponent implements OnInit {

  selectedItinerary: itinerary = undefined
  selectedItinerariesGeolocations: Array<object> = undefined

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  markers: Array<google.maps.Marker> = []

  constructor(private itinerariesService: ItinerariesService, private geoLocationService: GeolocationService) { }

  ngOnInit() {
    var latlng = new google.maps.LatLng(-34.397, 150.644);

    var mapProp = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.itinerariesService.selectedItineraryObserverable.subscribe(itinerary => {
      if(itinerary) {
        this.selectedItinerary = itinerary

        this.geoLocationService.addressesToLatLong(this.selectedItinerary.locations)
          .then(res => {
            this.selectedItinerariesGeolocations = res;
            this.deleteMarkers()
            this.markers = res.map<google.maps.Marker>(geoLocation => {
              return new google.maps.Marker({
                position: geoLocation,
                map: this.map
              })
            })
            console.log(this.markers);
            
          })
      }
    })
  }

  deleteMarkers() {
    this.markers.forEach(marker => marker.setMap(undefined))
    this.markers = []
  }

}
