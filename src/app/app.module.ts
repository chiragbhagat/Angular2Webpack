import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule }     from './Home/home-routing.module';
import { HomeModule }         from './home/home.module';

import { CrisisCenterModule }         from './crisis-center/crisis-center.module';

import { HeroesModule }         from './heroes/heroes.module';

import { LoginRoutingModule }   from './login-routing.module';
import { LoginComponent }       from './account/login.component';
import { RegisterComponent }       from './account/register.component';
import { ForgotPasswordComponent }       from './account/forgotpassword.component';

import { ApiService } from './shared';
import { AuthService} from './auth.service';

import { CategoriesModule }         from './categories/categories.module';
import { ProductsModule }         from './products/products.module';
import { RegionModule }         from './region/region.module';
import { OrdersModule }         from './Orders/Orders.module';
import { AdminModule }         from './admin/admin.module';
import { DialogService }        from './dialog.service';


import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HomeModule,
    AdminModule,
    CrisisCenterModule,
    AppRoutingModule,
    LoginRoutingModule,
    CategoriesModule,
    ProductsModule,
    RegionModule,
    OrdersModule,
    HeroesModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    // HomeComponent,
    // AboutComponent,
    // ContactComponent
  ],
  providers: [
    ApiService,
    AuthService,
    DialogService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
