import { Component, OnInit, Input } from '@angular/core';
import {Trip} from '../shared/models/Trip.model'

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  @Input() data: Trip[];
  
  constructor() { }

  ngOnInit() {
  }

}
