import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../themes.service';
import { SearchTripsService } from '../search-trips.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
	public currentUser : any = {};

	constructor( private router: Router,
		private themesService: ThemesService,
		private searchTripService:SearchTripsService) { }

	themes: String[]; 
  errorMessage: string;

  ngOnInit() { 
		
		this.themesService.getThemes().then(themes => { 
      this.themes = themes; 
    }, error => this.errorMessage = <any>error);
  }
	
	logout() {
   
  }
  
	submitted = false;
	
	toggleCheckbox(event) { 
		debugger;
		const element = event.srcElement;
		element.classList.toggle('tag');
		element.classList.toggle('tagV');
}
  
 finishFunction()
  {
		debugger;
  		 var formSearch = document.querySelector('#formSearch');
  
		  //var formParams = {};

			//if(formSearch != undefined && formSearch != null){


				// formResults["location"] =  formSearch.location.value;
				// formResults["amount"] =   formSearch.amount.value;
				// formResults["period"] =   formSearch.period.value;
				// formResults["romantic"] = formSearch.romantic.value;
				// formResults["hiking"] =   formSearch.hiking.value;
				// formResults["ski"] =      formSearch.ski.value;
				// formResults["nature"] =   formSearch.nature.value;

				//this.router.navigateByUrl(`/search?${search}`)
				//formParams["firstName"]="John";
				//formParams["lastName"]="Doe";
				//this.searchTripService.setSearchParameters(formParams);
				this.router.navigateByUrl(`/search`);		
			}
	
  }
