import { Component, OnInit } from '@angular/core';
import { CityService } from '../../city/city.service';
import { DepartmentService } from '../../department/department.service';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProductService } from '../../user-product/user-product.service';
import { ProductDetailComponent } from '../../product/product-detail/product-detail.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})

export class UserDetailComponent implements OnInit {
  cities: any = null;
  departments: any = null;
  userDetails: any = null;
  userForm: FormGroup;
  loginUserDetails: any = null;
  dataForSave: any = null;
  isReadOnly: boolean = true;
  isUpdateForm: boolean = false;
  isSubmited: boolean = false;
  labelForAddUser: string = '';
  labelForEditUser: string = '';
  userProductDetail: any = null;
  isShowProduct: boolean = false;
  isEditPermition: boolean = false;
  isProductAssigned: boolean = false;
  userID: any = null;

  constructor(
    private userService: UserService,
    private cityService: CityService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private userProductService: UserProductService) {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      emailID: [''],
      password: [''],
      cityID: [''],
      departmentID: ['']
    });
  }

  ngOnInit(): void {
    this.userForm.controls['cityID'].disable();
    this.userForm.controls['departmentID'].disable();
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (!(JSON.parse(this.loginUserDetails).permissions)) {
      this.isEditPermition = false;
    } else {
      this.isEditPermition = true;
    }

    if (this.loginUserDetails == null) {
      this.router.navigateByUrl(`/login`);
    }

    this.getAllCity();
    this.getAllDepartments();
    this.userID = this._activeRoute.snapshot.paramMap.get('id');
    if (this.userID == null || this.userID == undefined || Number(this.userID) == 0) {
      this.userForm.get('emailID')?.setValidators([Validators.required, Validators.email]);
      this.userForm.get('emailID')?.updateValueAndValidity();
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('emailID')?.updateValueAndValidity();
      this.userForm.get('cityID')?.setValidators(null);
      this.userForm.get('cityID')?.updateValueAndValidity();
      this.labelForAddUser = "Add User"
    } else {
      this.getProductListbyUserID(this.userID).then((userProductDetail) => {
        if (userProductDetail.length != null && userProductDetail.length != 0 && userProductDetail.length >= 1) {
          this.isProductAssigned = true;
        }
        else {
          this.isProductAssigned = false;
        }
      });
      this.getUserDetails(this.userID)
        .then((userDetails) => {
          if (userDetails == null) {
            this.labelForAddUser = "Add User"
            this.isUpdateForm = false;
            this.isShowProduct = false;
            this.userForm.get('cityID')?.clearValidators();
            this.userForm.get('departmentID')?.clearValidators();
          }
          else {
            this.labelForEditUser = "Edit User"
            this.isUpdateForm = true;
            this.isShowProduct = true;
            if (!(JSON.parse(this.loginUserDetails).permissions)) {
              this.isEditPermition = false;
            } else {
              this.isEditPermition = true;
            }
            this.userForm.get('cityID')?.setValidators([Validators.required]);
            this.userForm.get('departmentID')?.setValidators([Validators.required]);
          }
          this.userForm.get('cityID')?.updateValueAndValidity();
          this.userForm.get('departmentID')?.updateValueAndValidity();
        })
        .catch((error) => {
          console.error('Error loading user details:', error);
        });

    }

  }

  getAllCity() {
    this.cityService.getAllCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe(department => {
      this.departments = department;
    });
  }

  getUserDetails(userID: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getUserDetails(userID).subscribe({
        next: (userdetail) => {
          this.userDetails = userdetail.data;
          if (this.userDetails) {
            this.userForm.patchValue({
              id: this.userDetails.id,
              firstName: this.userDetails.firstName,
              lastName: this.userDetails.lastName,
              emailID: this.userDetails.emailID ? this.userDetails.emailID : '',
              password: this.userDetails.password ? this.userDetails.password : '',
              cityID: this.userDetails.cityID ? this.userDetails.cityID : '',
              departmentID: this.userDetails.departmentID ? this.userDetails.departmentID : '',
            });
            resolve(this.userDetails);
          } else if (userID == 0) {
            this.userForm.patchValue({
              id: 0,
              firstName: '',
              lastName: '',
              emailID: '',
              password: '',
              cityID: null,
              departmentID: null,
            });
            resolve();
          }
          else {
            this.router.navigateByUrl(`/userNotFound`);
            reject(new Error('User not found'));
          }
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.userForm.valid) {
      this.dataForSave = this.userForm.value;
      if (this.dataForSave.id) {
        this.dataForSave.departmentID = this.userForm.controls['departmentID'].value
        this.dataForSave.modifiedBy = (JSON.parse(this.loginUserDetails).id);
      }
      else {
        this.dataForSave.id = 0;
        this.dataForSave.departmentID = null;
        this.dataForSave.cityID = null;
        this.dataForSave.createdBy = (JSON.parse(this.loginUserDetails).id);
      }

      this.userService.saveUser(this.dataForSave).subscribe(userdetail => {
        if (this.isUpdateForm) {
          if (userdetail.data == null && userdetail.message) {
            alert(userdetail.message);
          } else {
            alert("User updated successfully.")
          }
          this.refreshPage();
        } else {
          if (userdetail.data == null && userdetail.message) {
            alert(userdetail.message);
          } else {
            alert("User added successfully.")
          }
          this.router.navigateByUrl('/user/list');
        }
      });
    }
  }

  refreshPage() {
    window.location.reload();
  }

  OnChangeEdit() {
    this.isReadOnly = false;
    if (!(JSON.parse(this.loginUserDetails).permissions)) {

      this.userForm.controls['departmentID'].disable();
    } else {
      this.userForm.controls['departmentID'].enable();
    }
    this.userForm.controls['cityID'].enable();
  }

  // Getter methods for form controls to simplify validation logic in the template
  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get emailID() {
    return this.userForm.get('emailID');
  }

  get password() {
    return this.userForm.get('password');
  }
  get departmentID() {
    return this.userForm.get('departmentID');
  }
  get cityID() {
    return this.userForm.get('cityID');
  }

  getProductListbyUserID(userID: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userProductService.getProductListbyUserID(userID).subscribe({
        next: (userdetail) => {
          this.userProductDetail = userdetail.data;
          resolve(this.userProductDetail); // Resolving the promise with the product data
        },
        error: (error) => {
          reject(error); // Rejecting the promise with the error
        }
      });
    });
  }

  onAddProduct() {
    var params = {
      userID: this.userID,
      isAssignProduct: true
    }
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      data: {
        tableData: params // Passing dynamic data (categoriesResponse)
      },
      width: '500px',
    });

    // After dialog closes, navigate back to the product list
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isClosePopUp) {
        dialogRef.close();
      } else if (res.data == null || res.data == undefined) {
        alert(res.message);
      } else {
        alert("Product assigned successfully.");
      }
      this.refreshPage();
    });
  }

  onDeleteProduct(userProductID: any) {
    this.confirmationDialog("Remove Product", "Are you sure you want to unassign the product?")
      .then((confirmed) => {
        if (confirmed) {
          this.userProductService.deleteUserProduct(userProductID).subscribe(isDeleted => {
            alert("Product unassigned successfully.")
            this.refreshPage();
          });
        }
      })
      .catch(() => {
        console.log("User canceled deletion.");
      });
  }

  confirmationDialog(title: string, message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: title,
          message: message,
        },
        width: '500px',
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        // `result` will be `true` if the user clicked 'Confirm', and `false` otherwise.
        resolve(result);
      });
    });
  }

}
