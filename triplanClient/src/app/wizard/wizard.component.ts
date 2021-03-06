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
		var location = document.getElementsByName('autoLocation');
		var amount = document.querySelector('#amount');
		var range = document.querySelector('#range');
		var period = document.querySelector('#period');

		var parameters = 
		{
			"location":"",
			"amount":"", 
			"range":"", 
			"period":"", 
			"tags":[],
			"totalDaysAmount":0
		};

		debugger;

		if (location != null && location.length > 0) {
			parameters.location = (<HTMLInputElement>location[0]).value;
		}

		if (amount != null) {
			parameters.amount = (<HTMLInputElement>amount).value;
		}

		if (range != null) {
			parameters.range = (<HTMLInputElement>range).value;
		}

		if (period != null) {
			parameters.period = (<HTMLInputElement>period).value;
		}

		switch(parameters.period)
		{
			case "Days": 
				parameters.totalDaysAmount = Number(parameters.amount);
				break;
			case "Weeks":
				parameters.totalDaysAmount = Number(parameters.amount) * 7;
				break;
			case "Months":
				parameters.totalDaysAmount = Number(parameters.amount) * 30;
				break;
			case "Years":
				parameters.totalDaysAmount = Number(parameters.amount) * 365;
				break;
		}

	
		parameters.tags = [];
		var selectedTagsArr = document.getElementsByClassName("tagV");
		
		if (selectedTagsArr != null){
		for(var i=0; i<selectedTagsArr.length; i++)
				parameters.tags.push(<HTMLInputElement>selectedTagsArr[i].attributes["name"].value);
		}

		console.log("Tags are: " + parameters.tags);


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
				this.searchTripService.setSearchParameters(parameters);
				this.router.navigateByUrl(`/search`);		
	}
	
  }
