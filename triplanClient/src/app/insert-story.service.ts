import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
