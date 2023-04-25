import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ConfirmationService } from 'primeng/api'; 
import { TagModule } from 'primeng/tag';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputNumberModule } from 'primeng/inputnumber';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DataViewModule,
    SharedModule,
    TagModule,
    OverlayPanelModule,
    InputNumberModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
