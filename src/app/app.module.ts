import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
//import { DashboardComponent } from './dashboard/dashboard.component'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ChartsService } from './services/charts.service';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [

    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    
  ],
  exports: [CommonModule],

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent],
  providers:[ChartsService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
