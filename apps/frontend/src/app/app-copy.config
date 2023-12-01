import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withDebugTracing, withEnabledBlockingInitialNavigation } from '@angular/router';
import { UiUserModule } from '@my-app/ui/user';
import { EntityDataModule } from '@ngrx/data';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { HttpLoaderFactory } from './app.component';
import { appRoutes } from './app.routes';
import { reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    importProvidersFrom(
      UiUserModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
      TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
      }),
      EntityDataModule.forRoot({}),
    ),
    // NGRX
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    provideEffects(),
    provideStore(
      reducers, {
        metaReducers: [],
        runtimeChecks: {
            strictActionImmutability: true,
            strictStateImmutability: true,
            strictActionSerializability: true,
            strictStateSerializability: true
        },
    }

    ),
    // Divers
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withInterceptorsFromDi()),
    // Router
    provideRouter(
      appRoutes,
      withDebugTracing(),
      withEnabledBlockingInitialNavigation()
      ),
  ],
};
