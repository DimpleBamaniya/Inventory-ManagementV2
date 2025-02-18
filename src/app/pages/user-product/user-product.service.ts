import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {

  constructor(private http: HttpClient) { }
  // Set up the Web API URL (can be stored in environment file)
  private apiUrl = "http://127.0.0.1:5062/api/UserProduct";  // Adjust according to your API base URL

  getProductListbyUserID(userId: any): Observable<any> {
    let params = { 'id': userId };
    return this.http.post<any>(`${this.apiUrl}/GetProductListbyUserID`, params);  // Make the POST request and return the observable
  }

  deleteUserProduct(ID: any): Observable<any> {
    let params = { id: ID };
    return this.http.post<any>(`${this.apiUrl}/DeleteUserProduct`, params);
  }

  saveUserProducts(userProductdata: any): Observable<any> {
    let params = { id: userProductdata.id, CategoryID: userProductdata.categoryID, BrandID: userProductdata.brandID, CreatedBy: userProductdata.createdBy };
    return this.http.post<any>(`${this.apiUrl}/SaveUserProducts`, params);
  }
}
