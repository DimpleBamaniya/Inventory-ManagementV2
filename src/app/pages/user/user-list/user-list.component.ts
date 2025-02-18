import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { BasicPagingParams } from '../../../core/sharedModels/paging-params.model';
import { Router } from '@angular/router';
import { UserProductService } from '../../user-product/user-product.service';
import { DynamicTableDataDialogComponent } from '../../../core/dynamic-table-data-dialog/dynamic-table-data-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  users: any[] = [];
  addUser: number = 0;
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 50;
  searchString: string = '';
  userDetails: any = null;
  loginUserDetails: any = null;
  isNoRecordFound: boolean = false;
  userProductDetail: any = null;
  pageSizeOptions = [2, 5, 10, 50, 100];
  columns: any = null; // Dynamic columns to be passed to the dialog

  // pagination
  pagingParams!: BasicPagingParams;
  totalPages = 0;

  constructor(
    private userService: UserService,
    private userProductService: UserProductService,
    public dialog: MatDialog,
    private router: Router) {
    this.initializePagination();
  }

  ngOnInit(): void {
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (this.loginUserDetails == null) {
      this.router.navigateByUrl(`/login`);
    }
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUser(this.pagingParams).subscribe((response: any) => {
      this.users = response.data;
      this.totalRecords = this.users.length >= 1 ? this.users[0].totalRecords : 0;
      this.totalPages = Math.ceil(this.totalRecords / this.pagingParams.pageSize);
      if (this.totalRecords == 0) {
        this.isNoRecordFound = true;
      }
      else {
        this.isNoRecordFound = false;
      }
    });
  }

  changeSortColumn(column: string): void {
    this.pagingParams.sortColumn = column;
    this.pagingParams.sortOrder =
      this.pagingParams.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.fetchUsers();
  }

  changePageSize(pageSize: any): void {
    const pageSizeValue = (pageSize.target as HTMLSelectElement).value;
    this.pagingParams.pageSize = Number(pageSizeValue);
    this.pagingParams.pageNo = 1; // Reset to first page
    this.fetchUsers();
  }

  changePage(pageNo: number): void {
    this.pagingParams.pageNo = pageNo;
    this.fetchUsers();
  }

  searchUsers() {
    this.currentPage = 1; // Reset to first page on search
    this.pagingParams.pageNo = 1;
    this.pagingParams.searchString = this.searchString;
    this.fetchUsers();
  }

  private initializePagination(): void {
    this.pagingParams = new BasicPagingParams();
    this.pagingParams.searchString = '';
    this.pagingParams.sortColumn = 'ID';
    this.pagingParams.sortOrder = 'ASC';
    this.pagingParams.pageNo = 1;
    this.pagingParams.pageSize = 10;
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

  DeleteUser(userid: any) {
    this.userProductService.getProductListbyUserID(userid).subscribe(user => {
      if (user.data.length >= 1) {
        var userList = user.data;
        this.columns = ['#', 'Product']
        const dialogRef = this.dialog.open(DynamicTableDataDialogComponent, {
          data: {
            columns: this.columns, // Passing dynamic column names
            tableData: userList, // Passing dynamic data (categoriesResponse)
            dialogLabel: 'Product List', // Passing dynamic label
            label: "You can't delete User because User assigned following Products."
          },
          width: '500px',
        });

        // After dialog closes, navigate back to the product list
        dialogRef.afterClosed();
      }
      else {
        this.confirmationDialog("Remove Product", "Are you sure you want to unassign the product?")
      .then((confirmed) => {
        if (confirmed) {
          var param = {
            userId: userid,
            deletedBy: (JSON.parse(this.loginUserDetails).id)
          }
          this.userService.DeleteUser(param).subscribe(isDeleted => {
            alert("User deleted successfully.")
            this.refreshPage();
          });
        }
      })
      .catch(() => {
        console.log("User canceled deletion.");
      });
       
      }
    });
  }

  refreshPage() {
    window.location.reload();
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
