import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withDebugTracing, withEnabledBlockingInitialNavigation } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { HttpLoaderFactory } from './app.component';
import { appRoutes } from './app.routes';
import { reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        LetDirective,
        PushPipe,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      }),
      StoreModule.forRoot(reducers, {
          metaReducers: [],
          runtimeChecks: {
              strictActionImmutability: true,
              strictStateImmutability: true,
              strictActionSerializability: true,
              strictStateSerializability: true
          },
      }),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot({}),
      StoreRouterConnectingModule.forRoot({
          stateKey: 'router'
      })),
      MatNativeDateModule,
      MatDatepickerModule,
      { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
      provideAnimations(),
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClient(withInterceptorsFromDi()),
      provideRouter(appRoutes, withDebugTracing(), withEnabledBlockingInitialNavigation()),
  ]
};
