import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from '../routing/routing.module';

import { CollapseModule, ProgressbarModule, AccordionModule, ModalModule } from 'ng2-bootstrap';

import { HomeComponent } from './home.component';
import { UnprotectedService } from './unprotected.service';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot()
  ],
  exports: [
  ],
  providers: [ UnprotectedService ],
})
export class UnprotectedModule { }
