import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrl = environment.baseUrl;

  // Set up the Web API URL (can be stored in environment file)
  private apiUrl = this.baseUrl + "City";  // Adjust according to your API base URL
  constructor(private http: HttpClient) { }

  // Method to authenticate user via Web API
  getAllCities() {
    return this.http.post<any>(this.apiUrl + "/GetAllCities", null);  // Make the POST request and return the observable
  }

}
