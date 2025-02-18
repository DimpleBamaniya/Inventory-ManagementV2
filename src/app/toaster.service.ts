import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  // Import ToastrService

@Injectable({
  providedIn: 'root',  // Makes this service available throughout the app
})
export class ToasterService {

  constructor(private toastr: ToastrService) {}

  // Show success toast
  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title);
  }

  // Show error toast
  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title);
  }

  // Show warning toast
  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title);
  }

  // Show info toast
  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }
}
