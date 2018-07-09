import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ThemesService {

  url: string;
  constructor(private http: AuthHttp) { 
    this.url = 'http://localhost:3000/legendery';
  }

  getThemes() {

    return new Promise<String[]>((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/Themes').toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }
}
