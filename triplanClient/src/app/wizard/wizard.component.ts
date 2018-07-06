import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../themes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
	public currentUser : any = {};

	constructor( private router: Router,
		private themesService: ThemesService) { }

	themes: String[]; 
  errorMessage: string;

  ngOnInit() { 
		/*this.themesService.getThemes().subscribe(themes => { 
      this.themes = themes; 
    }, error => this.errorMessage = <any>error);*/
  }
	
	logout() {
   
  }
  
  submitted = false;
  
  
  onSubmit()
  {
  		 var formSearch = document.querySelector('#formSearch');
  
		  var formResults = {};

			if(formSearch != undefined && formSearch != null){


				// formResults["location"] =  formSearch.location.value;
				// formResults["amount"] =   formSearch.amount.value;
				// formResults["period"] =   formSearch.period.value;
				// formResults["romantic"] = formSearch.romantic.value;
				// formResults["hiking"] =   formSearch.hiking.value;
				// formResults["ski"] =      formSearch.ski.value;
				// formResults["nature"] =   formSearch.nature.value;

				this.submitted = true;
				console.log(formResults);			
			}
	
  }
	
  
  
  

}
