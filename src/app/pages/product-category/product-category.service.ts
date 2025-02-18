import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(private http: HttpClient) { }

  // Set up the Web API URL (can be stored in environment file)
  private apiUrl = "http://localhost:5062/api/ProductCategory";  // Adjust according to your API base URL

  // Method to authenticate user via Web API
  getAllProductCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/GetActiveProductCategories");  // Make the POST request and return the observable
  }
}
