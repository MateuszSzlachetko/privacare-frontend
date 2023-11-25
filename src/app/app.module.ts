import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {DeleteConfirmationComponent} from "./components/delete-confirmation/delete-confirmation.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {LogInComponent} from './components/auth/log-in/log-in.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthComponent} from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DeleteConfirmationComponent,
    LogInComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    provideFirebaseApp(() => initializeApp({
      "projectId": "privacare-86cc9",
      "appId": "1:430629472922:web:75c996f7f45fe82f19ad23",
      "storageBucket": "privacare-86cc9.appspot.com",
      "apiKey": "AIzaSyAx0aF8MoLXezFDaAqyiSVucQNXYDAo33s",
      "authDomain": "privacare-86cc9.firebaseapp.com",
      "messagingSenderId": "430629472922",
      "measurementId": "G-9B7ZCKFRX2"
    })),
    provideAuth(() => getAuth()),
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
