import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUserDetails: any = null;
  constructor() {}

  isAuthenticated(): boolean {
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    return this.loginUserDetails;
  }
}
