import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { InsertStoryService } from '../insert-story.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {

  addStoryForm: FormGroup;
  isSpinner: Boolean;
  locations: string[] = [];

  constructor(private insertStoryService:InsertStoryService,
    public snackBar: MatSnackBar) {  
  }

  ngOnInit() {
    this.addStoryForm = new FormGroup({
      Title: new FormControl(),
      Description: new FormControl(),
      Duration: new FormControl(),
      Destination: new FormControl(),
      Text: new FormControl(),
    });

    this.isSpinner = false;
  }

  getLocationsBeforeSubmit()
  {
    this.insertStoryService.extractLocationsFromText(this.addStoryForm.value.Text).then((res) => {
        debugger;
      //this.locations = res;
    }).catch((err) => {console.log(err); });
  }
  
  onSubmit() {
    debugger;
    if (this.addStoryForm.valid) {
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
