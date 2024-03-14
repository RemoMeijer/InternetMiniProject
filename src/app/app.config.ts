import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"internettechnologieminiproject","appId":"1:539577375802:web:7412a498fe20568b39e903","storageBucket":"internettechnologieminiproject.appspot.com","apiKey":"AIzaSyBb3K9c0ELLOI6M8XA0XynPbFxau9zpzQU","authDomain":"internettechnologieminiproject.firebaseapp.com","messagingSenderId":"539577375802","measurementId":"G-GXMVKEH1XM"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
