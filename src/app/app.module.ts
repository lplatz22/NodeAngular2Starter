import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing/routing.module';
import { AuthenticationService } from './authentication.service';

import { CollapseModule, AccordionModule, ModalModule, ProgressbarModule } from 'ng2-bootstrap';
import { ProtectedModule } from './protected/protected.module';
import { UnprotectedModule } from './unprotected/unprotected.module';
import { UserModule } from './user/user.module';

import { NavComponent } from './nav.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    ProtectedModule,
    UnprotectedModule,
    UserModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [ AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
