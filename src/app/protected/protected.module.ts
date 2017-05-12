import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from '../routing/routing.module';

import { ProgressbarModule, AccordionModule, ModalModule, AlertModule } from 'ng2-bootstrap';

import { ProtectedComponent } from './protected.component';
import { ProtectedService } from './protected.service';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    ProtectedComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [
  ],
  providers: [ ProtectedService ],
})
export class ProtectedModule { }
