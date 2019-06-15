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
   MatDividerModule,
   MatInputModule,
   MatSelectModule,
   MatDialogModule,
   MatExpansionModule,
   MatTableModule,
   MatSnackBarModule
  } from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { GaugeModule } from 'angular-gauge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecordAudioComponent } from './record-audio/record-audio.component';
import { UploadAudioComponent } from './upload-audio/upload-audio.component';
import { DialogComponent } from './dialog/dialog.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    RecordAudioComponent,
    UploadAudioComponent,
    DialogComponent,
    HistoryComponent,
    LoginComponent
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
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GaugeModule.forRoot()
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
