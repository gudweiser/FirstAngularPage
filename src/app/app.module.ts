 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
 import {AppRoutingModule} from './app-routing.module';
 import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

