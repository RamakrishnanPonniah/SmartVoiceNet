import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
   MatMenuModule, 
   MatButtonModule, 
   MatIconModule, 
   MatCardModule, 
   MatSliderModule, 
   MatTabsModule, 
   MatProgressSpinnerModule,
   MatDividerModule
  } from '@angular/material';
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { GaugeModule } from 'angular-gauge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecordAudioComponent } from './record-audio/record-audio.component';
import { UploadAudioComponent } from './upload-audio/upload-audio.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    RecordAudioComponent,
    UploadAudioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    FormsModule,
    GaugeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
