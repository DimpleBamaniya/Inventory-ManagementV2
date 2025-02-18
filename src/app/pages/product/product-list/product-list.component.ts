import { Component } from '@angular/core';
import { BasicPagingParams } from '../../../core/sharedModels/paging-params.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductCategoryService } from '../../product-category/product-category.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DynamicTableDataDialogComponent } from '../../../core/dynamic-table-data-dialog/dynamic-table-data-dialog.component';
import { ProductBrandService } from '../../product-brand/product-brand.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ConfirmationDialogComponent } from '../../../core/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: any[] = [];
  userDetails: any = null;
  loginUserDetails: any = null;
  isNoRecordFound: boolean = false;
  productCategories: any = null;
  productBrands: any = null;

  //pagination
  totalPages = 0;
  currentPage: number = 1;
  pageSizeOptions = [2, 5, 10, 50, 100];
  totalRecords: number = 0;
  searchString: string = '';

  columns: any = null; // Dynamic columns to be passed to the dialog

  // pagination
  pagingParams!: BasicPagingParams;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private productCategoryService: ProductCategoryService,
    private productBrandService: ProductBrandService
  ) {
    this.initializePagination();
  }
  ngOnInit(): void {
    this.loginUserDetails = localStorage.getItem('loginUserDetails');
    if (this.loginUserDetails == null) {
      this.router.navigateByUrl(`/login`);
    }
    this.fetchProducts();
    this.getAllProductCategories();
    this.getAllProductBrands();
  }

  fetchProducts() {
    this.productService.getAllProduct(this.pagingParams).subscribe(data => {
      this.products = data.data;
      this.totalRecords = this.products.length >= 1 ? this.products[0].totalRecords : 0;
      // this.totalRecords = this.products.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pagingParams.pageSize);
      this.isNoRecordFound = this.totalRecords === 0;
      if (this.totalRecords == 0) {
        this.isNoRecordFound = true;
      }
      else {
        this.isNoRecordFound = false;
      }
    });
  }

  searchProducts() {
    this.pagingParams.pageNo = 1;
    this.pagingParams.searchString = this.searchString;
    this.fetchProducts();
  }

  changeSortColumn(column: any) {
    if (this.pagingParams.sortOrder == 'ASC') {
      this.pagingParams.sortOrder = 'DESC';
    } else {
      this.pagingParams.sortOrder = 'ASC';
    }
    this.pagingParams.sortColumn = column;
    this.fetchProducts();

  }

  private initializePagination(): void {
    this.pagingParams = new BasicPagingParams();
    this.pagingParams.searchString = '';
    this.pagingParams.sortColumn = 'ID';
    this.pagingParams.sortOrder = 'ASC';
    this.pagingParams.pageNo = 1;
    this.pagingParams.pageSize = 10;
  }

  getAllProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe(pc => {
      this.productCategories = pc;
    });
  }

  getAllProductBrands() {
    this.productBrandService.getAllProductBrands().subscribe(pb => {
      this.productBrands = pb;
    });
  }

  openDialogForAddProduct(product: any) {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      data: {
        tableData: product, // Passing dynamic data (categoriesResponse)
      },
      width: '500px',
    });

    // After dialog closes, navigate back to the product list
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isClosePopUp) {
        dialogRef.close();
      }
      else if (res.data == null || res.data == undefined) {
        alert(res.message)
      }
      else {
        if (res.isEditProduct) {
          alert("Product updated successfully.");
        } else {
          alert("Product added successfully.");
        }

        this.refreshPage();
      }
    });
  }

  openCategoryDialog(): void {
    this.columns = ['#', 'Product Category']
    const dialogRef = this.dialog.open(DynamicTableDataDialogComponent, {
      data: {
        columns: this.columns, // Passing dynamic column names
        tableData: this.productCategories, // Passing dynamic data (categoriesResponse)
        dialogLabel: 'Product Categories', // Passing dynamic label
      },
      width: '500px',
    });

    // After dialog closes, navigate back to the product list
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/product/list');
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

  openBrandDialog(): void {
    this.columns = ['#', 'Product Brand']
    const dialogRef = this.dialog.open(DynamicTableDataDialogComponent, {
      data: {
        columns: this.columns, // Passing dynamic column names
        tableData: this.productBrands, // Passing dynamic data (categoriesResponse)
        dialogLabel: 'Product Brands', // Passing dynamic label
      },
      width: '500px',
    });

    // After dialog closes, navigate back to the product list
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/product/list');
    });
  }

  refreshPage() {
    window.location.reload();
  }

  deleteProduct(product: any) {
    this.productService.getUserListByProductID(product.id).subscribe(user => {
      if (user.data.length >= 1) {
        var userList = user.data;
        this.columns = ['#', 'User']
        const dialogRef = this.dialog.open(DynamicTableDataDialogComponent, {
          data: {
            columns: this.columns, // Passing dynamic column names
            tableData: userList, // Passing dynamic data (categoriesResponse)
            dialogLabel: 'User List', // Passing dynamic label
            label: "You can't delete because this product is used for following Users"
          },
          width: '500px',
        });

        // After dialog closes, navigate back to the product list
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('/product/list');
        });
      }
      else {
        this.confirmationDialog("Product Delete", "Are you sure you want to delete the product?")
          .then((confirmed) => {
            if (confirmed) {
              this.productService.deleteProduct(product.id).subscribe(() => {
                alert("Product deleted successfully.");
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

  onPageSizeChange(): void {
    this.pagingParams.pageNo = 1;
    this.fetchProducts();
  }

  prevPage(): void {
    if (this.pagingParams.pageNo > 1) {
      this.pagingParams.pageNo--;
      this.fetchProducts();
    }
  }

  nextPage(): void {
    if (this.pagingParams.pageNo < this.totalPages) {
      this.pagingParams.pageNo++;
      this.fetchProducts();
    }
  }

}
