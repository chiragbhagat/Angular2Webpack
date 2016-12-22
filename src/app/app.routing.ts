import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard }          from './auth-guard.service';
import { PreloadSelectedModules } from './selective-preload-strategy';
//import { PageNotFoundComponent } from './pagenotfound.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about.component';
import { ContactComponent } from './home/contact.component';
//import { CrisisCenterModule } from './crisis-center/crisis-center.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  //{ path: '**', pathMatch: 'full', component: PageNotFoundComponent },
 //{
    //path: 'crisis-center',
    //component: CrisisCenterModule,
    //loadChildren: './crisis-center/crisis-center.module#CrisisCenterModule',
    //data: {
    //  preload: true
    //}
  //}
];

//export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadSelectedModules }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    PreloadSelectedModules
  ]
})
export class AppRoutingModule {}
