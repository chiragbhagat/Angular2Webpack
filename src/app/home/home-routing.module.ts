import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { InboxComponent } from './inbox.component';
import { GraphsComponent } from './graphs.component';
import { CalendarComponent } from './calendar.component';
import { SettingsComponent } from './Settings.component';

const homeRoutes: Routes = [
  { path: '', pathMatch: 'prefix',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
