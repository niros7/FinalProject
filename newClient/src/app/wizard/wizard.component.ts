import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  
  submitted = false;
  
  
  onSubmit()
  {
  		 var formSearch = document.querySelector('#formSearch');
  
		  var formResults = {};

			if(formSearch != undefined && formSearch != null){


				formResults["country"] =  formSearch.country.value;
				formResults["city"] =     formSearch.city.value;
				formResults["amount"] =   formSearch.amount.value;
				formResults["period"] =   formSearch.period.value;
				formResults["drive"] =    formSearch.drive.value;
				formResults["walk"] =     formSearch.walk.value;
				formResults["romantic"] = formSearch.romantic.value;
				formResults["hiking"] =   formSearch.hiking.value;
				formResults["ski"] =      formSearch.ski.value;
				formResults["nature"] =   formSearch.nature.value;

				this.submitted = true;
				console.log(formResults);			
			}
	
  }
	
  
  
  

}
