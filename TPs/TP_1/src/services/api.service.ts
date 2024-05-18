import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '';

  constructor(public http: HttpClient) { }

  setearUrl(url: string) {
    this.apiUrl = url;
  }

  llamarApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
