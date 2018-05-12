import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ThemesService {

  url: string;
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/legendery';
  }

  getThemes() {
    return this.http.get<String[]>('http://localhost:3000/legendery/Themes', httpOptions)
    .pipe(
      
    );
  }
}
