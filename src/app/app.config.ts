import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { postReducer } from './store/posts/post.reducer';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from './store/posts/post.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { QuillModule } from 'ngx-quill';
import { provideStoreDevtools } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideEffects([PostEffects]),
    provideStore({
      'posts': postReducer
    }),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), // Provide Firestore
    importProvidersFrom(QuillModule.forRoot()),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })

  ]
};
