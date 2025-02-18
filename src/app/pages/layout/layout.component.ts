import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoutComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutComponent implements OnInit {

  isPermission: boolean = false;
  isShowProduct: boolean = false;
  isShowUserListButton: boolean = false;
  loginUserDetails: any = null;
  loggedInUserName: string = '';
  isHideAboutUs: boolean = false;
  isShowLogoutButton: boolean = true;
  isShowLogin: boolean = false;


  constructor(private router: Router, private _activeRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    //get data from local Storage
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    this.setPermission();
    this.setLoggedInUserName();



    this.setUserListButton();
    this.setProductButton();
    this.setAboutUsButton();
    this.setLoginButton();
    this.setLogoutButton();

  }

  logout(): void {
    // Perform any logout-related logic, e.g., clearing local storage
    localStorage.removeItem('loginUserDetails'); // Example of clearing session data
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }

  onClickLogout(): void {
    this.router.navigateByUrl('/logout');
  }

  login(): void {
    // Perform any logout-related logic, e.g., clearing local storage
    localStorage.removeItem('loginUserDetails'); // Example of clearing session data
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }

  setUserListButton(): void {
    const userID = this._activeRoute.snapshot.paramMap.get('id');
    if ((this.router.url == ('/user/detail/' + userID) && this.isPermission)) {
      this.isShowUserListButton = true;
      this.isHideAboutUs = true;
    } else if ((this.router.url == ('/aboutUs')) || (this.router.url == ('/unitTesting'))) {
      this.isShowUserListButton = false;
    } else if (this.router.url == ('/product/list') && this.isPermission) {
      this.isShowUserListButton = true;
    } else {
      this.isShowUserListButton = false;
    }
  }

  setProductButton(): void {
    if ((this.router.url == ('/product/list') && this.isPermission) || (this.router.url == ('/aboutUs')) || (this.router.url == ('/unitTesting')) || (this.router.url == ('/login'))) {
      this.isShowProduct = false;
    } else if (this.isPermission && this.router.url != '/userNotFound') {
      this.isShowProduct = true;
    }
  }

  setAboutUsButton(): void {
    const userID = this._activeRoute.snapshot.paramMap.get('id');
    if (this.router.url == ('/aboutUs')) {
      this.isHideAboutUs = true;
    } else if (this.router.url == ('/product/list') || this.router.url == ('/user/list') || this.router.url == '/userNotFound') {
      this.isHideAboutUs = true;
    } else if (this.router.url == ('/user/detail/' + userID)) {
      this.isHideAboutUs = true;
    }
    else {
      this.isHideAboutUs = false;
    }
  }

  setLoginButton(): void {
    if ((this.router.url == ('/aboutUs')) || (this.router.url == ('/unitTesting'))) {
      this.isShowLogin = true;
    } else {
      this.isShowLogin = false;
    }
  }

  setPermission(): void {
    if ((this.loginUserDetails != undefined || this.loginUserDetails != null) && (JSON.parse(this.loginUserDetails).permissions)) {
      this.isPermission = true;
    } else {
      this.isPermission = false;
    }
  }

  setLoggedInUserName(): void {
    if (this.loginUserDetails != null) {
      this.loggedInUserName = JSON.parse(this.loginUserDetails).firstName;
    }
    else {
      this.loggedInUserName = 'Test User'
    }
  }

  setLogoutButton(): void {
    if (this.router.url == ('/login') || (this.router.url == ('/aboutUs')) || (this.router.url == ('/unitTesting'))) {
      this.isShowLogoutButton = false;
    }
    else {
      this.isShowLogoutButton = true;
    }
  }

}
