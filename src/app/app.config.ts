import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch()), provideFirebaseApp(() => initializeApp({"projectId":"angularautenticacao","appId":"1:1037586595412:web:e36f3b0d03196ab8b4f7c1","storageBucket":"angularautenticacao.appspot.com","apiKey":"AIzaSyCrCRsteAli_EWMbrJFnHS7XI-wTfcx3qQ","authDomain":"angularautenticacao.firebaseapp.com","messagingSenderId":"1037586595412"})), provideAuth(() => getAuth())]
};
