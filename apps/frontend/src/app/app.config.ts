import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withDebugTracing,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { provideEffects } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.component';
import { appRoutes } from './app.routes';
import * as fromAppStore from './+state/app-store.reducer';
import { AppStoreEffects } from './+state/app-store.effects';
// import { reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(AppStoreEffects),
    provideState(
      fromAppStore.APP_STORE_FEATURE_KEY,
      fromAppStore.appStoreReducer,
    ),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(),
    provideStore({ router: routerReducer }),
    // provideState(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withDebugTracing(),
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(withInterceptorsFromDi()),
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
          deps: [HttpClient],
        },
      }),
      // StoreModule.forRoot(reducers, {
      //     metaReducers: [],
      //     runtimeChecks: {
      //         strictActionImmutability: true,
      //         strictStateImmutability: true,
      //         strictActionSerializability: true,
      //         strictStateSerializability: true
      //     },
      // }),
      // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      // EffectsModule.forRoot([]),
      // EntityDataModule.forRoot({}),
      // StoreRouterConnectingModule.forRoot({
      //     stateKey: 'router'
      // })
    ),
    MatNativeDateModule,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    provideAnimations(),
  ],
};
