
import { bootstrapApplication } from '@angular/platform-browser';
// import { UiUtilitiesModule } from '@my-app/ui/utilities';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

bootstrapApplication(
  AppComponent,
  appConfig
)
  .catch((err) => console.error(err));
