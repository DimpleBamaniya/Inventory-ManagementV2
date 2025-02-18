import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicPagingParams } from '../../core/sharedModels/paging-params.model';
import { environment } from '../../../environments/environment';

interface UserDetails {
  ID: number;
  UserCode: string;
  FirstName: string;
  LastName: string;
  CityName: string;
  DepartmentName: string;
}

interface Result {
  Users: UserDetails[];
  TotalRecords: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  // Set up the Web API URL (can be stored in environment file)
  private apiUrl = this.baseUrl + "User";  // Adjust according to your API base URL

  // Method to authenticate user via Web API
  login(user: any): Observable<any> {
    debugger
    return this.http.post<any>(this.apiUrl + "/GetUserDetailByEmailID", user);  // Make the POST request and return the observable
  }

  // Method to authenticate user via Web API
  getUserDetails(userId: any): Observable<any> {
    let params = { 'id': userId };
    return this.http.post<any>(`${this.apiUrl}/GetUserDetailByID`, params);  // Make the POST request and return the observable
  }

  // Method to authenticate user via Web API
  saveUser(userdetail: any): Observable<any> {
    // let params = { 'id': userId };
    return this.http.post<any>(`${this.apiUrl}/saveUser`, userdetail);  // Make the POST request and return the observable
  }

  getAllUser(pagination: BasicPagingParams) {
    return this.http.post<any>(`${this.apiUrl}/GetAllUserDetails`, pagination);
  }

  // Method to authenticate user via Web API
  DeleteUser(userDetails: any): Observable<any> {
    let params = { 'id': userDetails.userId, 'DeletedBy': userDetails.deletedBy };
    return this.http.post<any>(`${this.apiUrl}/DeleteUser`, params);  // Make the POST request and return the observable
  }

}
