import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { AdminModule } from './admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CustomerModule } from './customer/customer.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './customer/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   // AdminModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
   // CustomerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true,
      positionClass: 'toast-top-right',
      progressAnimation:"increasing",
     
    })
  ],
  providers: [  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
