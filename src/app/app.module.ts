import { RouterModule } from '@angular/router';  // Import RouterModule
import { routes } from './app.routes';  // Import routes
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './pages/user/user.module';
import { ProductModule } from './pages/product/product.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }), // RouterModule is correctly imported here
    UserModule,
    ProductModule
  ],
  providers: [],
})
export class AppModule {}
