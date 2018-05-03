import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2-comp',
  templateUrl: './tab2-comp.component.html',
  styleUrls: ['./tab2-comp.component.css']
})
export class Tab2CompComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  
  submitted = false;
  
  
  onSubmit()
  {
  		//  var formAdd = document.querySelector('#formAdd');
  
		//   var formResults = {};

		// 					var formAdd = $(document).getElementById("formAdd");
		// 		if(formAdd != undefined && formAdd != null){



		// 		formResults["country"] =  formSearch.country.value;
		// 		formResults["city"] =     formSearch.city.value;
		// 		formResults["amount"] =   formSearch.amount.value;
		// 		formResults["period"] =   formSearch.period.value;
		// 		formResults["drive"] =    formSearch.drive.value;
		// 		formResults["walk"] =     formSearch.walk.value;
		// 		formResults["romantic"] = formSearch.romantic.value;
		// 		formResults["hiking"] =   formSearch.hiking.value;
		// 		formResults["ski"] =      formSearch.ski.value;
		// 		formResults["nature"] =   formSearch.nature.value;

		// 		this.submitted = true;
		// 		console.log(formResults);			
		// 	}
	
  }

	
  
  
}
