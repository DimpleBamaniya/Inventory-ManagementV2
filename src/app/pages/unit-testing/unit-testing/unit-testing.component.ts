import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
  selector: 'app-unit-testing',
  standalone: true,
  imports: [RouterLink, CommonModule, LayoutComponent],
  templateUrl: './unit-testing.component.html',
  styleUrl: './unit-testing.component.scss'
})
export class UnitTestingComponent {

  activeImagePreview: any;
  currentIndex = 0;
  images_LoginPage: any = [];
  images_NoPermissionUserDetails: any = [];
  images_PermissionUserDetails: any = [];
  images_About_us: any = [];
  images_Others: any = [];
  images_Product_Detail: any = [];
  images_Product_list: any = [];
  images_User_List: any = [];
  images_Unit_Testing: any = [];

  ngOnInit(): void {

    this.images_LoginPage = [
      { src: 'assets/images/Login/img1.png', label: 'Layout' },
      { src: 'assets/images/Login/img2.png', label: 'Login Page' },
      { src: 'assets/images/Login/img3.png', label: 'Placeholder' },
      { src: 'assets/images/Login/img4.png', label: 'Field Validation' },
      { src: 'assets/images/Login/img5.png', label: 'Field Validation' },
      { src: 'assets/images/Login/img6.png', label: 'User not exist' },
      { src: 'assets/images/Login/img7.png', label: 'Password is incorrect' }
    ];

    this.images_NoPermissionUserDetails = [
      { src: 'assets/images/UDNP/img1.png', label: 'Layout' },
      { src: 'assets/images/UDNP/img2.png', label: 'View Mode' },
      { src: 'assets/images/UDNP/img3.png', label: 'Edit Mode' },
      { src: 'assets/images/UDNP/img4.png', label: 'Field Validation' },
      { src: 'assets/images/UDNP/img5.png', label: 'Assign Product List' }
    ];

    this.images_PermissionUserDetails = [
      { src: 'assets/images/UDWP/img1.png', label: 'Layout' },
      { src: 'assets/images/UDWP/img2.png', label: 'View Mode' },
      { src: 'assets/images/UDWP/img3.png', label: 'Edit Mode' },
      { src: 'assets/images/UDWP/img4.png', label: 'Field Validation' },
      { src: 'assets/images/UDWP/img5.png', label: 'Assign Product List' },
      { src: 'assets/images/UDWP/img6.png', label: 'View Mode(Add User)' },
      { src: 'assets/images/UDWP/img7.png', label: 'Edit Mode(Add User)' },
      { src: 'assets/images/UDWP/img8.png', label: 'Field Validation(Add User)' },
      { src: 'assets/images/UDWP/img9.png', label: 'Field Validation(Add User)' },
      { src: 'assets/images/UDWP/img10.png', label: 'User Already Exist' },
      { src: 'assets/images/UDWP/img11.png', label: 'User Added' }
    ];

    this.images_About_us = [
      { src: 'assets/images/AU/img1.png', label: 'Layout' },
      { src: 'assets/images/AU/img2.png', label: 'Introduction' },
      { src: 'assets/images/AU/img3.png', label: 'Features' },
      { src: 'assets/images/AU/img4.png', label: 'Usage & Best Practices' },
      { src: 'assets/images/AU/img5.png', label: 'Conclusion & Unit Testing' }
    ];

    this.images_Others = [
      { src: 'assets/images/PB/img1.png', label: 'Product Brand List PopUp' },
      { src: 'assets/images/PC/img1.png', label: 'Product Category List PopUp' },
      { src: 'assets/images/PB/img2.png', label: 'User not found' }
    ];

    this.images_Product_Detail = [
      { src: 'assets/images/PD/img1.png', label: 'Product Detail PopUp(Add Product)' },
      { src: 'assets/images/PD/img2.png', label: 'Field Validation(Add Product)' },
      { src: 'assets/images/PD/img3.png', label: 'Product Exist' },
      { src: 'assets/images/PD/img4.png', label: 'Product Added' },
      { src: 'assets/images/PD/img5.png', label: 'Product Detail PopUp(Edit Product)' },
      { src: 'assets/images/PD/img6.png', label: 'Validate Quantity of Product' },
      { src: 'assets/images/PD/img7.png', label: 'Product Detail PopUp(Assign Product)' },
      { src: 'assets/images/PD/img8.png', label: 'Product already assigned' },
      { src: 'assets/images/PD/img9.png', label: 'Product Category already assigned' },

    ];

    this.images_Product_list = [
      { src: 'assets/images/PL/img1.png', label: 'Layout' },
      { src: 'assets/images/PL/img2.png', label: 'Product List' },
      { src: 'assets/images/PL/img3.png', label: 'User assigned list popUp While delete Product' },
      { src: 'assets/images/PL/img4.png', label: 'Product deleted' },
      { src: 'assets/images/PL/img5.png', label: 'Edit Quantity of Product' },
      { src: 'assets/images/PL/img6.png', label: 'Validate Quantity of Product' }
    ];

    this.images_User_List = [
      { src: 'assets/images/UL/img1.png', label: 'Layout' },
      { src: 'assets/images/UL/img2.png', label: 'User List' },
      { src: 'assets/images/UL/img3.png', label: 'Product assigned list popUp While delete User' },
      { src: 'assets/images/UL/img4.png', label: 'User deleted' }
    ];

    this.images_Unit_Testing = [
      { src: 'assets/images/UT/img1.png', label: 'Layout' },
      { src: 'assets/images/UT/img2.png', label: 'Grid View' },
      { src: 'assets/images/UT/img3.png', label: 'Image Viewer' }
    ];
  }

  openModal(index: number, page: string) {

    this.currentIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    const imageLabel = document.getElementById('imageLabel') as HTMLElement;

    if (modal && modalImage && imageLabel) {
      modal.classList.add('active');
      switch (page) {
        case "images_LoginPage":
          modalImage.src = this.images_LoginPage[index].src;
          imageLabel.textContent = this.images_LoginPage[index].label;
          break;
        case "images_NoPermissionUserDetails":
          modalImage.src = this.images_NoPermissionUserDetails[index].src;
          imageLabel.textContent = this.images_NoPermissionUserDetails[index].label;
          break;
        case "images_PermissionUserDetails":
          modalImage.src = this.images_PermissionUserDetails[index].src;
          imageLabel.textContent = this.images_PermissionUserDetails[index].label;
          break;
        case "images_About_us":
          modalImage.src = this.images_About_us[index].src;
          imageLabel.textContent = this.images_About_us[index].label;
          break;
        case "images_Others":
          modalImage.src = this.images_Others[index].src;
          imageLabel.textContent = this.images_Others[index].label;
          break;
        case "images_Product_Detail":
          modalImage.src = this.images_Product_Detail[index].src;
          imageLabel.textContent = this.images_Product_Detail[index].label;
          break;
        case "images_Product_list":
          modalImage.src = this.images_Product_list[index].src;
          imageLabel.textContent = this.images_Product_list[index].label;
          break;
        case "images_User_List":
          modalImage.src = this.images_User_List[index].src;
          imageLabel.textContent = this.images_User_List[index].label;
          break;
        case "images_Unit_Testing":
          modalImage.src = this.images_Unit_Testing[index].src;
          imageLabel.textContent = this.images_Unit_Testing[index].label;
          break;

        default:
          console.log("Invalid page");
          break;
      }
      this.activeImagePreview = page;
    }
  }

  closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.classList.remove('active');
  }

  prevImage(page: string) {

    let lengthOfImage = 0;
    switch (page) {
      case "images_LoginPage":
        lengthOfImage = this.images_LoginPage.length;
        break;
      case "images_NoPermissionUserDetails":
        lengthOfImage = this.images_NoPermissionUserDetails.length;
        break;
      case "images_PermissionUserDetails":
        lengthOfImage = this.images_PermissionUserDetails.length;
        break;
      case "images_About_us":
        lengthOfImage = this.images_About_us.length;
        break;
      case "images_Others":
        lengthOfImage = this.images_Others.length;
        break;
      case "images_Product_Detail":
        lengthOfImage = this.images_Product_Detail.length;
        break;
      case "images_Product_list":
        lengthOfImage = this.images_Product_list.length;
        break;
      case "images_User_List":
        lengthOfImage = this.images_User_List.length;
        break;
      case "images_Unit_Testing":
        lengthOfImage = this.images_Unit_Testing.length;
        break;

      default:
        console.log("Invalid page");
        break;
    }
    this.currentIndex = (this.currentIndex - 1 + lengthOfImage) % lengthOfImage;
    this.updateModalImage(page);
  }

  nextImage(page: string) {

    let lengthOfImage = 0;
    switch (page) {
      case "images_LoginPage":
        lengthOfImage = this.images_LoginPage.length;
        break;
      case "images_NoPermissionUserDetails":
        lengthOfImage = this.images_NoPermissionUserDetails.length;
        break;
      case "images_PermissionUserDetails":
        lengthOfImage = this.images_PermissionUserDetails.length;
        break;
      case "images_About_us":
        lengthOfImage = this.images_About_us.length;
        break;
      case "images_Others":
        lengthOfImage = this.images_Others.length;
        break;
      case "images_Product_Detail":
        lengthOfImage = this.images_Product_Detail.length;
        break;
      case "images_Product_list":
        lengthOfImage = this.images_Product_list.length;
        break;
      case "images_User_List":
        lengthOfImage = this.images_User_List.length;
        break;
      case "images_Unit_Testing":
        lengthOfImage = this.images_Unit_Testing.length;
        break;
      default:
        console.log("Invalid page");
        break;
    }
    this.currentIndex = (this.currentIndex + 1) % lengthOfImage;
    this.updateModalImage(page);
  }

  updateModalImage(page: string) {

    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    const imageLabel = document.getElementById('imageLabel') as HTMLElement;
    if (modalImage && imageLabel) {
      switch (page) {
        case "images_LoginPage":
          modalImage.src = this.images_LoginPage[this.currentIndex].src;
          imageLabel.textContent = this.images_LoginPage[this.currentIndex].label;
          break;
        case "images_NoPermissionUserDetails":
          modalImage.src = this.images_NoPermissionUserDetails[this.currentIndex].src;
          imageLabel.textContent = this.images_NoPermissionUserDetails[this.currentIndex].label;
          break;
        case "images_PermissionUserDetails":
          modalImage.src = this.images_PermissionUserDetails[this.currentIndex].src;
          imageLabel.textContent = this.images_PermissionUserDetails[this.currentIndex].label;
          break;
        case "images_About_us":
          modalImage.src = this.images_About_us[this.currentIndex].src;
          imageLabel.textContent = this.images_About_us[this.currentIndex].label;
          break;
        case "images_Others":
          modalImage.src = this.images_Others[this.currentIndex].src;
          imageLabel.textContent = this.images_Others[this.currentIndex].label;
          break;
        case "images_Product_Detail":
          modalImage.src = this.images_Product_Detail[this.currentIndex].src;
          imageLabel.textContent = this.images_Product_Detail[this.currentIndex].label;
          break;
        case "images_Product_list":
          modalImage.src = this.images_Product_list[this.currentIndex].src;
          imageLabel.textContent = this.images_Product_list[this.currentIndex].label;
          break;
        case "images_User_List":
          modalImage.src = this.images_User_List[this.currentIndex].src;
          imageLabel.textContent = this.images_User_List[this.currentIndex].label;
          break;
        case "images_Unit_Testing":
          modalImage.src = this.images_Unit_Testing[this.currentIndex].src;
          imageLabel.textContent = this.images_Unit_Testing[this.currentIndex].label;
          break;
        default:
          console.log("Invalid page");
          break;
      }
    }
  }
}
