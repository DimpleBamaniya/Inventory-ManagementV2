import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CityService } from '../city/city.service';
import { DepartmentService } from '../department/department.service';
import { LayoutComponent } from '../layout/layout.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LayoutComponent],
  templateUrl: './login.component.html',
  providers: [UserService, HttpClient, CityService, DepartmentService],
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // Variable declaration
  isLoginUser: boolean = false;
  loginUserDetails: any;
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _activeRoute: ActivatedRoute
  ) {
    this.loginForm = this._formBuilder.group({
      emailID: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    debugger
    this.isSubmitted = true;

    const logInPassword = this.loginForm.value.password?.trim();
    const logInMail= this.loginForm.value.emailID?.trim();
    this.loginForm.patchValue({ password: logInPassword });
    this.loginForm.patchValue({ emailID: logInMail });

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Hash the password before sending it
    const hashedPassword = CryptoJS.SHA256(this.loginForm.value.password).toString();

    // Create a new object with email and hashed password
    const loginData = {
      emailID: this.loginForm.value.emailID,
      password: this.loginForm.value.password,
    };

    this.userService.login(loginData).subscribe((res: any) => {
      if (res.data != null) {
        this.isLoginUser = true;
        this.loginUserDetails = res.data;
        localStorage.setItem('loginUserDetails', JSON.stringify(this.loginUserDetails));
        if (this.loginUserDetails.permissions) {
          this.router.navigateByUrl(`/user/list`);
        } else {
          this.router.navigateByUrl(`/user/detail/${this.loginUserDetails.id}`);
        }
      } else {
        alert(res.message);
      }
    });
  }

  // Getter methods for form controls to simplify validation logic in the template
  get emailID() {
    return this.loginForm.get('emailID');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
