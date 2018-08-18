import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { InsertStoryService } from '../insert-story.service';
import {MatSnackBar} from '@angular/material';
import { ThemesService } from '../themes.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {

  addStoryForm: FormGroup;
  isSpinner:Boolean;
  themes: String[]; 
  errorMessage: string;
  constructor(private insertStoryService:InsertStoryService,
    public snackBar: MatSnackBar,
  private themesService:ThemesService) {  
  }

  ngOnInit() {
    this.themesService.getThemes().then(themes => { 
      this.themes = themes; 
    }, error => this.errorMessage = <any>error);

    this.addStoryForm = new FormGroup({
      Title: new FormControl(),
      Description: new FormControl(),
      Duration: new FormControl(),
      Destination: new FormControl(),
      Text: new FormControl(),
    });

    this.isSpinner = false;
  }

  toggleCheckbox(event) { 
		debugger;
		const element = event.srcElement;
		element.classList.toggle('tag');
		element.classList.toggle('tagV');
  }

  onSubmit() {
    debugger;
    if (this.addStoryForm.valid) {

      var tags = [];
		  var selectedTagsArr = document.getElementsByClassName("tagV");
		
		  if (selectedTagsArr != null){
		  for(var i=0; i<selectedTagsArr.length; i++)
      tags.push(<HTMLInputElement>selectedTagsArr[i].attributes["name"].value);
      }

      this.addStoryForm.value['Tags'] = tags;
      
      this.isSpinner = true;
      this.insertStoryService.insertStory(this.addStoryForm.value).then((isAdded) => {
        if (isAdded) {
           this.snackBar.open("story added", 'Info', {
            duration: 2000,
           });
        } else {
          this.snackBar.open("story not added", 'Error', {
            duration: 2000,
           });;
        }

        this.isSpinner = false;
      });  
    } else {
      this.snackBar.open("Form not valid", 'Error', {
        duration: 2000,
       });
    }
  }

}
