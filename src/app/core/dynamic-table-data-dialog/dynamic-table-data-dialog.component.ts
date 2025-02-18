import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dynamic-table-data-dialog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dynamic-table-data-dialog.component.html',
  styleUrls: ['./dynamic-table-data-dialog.component.scss'],
})

export class DynamicTableDataDialogComponent {
  tableDatalist: any;
  tableDataColumn: any;
  constructor(
    public dialogRef: MatDialogRef<DynamicTableDataDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject the dynamic data and columns
  ) { }

  ngOnInit(): void {
    this.tableDatalist = this.data.tableData;
    this.tableDataColumn = this.data.columns;
  }

  // Close the dialog and redirect to ProductListComponent
  closeDialog(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/product/list');
  }
}
