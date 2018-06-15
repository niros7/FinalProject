import { Component, OnInit, Input } from '@angular/core';
import {Trip} from '../models/Trip.model'
import { ItinerariesService } from '../itineraries.service'

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  @Input() data: Trip[];
  
  constructor(private itinerariesService: ItinerariesService) { }

  ngOnInit() {
  }

  selectTrip(id: string) {
    this.itinerariesService.changeSelectedItinerary(id)
  }

}
