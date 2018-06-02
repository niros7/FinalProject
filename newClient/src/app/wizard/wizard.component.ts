import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../themes.service';
declare var jquery: any;
declare var $: any;

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

				//get only the selected tags.
					var tags = document.getElementsByClassName("tagV");

					for (let i = 0; i < tags.length; i++) {
						formResults[tags[i].getAttributeNode("name").nodeValue] = true;
					}

					formResults["amount"] = document.getElementById("amount").getAttribute("value");
					formResults["period"] = $("#period").val();
					formResults["location"] = $("#locationing").val();
					
				this.submitted = true;

				//This is the form results!
				console.log(formResults);			
		  	}
	
  }
	
  
  
  

}
