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

	toggleCheckbox(event) { 
		const element = event.srcElement;
		element.classList.toggle('tag');
		element.classList.toggle('tagV');
}
	

  
  onSubmit()
  {
  		 var formSearch = document.querySelector('#formSearch');
  
		  var formResults = {};

			if(formSearch != undefined && formSearch != null){

				//get only selected tags.
					var tags = document.getElementsByClassName("tagV");
					console.log(tags);

					for (let i = 0; i < tags.length; i++) {
						formResults[tags[i].getAttributeNode("name").nodeValue] = true;
					}

				formResults["location"] =  formSearch.location.value;
				formResults["amount"] =   formSearch.amount.value;
				formResults["period"] =   formSearch.period.value;

				this.submitted = true;
				console.log(formResults);			
			}
	
  }
	
  
  
  

}
