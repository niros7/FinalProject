import { SearchTripsService } from '../search-trips.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  searchTerm: FormControl = new FormControl();
  searchResult = [];
  Locations = [];

  constructor(private service: SearchTripsService) {
    this.searchTerm.valueChanges
    .debounceTime(400)
    .subscribe(data => {
      this.searchResult = [];
      this.Locations.map(location => {
       if (String(location.Location).includes(data)) {
        this.searchResult.push(location);
      }});
  });
}

  ngOnInit() {
    this.service.getLocations().subscribe(locations => {this.Locations = locations; } );
  }

}
