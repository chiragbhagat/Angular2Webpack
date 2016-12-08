import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { InboxComponent } from './inbox.component';
import { GraphsComponent } from './graphs.component';
import { CalendarComponent } from './calendar.component';
import { SettingsComponent } from './Settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    InboxComponent,
    GraphsComponent,
    CalendarComponent,
    SettingsComponent
  ],
  providers: [
    // HeroService
  ]
})
export class HomeModule {}
