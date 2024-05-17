import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/services/firestore.service';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './juegos/mayor-o-menor/mayor-o-menor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    AhorcadoComponent,
    MayorOMenorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }