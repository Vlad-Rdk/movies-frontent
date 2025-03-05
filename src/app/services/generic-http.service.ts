import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  baseUrl:string = 'https://api.themoviedb.org/3'
  constructor(private httpClient:HttpClient) {

   }
   httpGet(url: string):any {

    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${environment.apiKey}`
    });
  
    return this.httpClient.get(`${this.baseUrl}/${url}`, { headers });
  }
}
