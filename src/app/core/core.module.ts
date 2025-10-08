import { NgModule, Optional, SkipSelf } from '@angular/core';

// import and provide any app-wide singleton services here
// e.g. AuthService, ApiService. If your services have `providedIn: 'root'` you don't need to list them.

@NgModule({
  providers: [
    // Add core providers if not providedIn:'root'
    // AuthService, ApiService, TokenInterceptor (via HTTP_INTERCEPTORS) etc
  ]
})
export class CoreModule {
  // Prevent re-import of CoreModule
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}