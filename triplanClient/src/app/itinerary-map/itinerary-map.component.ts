import { itinerary } from '../models/itinerary.model'
import {  } from '@types/googlemaps';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { ItinerariesService } from '../itineraries.service'
import { GeolocationService } from '../geolocation.service'


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
      zoom: 2,
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
              //this.map.setCenter(new google.maps.LatLng(geoLocation.lat(), geoLocation.lng()));
              this.map.setCenter(geoLocation);
              return new google.maps.Marker({
                position: geoLocation,
                map: this.map
              })
            })

            var markers = this.markers;
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
             bounds.extend(markers[i].getPosition());
            }
            
            this.map.fitBounds(bounds);

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
