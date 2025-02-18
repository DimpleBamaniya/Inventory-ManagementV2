import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink, CommonModule, LayoutComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
