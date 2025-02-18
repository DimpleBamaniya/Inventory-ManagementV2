import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { UserNotFoundComponent } from './pages/user/user-not-found/user-not-found.component';
import { AboutUsComponent } from './pages/aboutUs/about-us/about-us.component';
import { AuthGuard } from './auth.guard';
import { UnitTestingComponent } from './pages/unit-testing/unit-testing/unit-testing.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
  },
  {
    path: 'unitTesting',
    component: UnitTestingComponent,
  },
  {
    path: 'userNotFound',
    component: UserNotFoundComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../app/pages/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('../app/pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
