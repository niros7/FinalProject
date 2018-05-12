import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../themes.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

	constructor(private themesService: ThemesService) { }

	themes: String[]; 
  errorMessage: string;

  ngOnInit() {
		this.themesService.getThemes().subscribe(themes => { 
      this.themes = themes; 
    }, error => this.errorMessage = <any>error);
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
