import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './shared/components/about/about.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './shared/components/terms-of-service/terms-of-service.component';
import { ContactComponent } from './shared/components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./features/seller/seller.module').then(m => m.SellerModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AboutComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    ContactComponent 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }