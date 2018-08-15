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
  errorMessage: String;

  constructor(private service: SearchTripsService) {
    debugger;
    this.searchTerm.valueChanges
    .debounceTime(400)
    .subscribe(data => {
      this.searchResult = [];
      debugger;
      this.Locations.map(location => {
       if (String(location.Location).toLowerCase().includes(String(data).toLowerCase())) {
        this.searchResult.push(location);
      }});
  });
}

  ngOnInit() {
    this.service.getLocations().then(locations => { 
      debugger;
      this.Locations = locations;
      debugger;
    }, error => this.errorMessage = <any>error);
  }

}
