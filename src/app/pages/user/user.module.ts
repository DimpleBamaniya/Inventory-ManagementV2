import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../auth.guard';
import { ConfirmationDialogComponent } from '../../core/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../../core/confirmation-dialog/confirmation-dialog.service';

export const routes: Routes = [
{
    path: 'detail/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard]
},
{
    path: 'list',
    component: UserListComponent,
    canActivate: [AuthGuard]
}
];

@NgModule({
  declarations: [UserDetailComponent,UserListComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    LayoutComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    ConfirmationDialogComponent],
  exports:[],
  providers: [ConfirmationDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: []
})
export class UserModule { }