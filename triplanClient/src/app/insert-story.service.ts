import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class InsertStoryService {

  constructor(private http: AuthHttp) { }

  insertStory(story) {
    return new Promise((resolve, reject) => {
      return this.http.post('http://localhost:3000/api/v1/Trips/add', story).toPromise().then(response => {
        resolve(response);
      }).catch(() => reject());
    });
  } 

 /* extractLocationsFromText(text){
return $http({
  method: 'POST',
  url: url,
  data: data
}).then(function (success) {
  callback(success);
}, function (error) {
  errorCallback(error);
});

  }*/
  
 extractLocationsFromText(text) {
  return new Promise((resolve, reject) => {
    return this.http.post('http://localhost:3000/api/v1/Trips/extractLocations', {"text": text}).toPromise().then(response => {
      resolve(response.json());
    }).catch(() => reject());
  });
 }

}
