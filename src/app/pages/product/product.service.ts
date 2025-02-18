import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicPagingParams } from '../../core/sharedModels/paging-params.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Set up the Web API URL (can be stored in environment file)
  private apiUrl = "http://localhost:5062/api/Product";  // Adjust according to your API base URL

  getAllProduct(pagination: BasicPagingParams) {
    return this.http.post<any>(`${this.apiUrl}/GetAllProductDetails`, pagination);
  }

  // Method to authenticate user via Web API
  saveProduct(productdetail: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SaveProduct`, productdetail);  // Make the POST request and return the observable
  }

  // Method to authenticate user via Web API
  getUserListByProductID(productId: any): Observable<any> {
    let params = { 'id': productId };
    return this.http.post<any>(`${this.apiUrl}/GetUserListByProductID`, params);  // Make the POST request and return the observable
  }

  // Method to authenticate user via Web API
  deleteProduct(productId: any): Observable<any> {
    let params = { 'id': productId };
    return this.http.post<any>(`${this.apiUrl}/DeleteProduct`, params);  // Make the POST request and return the observable
  }
}
