import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

    // Set up the Web API URL (can be stored in environment file)
      private apiUrl = "//localhost:5062/api/Department";  // Adjust according to your API base URL
    
      constructor(private http: HttpClient) { }
    
      // Method to authenticate user via Web API
      getAllDepartments() {
        return this.http.post<any>(this.apiUrl + "/GetAllDepartments",null);  // Make the POST request and return the observable
      }
    
}
